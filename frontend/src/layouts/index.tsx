import { Outlet } from "react-router-dom";
import Header from "shared/components/Header";
import SideBar from "shared/components/SideBar";
import styles from "./Layout.module.css";
import { useSocket } from "shared/hools/useSocket";
const Layout = () => {
  useSocket();
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.layoutContent}>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
