import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import Typography from "antd/es/typography/Typography";
import Board from "./components/Board";
import * as authApi from "./api/auth";
import Auth from "./components/Auth";

const { Header, Content } = Layout;

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    authApi
      .getUser()
      .then((res) => {
        setUser({ ...res.data, isAuthenticated: true });
      })
      .catch(() => {
        setUser({ isAuthenticated: false });
      });
  };

  const logout = async () => {
    await authApi.signOut();
    setUser({ isAuthenticated: false });
  };

  console.log(user);

  return (
    <Layout
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography.Title style={{ color: "white", marginTop: 4 }} level={3}>
          Kanban Board
        </Typography.Title>
        <div style={{ marginLeft: "auto" }}>
          <Typography.Text style={{ color: "white", marginRight: 8 }}>
            {user.username}
          </Typography.Text>
          {user.isAuthenticated && <Button onClick={logout}>Logout</Button>}
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        {user.isAuthenticated ? (
          <Board />
        ) : (
          <Auth
            setUser={(user) => setUser({ ...user, isAuthenticated: true })}
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;
