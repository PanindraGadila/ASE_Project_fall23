import React, { useState } from "react";
import { Alert, Button, Form, Input, Space } from "antd";
import * as userApi from "../api/auth";

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const Register = () => {
	const [form] = Form.useForm();
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	const onFinish = async (values) => {
		try {
			const res = await userApi.signUp(values);
			setMessage(res.data.message);
		} catch (error) {
			setError(error.response.data.message);
		}
		console.log("Received values of form: ", values);
	};

	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			onValuesChange={() => {
				setMessage(null);
				setError(null);
			}}
			style={{
				maxWidth: 600,
			}}
			scrollToFirstError
		>
			<h1>Register</h1>

			{message && (
				<Alert
					style={{ marginBottom: 12, width: "100%" }}
					message={message}
					type="success"
				/>
			)}
			{error && (
				<Alert
					style={{ marginBottom: 12, width: "100%" }}
					message={error}
					type="error"
				/>
			)}

			<Form.Item
				name="username"
				label="E-mail"
				rules={[
					{
						type: "email",
						message: "The input is not valid E-mail!",
					},
					{
						required: true,
						message: "Please input your E-mail!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "Please confirm your password!",
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(
								new Error("The new password that you entered do not match!")
							);
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};
export default Register;
