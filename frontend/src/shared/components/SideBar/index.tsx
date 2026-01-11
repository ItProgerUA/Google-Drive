import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown, Button } from "antd";
import {
  PlusOutlined,
  FolderAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import styles from "./Sidebar.module.css";
import CreateFolderModal from "feature/daschboard/components/CreateFolderModal";
import UploadFileModal from "feature/daschboard/components/UploadFileModal";

const SideBar = () => {
  const { folderId } = useParams<{ folderId?: string }>();
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const menuItems: MenuProps["items"] = [
    {
      key: "create-folder",
      icon: <FolderAddOutlined />,
      label: "Create folder",
      onClick: () => setIsFolderModalOpen(true),
    },
    {
      key: "upload-file",
      icon: <UploadOutlined />,
      label: "Upload file",
      onClick: () => setIsUploadModalOpen(true),
    },
  ];

  return (
    <>
      <div className={styles.sideBar}>
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className={styles.addButton}
          >
            New
          </Button>
        </Dropdown>
      </div>

      <CreateFolderModal
        open={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        parentId={folderId || null}
      />

      <UploadFileModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        folderId={folderId || null}
      />
    </>
  );
};

export default SideBar;
