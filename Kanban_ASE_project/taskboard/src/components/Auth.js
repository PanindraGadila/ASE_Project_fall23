import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Button } from "antd";

const Auth = ({ setUser }) => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "calc(100vh - 64px)",
			}}
		>
			<div
				style={{
					width: 500,
					padding: 24,
					backgroundColor: "white",
					borderRadius: 4,
					boxShadow: "0 0 10px rgba(0,0,0,0.2)",
				}}
			>
				{isLogin ? <Login onLogin={setUser} /> : <Register />}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: 16,
					}}
				>
					<span style={{ marginRight: 8 }}>
						{isLogin ? "Don't have an account?" : "Already have an account?"}
					</span>
					<Button type="link" onClick={() => setIsLogin(!isLogin)}>
						{isLogin ? "Register now!" : "Login now!"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Auth;
