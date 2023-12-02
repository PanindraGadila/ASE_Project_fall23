import React, { useState } from "react";
import { List, Button, Space, Typography, Input } from "antd";
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { Droppable } from "react-beautiful-dnd";

const ColHeader = ({
	title,
	onAdd,
	onEdit,
	onDeleteStage,
	taskEdit,
	setTaskEdit,
	stage,
	onEditStage,
}) => {
	const [stageTitle, setStageTitle] = useState(stage.name);

	return (
		<>
			{!taskEdit ? (
				<Space
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
						textAlign: "center",
						padding: 0,
					}}
				>
					{" "}
					<Typography.Title level={3}>{title}</Typography.Title>
					<Space>
						<Button
							type="primary"
							shape="circle"
							icon={<PlusOutlined />}
							onClick={onAdd}
						/>
						<Button
							type="primary"
							shape="circle"
							icon={<EditOutlined />}
							onClick={onEdit}
						/>
						<Button
							type="primary"
							danger
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={onDeleteStage}
						/>
					</Space>{" "}
				</Space>
			) : (
				<Space
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
						textAlign: "center",
						padding: 0,
					}}
				>
					<Input
						value={stageTitle}
						onChange={(e) => setStageTitle(e.target.value)}
						onPressEnter={() => {
							if (stageTitle !== "") {
								onEditStage({ ...stage, name: stageTitle });
								setTaskEdit(false);
							}
						}}
					/>
					<Space>
						<Button
							type="primary"
							danger
							shape="circle"
							icon={<CloseOutlined />}
							onClick={() => setTaskEdit(false)}
						/>
						<Button
							type="primary"
							shape="circle"
							icon={<CheckOutlined />}
							onClick={() => {
								if (stageTitle !== "") {
									onEditStage({ ...stage, name: stageTitle });
									setTaskEdit(false);
								}
							}}
						/>
					</Space>
				</Space>
			)}
		</>
	);
};

const TaskCol = ({
	title,
	bgColor,
	data,
	stage,
	onAdd,
	onEdit,
	onDelete,
	onDeleteStage,
	onEditStage,
}) => {
	const [editTaskId, setEditTaskId] = useState(null);
	const [newCard, setNewCard] = useState(false);
	const [taskEdit, setTaskEdit] = useState(false);

	return (
		<Droppable droppableId={String(stage.id)} className="droppableContainer">
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<List
						style={{
							backgroundColor: bgColor,
							padding: 16,
							paddingTop: 0,
							borderRadius: 4,
							border: "1px solid #d9d9d9",
							height: "100%",
							width: 350,
						}}
						split={false}
						dataSource={newCard ? [{}, ...data] : data}
						header={
							<ColHeader
								title={title}
								onAdd={() => setNewCard(true)}
								onDeleteStage={onDeleteStage}
								onEdit={() => setTaskEdit(true)}
								stage={stage}
								taskEdit={taskEdit}
								setTaskEdit={setTaskEdit}
								onEditStage={onEditStage}
							/>
						}
						renderItem={(item, index) => (
							<List.Item noBorder>
								{index === 0 && newCard ? (
									<TaskForm
										onCancel={() => setNewCard(false)}
										onSubmit={(task) => {
											onAdd({ ...task, stageId: stage.id });
											setNewCard(false);
										}}
									/>
								) : editTaskId === item.id ? (
									<TaskForm
										data={item}
										onCancel={() => setEditTaskId(null)}
										onSubmit={(task) => onEdit({ ...task, stageId: stage.id })}
									/>
								) : (
									<TaskCard
										task={item}
										index={index}
										onEdit={setEditTaskId}
										onDelete={onDelete}
									/>
								)}
							</List.Item>
						)}
					/>
				</div>
			)}
		</Droppable>
	);
};

export default TaskCol;
