import logo from "assets/logo192.png";
import styles from "./Header.module.css";
import { Button } from "antd";
import { useAuth } from "feature/auth/hooks/useAuth";
import { useAuthStore } from "feature/auth/store/authStore";

const Header = () => {
  const { logout } = useAuth();
  const name = useAuthStore((state) => state.name);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h1>Google Drive Lite</h1>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.userName}>{name}</span>
        <Button type="primary" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
