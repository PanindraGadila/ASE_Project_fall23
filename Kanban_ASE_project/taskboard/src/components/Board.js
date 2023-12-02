import { Col, Row, Space } from "antd";
import TaskCol from "./TaskCol";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import * as taskApi from "../api/task";
import * as stageApi from "../api/stage";
import AddTaskCol from "./AddTaskCol";

// const dummyData = [
//   {
//     id: 1,
//     title: "Task 1",
//     description: "Description 1",
//     status: "To-Do",
//   },
//   {
//     id: 2,
//     title: "Task 2",
//     description: "Description 2",
//     status: "In Progress",
//   },
//   {
//     id: 3,
//     title: "Task 3",
//     description: "Description 3",
//     status: "Done",
//   },
// ];

const Board = () => {
	const [stages, setStages] = useState([]);

	useEffect(() => {
		getStages();
	}, []);

	const getStages = async () => {
		stageApi.getStages().then((res) => {
			setStages(res.data);
		});
	};

	const addStage = (stage) => {
		setStages([...stages, stage]);
	};

	const handleAdd = async (task) => {
		await taskApi.createTask(task);
		getStages();
	};
	const handleEdit = async (task) => {
		const res = await taskApi.updateTask(task);
		getStages();
	};
	const handleDelete = async (id) => {
		await taskApi.deleteTask(id);
		getStages();
	};

	const handleEditStage = async (stage) => {
		await stageApi.updateStage(stage);
		getStages();
	};

	const actions = {
		onAdd: handleAdd,
		onEdit: handleEdit,
		onDelete: handleDelete,
		onEditStage: handleEditStage,
	};

	const onDragEnd = async (result) => {
		const { destination, source, draggableId } = result;
		console.log(destination, source, draggableId);
		if (!destination) return;
		if (destination.droppableId === source.droppableId) return;

		const stage = stages.find(
			(stage) => stage.id === Number(source.droppableId)
		);
		const task = stage.tasks.find((task) => task.id === Number(draggableId));
		const newTask = { ...task, stageId: destination.droppableId };
		await handleEdit(newTask);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Space
				style={{
					marginTop: 16,
					display: "flex",
					flexDirection: "row",
					overflow: "scroll",
					height: "86vh",
					alignItems: "flex-start",
					borderRadius: 4,
					border: "1px solid #d9d9d9",
					padding: 16,
					backgroundColor: "#f0f2f5",
				}}
			>
				{stages.map((stage) => (
					<TaskCol
						title={stage.name}
						// yellow shade
						bgColor={"#fdfcec"}
						data={stage.tasks || []}
						stage={stage}
						onDeleteStage={() => {
							stageApi.deleteStage(stage.id).then(() => {
								getStages();
							});
						}}
						{...actions}
					/>
				))}

				<AddTaskCol addStage={addStage} />
			</Space>
		</DragDropContext>
	);
};

export default Board;
