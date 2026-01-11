import { useState, ChangeEvent } from "react";
import {
  FileOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Modal, Input, Dropdown } from "antd";
import type { MenuProps } from "antd";
import styles from "../../Dashboard.module.css";
import { filesApi } from "feature/daschboard/api/filesApi";
import { useFoldersStore } from "feature/daschboard/store/foldersStore";
import { useSearch } from "feature/daschboard/hooks/useSearch";
import { FileResponse } from "types/file";
const ViewFiles = ({
  isSearching,
  ...file
}: FileResponse & { isSearching: boolean }) => {
  const triggerRefetch = useFoldersStore((state) => state.triggerRefetch);
  const { removeFile } = useSearch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleDelete = async () => {
    await filesApi.deleteFile(file.id);
    triggerRefetch();
    removeFile(file.id);
  };

  const openEditModal = () => {
    setNewName(file.name);
    setIsModalOpen(true);
  };

  const handleEditConfirm = async () => {
    await filesApi.editFile(file.id, newName, file.folderId);
    triggerRefetch();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClone = async () => {
    await filesApi.cloneFile(file.id);
    triggerRefetch();
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: openEditModal,
    },
    {
      key: "clone",
      label: "Clone",
      icon: <CopyOutlined />,
      onClick: handleClone,
    },
    {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: handleDelete,
    },
  ];

  const renderDropdown = () => (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <EditOutlined
        className={styles.moreIcon}
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );

  const renderModal = () => (
    <Modal
      title="Rename file"
      open={isModalOpen}
      onOk={handleEditConfirm}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <Input
        value={newName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewName(e.target.value)
        }
        placeholder="Enter new name"
      />
    </Modal>
  );

  if (file.mimetype.startsWith("image/")) {
    return (
      <>
        <img src={file.url} alt={file.name} className={styles.fileImage} />
        {!isSearching && (
          <>
            {renderDropdown()}
            {renderModal()}
          </>
        )}
      </>
    );
  }

  if (file.mimetype.startsWith("video/")) {
    return (
      <>
        <video src={file.url} controls className={styles.fileVideo} />
        {!isSearching && (
          <>
            {renderDropdown()}
            {renderModal()}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <FileOutlined className={styles.fileIcon} />
      {!isSearching && (
        <>
          {renderDropdown()}
          {renderModal()}
        </>
      )}
    </>
  );
};

export default ViewFiles;
