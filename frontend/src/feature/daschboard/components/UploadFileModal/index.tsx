import React, { useState } from "react";
import { Modal, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { filesApi } from "../../api/filesApi";
import { useFoldersStore } from "../../store/foldersStore";
import { UploadFileModalProps } from "types/modal";
const UploadFileModal: React.FC<UploadFileModalProps> = ({
  open,
  onClose,
  folderId,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const triggerRefetch = useFoldersStore((state) => state.triggerRefetch);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Please select a file");
      return;
    }

    const file = fileList[0].originFileObj as File;

    setLoading(true);
    try {
      await filesApi.uploadFile(file, folderId);
      message.success("File uploaded successfully");
      setFileList([]);
      onClose();
      triggerRefetch();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFileList([]);
    onClose();
  };

  return (
    <Modal
      title="Upload File"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          loading={loading}
          onClick={handleUpload}
          disabled={fileList.length === 0}
        >
          Upload
        </Button>,
      ]}
    >
      <Upload
        fileList={fileList}
        onChange={({ fileList }: { fileList: UploadFile[] }) =>
          setFileList(fileList)
        }
        beforeUpload={() => false}
        maxCount={1}
        accept="image/*,video/*"
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  );
};

export default UploadFileModal;
