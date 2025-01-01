import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Modal, Table } from 'antd';
import moment from 'moment';

const AdminRoom = () => {
  const [form] = Form.useForm();
  const [roomList, setRoomList] = useState<any[]>([]);
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);

  // Dữ liệu mẫu
  const sampleRoomList = [
    {
      id: 1,
      roomTierId: 1,
      name: 'Room 101',
      floor: 1,
      price: 100,
    },
    {
      id: 2,
      roomTierId: 2,
      name: 'Room 102',
      floor: 1,
      price: 120,
    },
    {
      id: 3,
      roomTierId: 1,
      name: 'Room 103',
      floor: 1,
      price: 150,
    },
  ];

  const fetchRoomList = async () => {
    // Sử dụng dữ liệu mẫu thay vì gọi API
    setRoomList(sampleRoomList);
  };

  useEffect(() => {
    fetchRoomList();
  }, []);

  const onOpenCreateRoomModal = () => {
    form.resetFields();
    setOpenCreateRoomModal(true);
  };

  const onOKCreateRoom = () => {
    const data = form.getFieldsValue();
    const newRoom = {
      ...data,
      id: roomList.length + 1,
    };
    setRoomList([...roomList, newRoom]);
    setOpenCreateRoomModal(false);
  };

  const onCancelCreateRoom = () => {
    setOpenCreateRoomModal(false);
  };

  return (
    <div className="container-fluid m-2">
      <h3 className="h3">Room Management</h3>
      <Button type="primary" onClick={onOpenCreateRoomModal}>
        Create Room
      </Button>

      <Modal
        title="Create Room"
        open={openCreateRoomModal}
        onOk={onOKCreateRoom}
        onCancel={onCancelCreateRoom}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Room Tier ID"
            name="roomTierId"
            rules={[{ required: true, message: 'Please input room tier ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input room name!' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Floor"
            name="floor"
            rules={[{ required: true, message: 'Please input floor!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={roomList}
        columns={[
          { title: 'Room Tier ID', dataIndex: 'roomTierId', key: 'roomTierId' },
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Floor', dataIndex: 'floor', key: 'floor' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
        ]}
        rowKey="id"
      />
    </div>
  );
};

export default AdminRoom;
