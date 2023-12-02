import { Alert, Button, Card, Form, Input } from "antd";
import { useState } from "react";
import * as stageApi from "../api/stage";

const AddTaskCol = ({ addStage }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      const res = await stageApi.createStage(values);
      addStage(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Card
      style={{
        padding: 16,
        paddingTop: 0,
        borderRadius: 4,
        border: "1px solid #d9d9d9",
        height: "100%",
        width: 350,
      }}
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        onValuesChange={() => {
          setError(null);
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        {error && (
          <Alert
            style={{ marginBottom: 12, width: "100%" }}
            message={error}
            type="error"
          />
        )}

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the stage",
            },
          ]}
        >
          <Input placeholder="Name of the stage" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Add Stage
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddTaskCol;
