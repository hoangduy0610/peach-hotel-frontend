import React, { useEffect, useState } from 'react';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, Modal, Table, Space, Popconfirm, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import imgDefault from '@/assets/bed7.jpg';
import img from '@/assets/tienich1.jpg';
import "./AdminRoomTier.scss";

const AdminRoomTier = () => {
  const [form] = Form.useForm();
  const [roomTierList, setRoomTierList] = useState<any[]>([]);
  const [openCreateRoomTierModal, setOpenCreateRoomTierModal] = useState(false);
  const [editingRoomTier, setEditingRoomTier] = useState<any | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchRoomTierList = async () => {
    const res = await MainApiRequest.get('/room/tier/list');
    setRoomTierList(res.data);
  };

  useEffect(() => {
    fetchRoomTierList();
  }, []);

  const handleImageChange = (info: any) => {
    const file = info.file.originFileObj;
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      form.setFieldValue('imageUrl', reader.result as string); // Lưu ảnh dưới dạng Base64 hoặc link.
    };
    reader.readAsDataURL(file);
  };

  const onOpenCreateRoomTierModal = () => {
    setOpenCreateRoomTierModal(true);
    setImagePreview(null);
  };

  const onOKCreateRoomTier = async () => {
    setOpenCreateRoomTierModal(false);
    const data = form.getFieldsValue();
    if (editingRoomTier) {
      await MainApiRequest.put(`/room/tier/${editingRoomTier.id}`, data);
    } else {
      await MainApiRequest.post('/room/tier', data);
    }
    
    fetchRoomTierList();
    setEditingRoomTier(null);
    form.resetFields();
  };

  const onCancelCreateRoomTier = () => {
    setOpenCreateRoomTierModal(false);
    setEditingRoomTier(null);
    setImagePreview(null);
    form.resetFields();
  };

  const onEditRoomTier = (tier: any) => {
    setEditingRoomTier(tier);
    form.setFieldsValue({
      ...tier,
      imageUrl: tier.images?.[0] || null, // Chỉ lấy hình ảnh đầu tiên trong danh sách.
    });
    setImagePreview(tier.images?.[0] || null);
    setOpenCreateRoomTierModal(true);
  };

  const onDeleteRoomTier = async (id: number) => {
    await MainApiRequest.delete(`/room/tier/${id}`);
    fetchRoomTierList();
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
              showUploadList={false}
              accept="image/*"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleImageChange}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}                
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
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
            <Form.Item label="Slot" name="slot">
              <Input readOnly />
            </Form.Item>
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
                  <Button onClick={() => onDeleteRoomTier(record.id)} danger>
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
