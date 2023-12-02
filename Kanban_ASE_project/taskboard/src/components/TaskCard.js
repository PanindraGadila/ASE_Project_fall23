import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown } from "antd";
import { Draggable } from "react-beautiful-dnd";

const items = [
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    label: "Delete",
  },
];

const Options = ({ handleClick }) => {
  return (
    <Dropdown
      menu={{ items, onClick: handleClick }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button shape="circle" icon={<EllipsisOutlined />} />
    </Dropdown>
  );
};

const TaskCard = ({ index, task, onEdit, onDelete }) => {
  const handleClick = ({ key }) => {
    console.log(key);
    switch (key) {
      case "edit":
        onEdit(task.id);
        break;
      case "delete":
        onDelete(task.id);
        break;
      default:
        break;
    }
  };

  return (
    <Draggable
      draggableId={task.id.toString()}
      index={index}
      className="dragabbleItem"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            width: snapshot.isDragging ? 300 : "100%",
            ...provided.draggableProps.style,
          }}
        >
          <Card
            title={task.title}
            extra={<Options handleClick={handleClick} />}
            style={{ width: "100%" }}
          >
            <p>{task.description}</p>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
