import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import { useState } from "react";

const TaskForm = ({ data, onCancel, onSubmit }) => {
  const [task, setTask] = useState(data || {});
  return (
    <Card
      title={
        <Input
          value={task.title}
          placeholder="Title"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      }
      actions={[
        <Button type="dashed" icon={<CloseOutlined />} onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          type="primary"
          onClick={() => {
            onSubmit(task);
            onCancel();
          }}
        >
          Save
        </Button>,
      ]}
      style={{ width: "100%" }}
    >
      <Input.TextArea
        value={task.description}
        placeholder="Description"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
    </Card>
  );
};

export default TaskForm;
