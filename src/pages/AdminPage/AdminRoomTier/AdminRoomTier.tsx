import imgDefault from '@/assets/bed7.jpg';
import { AdminApiRequest } from '@/services/AdminApiRequest';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, GetProp, Input, Modal, Popconfirm, Progress, Space, Table, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import "./AdminRoomTier.scss";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type UploadRequestOption = Parameters<GetProp<UploadProps, 'customRequest'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AdminRoomTier = () => {
  const [form] = Form.useForm();
  const [progress, setProgress] = useState(0);
  const [roomTierList, setRoomTierList] = useState<any[]>([]);
  const [openCreateRoomTierModal, setOpenCreateRoomTierModal] = useState(false);
  const [editingRoomTier, setEditingRoomTier] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleChange = (info: any) => {
    setFileList(info.fileList);
    console.log("info: ", info);
  };

  const handleUpload = async (options: UploadRequestOption) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress && onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    try {
      const res = await AdminApiRequest.post("/file/upload", fmData, config);
      const { data } = res;
      setImageUrls([...imageUrls, data.url]);
      onSuccess && onSuccess("Ok");
    } catch (err: any) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError && onError(error);
    }
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }

  const fetchRoomTierList = async () => {
    const res = await AdminApiRequest.get('/room/tier/list');
    setRoomTierList(res.data);
  };

  useEffect(() => {
    fetchRoomTierList();
  }, []);

  const onOpenCreateRoomTierModal = () => {
    setOpenCreateRoomTierModal(true);
  };

  const onOKCreateRoomTier = async () => {
    setOpenCreateRoomTierModal(false);
    const data = {
      name: form.getFieldValue('name'),
      description: form.getFieldValue('description'),
      slot: 1,
      images: imageUrls,
      capacity: parseInt(form.getFieldValue('capacity') || "0"),
    }
    if (editingRoomTier) {
      await AdminApiRequest.put(`/room/tier/${editingRoomTier.id}`, data);
    } else {
      await AdminApiRequest.post('/room/tier', data);
    }

    fetchRoomTierList();
    setEditingRoomTier(null);
    form.resetFields();
  };

  const onCancelCreateRoomTier = () => {
    setOpenCreateRoomTierModal(false);
    setEditingRoomTier(null);
    form.resetFields();
  };

  const onEditRoomTier = (tier: any) => {
    setEditingRoomTier(tier);
    form.setFieldsValue({
      ...tier,
      // imageUrl: tier.images?.[0] || null, // Chỉ lấy hình ảnh đầu tiên trong danh sách.
    });
    setFileList(tier.images?.map((image: string, index: number) => ({
      uid: index.toString(),
      name: tier.name + ".png",
      status: "done",
      response: '{"status": "success"}',
      url: image,
    })) || []);
    setImageUrls(tier.images || []);
    setOpenCreateRoomTierModal(true);
  };

  const onDeleteRoomTier = async (id: number) => {
    await AdminApiRequest.delete(`/room/tier/${id}`);
    fetchRoomTierList();
  };

  const handleRemove = (file: any) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    setImageUrls(imageUrls.filter((url) => url !== file.url));
  };

  return (
    <div className="container-fluid m-2">
      <h3 className="h3">Room Tier Management</h3>

      <Button type="primary" onClick={() => onOpenCreateRoomTierModal()}>
        Create Room Tier
      </Button>

      <Modal
        className="roomTier-modal"
        title={editingRoomTier ? "Edit Room Tier" : "Create Room Tier"}
        open={openCreateRoomTierModal}
        onOk={() => onOKCreateRoomTier()}
        onCancel={() => onCancelCreateRoomTier()}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ slot: 1 }}>
          <Form.Item
            label="Images"
            name="imageUrl"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                accept="image/*"
                onPreview={handlePreview}
                customRequest={handleUpload}
                onRemove={handleRemove}
                onChange={handleChange}
              >
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
              {progress > 0 ? <Progress percent={progress} /> : null}
            </div>
          </Form.Item>
          <Form.Item
            label="Tier Name"
            name="name"
            rules={[{ required: true, message: 'Please input tier name!' }]}
          >
            <Input type="text" />
          </Form.Item>
          <div className="field-row">
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: 'Please input number of capacity!' }]}
            >
              <Input type="number" />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      {/* Room Tier List Table */}
      <Table
        className='roomTier-table'
        pagination={{
          pageSize: 5, // Số lượng item trên mỗi trang
          showSizeChanger: true, // Hiển thị tùy chọn thay đổi số item trên mỗi trang
          pageSizeOptions: ['5', '10', '20'], // Các tùy chọn cho số item mỗi trang
        }}
        dataSource={roomTierList}
        columns={[
          {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
              <img
                src={images?.[0] || imgDefault}
                alt="Room"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                }}
              />
            ),
          },
          { title: 'Tier Name', dataIndex: 'name', key: 'name' },
          { title: 'Description', dataIndex: 'description', key: 'description' },
          { title: 'Available', dataIndex: 'available', key: 'available' },
          { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button onClick={() => onEditRoomTier(record)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Popconfirm
                  title="Are you sure to delete this room tier?"
                  onConfirm={() => onDeleteRoomTier(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>
                    <i className="fas fa-trash"></i>
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminRoomTier;
