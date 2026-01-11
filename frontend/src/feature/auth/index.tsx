import { useState } from "react";
import { Typography } from "antd";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import styles from "./Auth.module.css";

const { Title, Link } = Typography;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <Title level={2}>{isLogin ? "Login" : "Sin Up"}</Title>

        {isLogin ? <Login /> : <SignUp />}

        <div className={styles.switchForm}>
          {isLogin ? (
            <span>
              <Link onClick={() => setIsLogin(false)}>Sin Up</Link>
            </span>
          ) : (
            <span>
              <Link onClick={() => setIsLogin(true)}>Login</Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
