import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { foldersApi } from "../../api/foldersApi";
import { useFoldersStore } from "../../store/foldersStore";
import { CreateFolderModalProps } from "types/modal";

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  open,
  onClose,
  parentId,
  onSuccess,
}) => {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const triggerRefetch = useFoldersStore((state) => state.triggerRefetch);

  const handleCreate = async () => {
    if (!folderName.trim()) {
      message.error("Please enter folder name");
      return;
    }

    setLoading(true);
    try {
      await foldersApi.createFolder({
        name: folderName.trim(),
        parentId: parentId || null,
      });
      message.success("Folder created successfully");
      setFolderName("");
      onClose();
      onSuccess?.();

      triggerRefetch();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to create folder");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFolderName("");
    onClose();
  };

  return (
    <Modal
      title="Create Folder"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="create"
          type="primary"
          loading={loading}
          onClick={handleCreate}
        >
          Create
        </Button>,
      ]}
    >
      <Input
        placeholder="Enter folder name"
        value={folderName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFolderName(e.target.value)
        }
        onPressEnter={handleCreate}
        autoFocus
      />
    </Modal>
  );
};

export default CreateFolderModal;
