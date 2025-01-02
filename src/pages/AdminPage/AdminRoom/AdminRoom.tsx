import React, { useEffect, useState } from 'react';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, Modal, Select, Table, Popconfirm } from 'antd';

const AdminRoom = () => {
  const [form] = Form.useForm();
  const [roomList, setRoomList] = useState<any[]>([]);
  const [roomTierList, setRoomTierList] = useState<any[]>([]);
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);
  const [openCreateRoomTierModal, setOpenCreateRoomTierModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [editingRoomTier, setEditingRoomTier] = useState<any | null>(null);

  const fetchRoomList = async () => {
    const res = await MainApiRequest.get('/room/list');
    setRoomList(res.data);
  };

  useEffect(() => {
    fetchRoomList();
  }, []);

  const onOpenCreateRoomModal = () => {
    setOpenCreateRoomModal(true);
  };

  const onOKCreateRoom = async () => {
    setOpenCreateRoomModal(false);
    const data = form.getFieldsValue();
    if (editingRoom) {
      await MainApiRequest.put(`/room/${editingRoom.id}`, data);
    } else {
      await MainApiRequest.post('/room', data);
    }
    fetchRoomList();
    setEditingRoom(null);
    form.resetFields();
  };

  const onCancelCreateRoom = () => {
    setOpenCreateRoomModal(false);
    setEditingRoom(null);
    form.resetFields();
  };

  const onEditRoom = (room: any) => {
    setEditingRoom(room);
    form.setFieldsValue(room);
    setOpenCreateRoomModal(true);
  };

  const onDeleteRoom = async (id: number) => {
    await MainApiRequest.delete(`/room/${id}`);
    fetchRoomList();
  };

  return (
    <div className="container-fluid m-2">
      <h3 className="h3">Room Management</h3>

      <Button type="primary" onClick={() => onOpenCreateRoomModal()}>
        Create Room
      </Button>

      <Modal
        title={editingRoom ? "Edit Room" : "Create Room"}
        open={openCreateRoomModal}
        onOk={() => onOKCreateRoom()}
        onCancel={() => onCancelCreateRoom()}
      >
        <Form form={form}>
          <Form.Item label="Room Name" name="name" rules={[{ required: true, message: 'Please input room name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Room Tier" name="roomTierId" rules={[{ required: true, message: 'Please select room tier!' }]}>
            <Select>
              {roomTierList.map((tier) => (
                <Select.Option key={tier.id} value={tier.id}>
                  {tier.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Room List Table */}
      <Table
        dataSource={roomList}
        columns={[
          { title: 'Room Name', dataIndex: 'name', key: 'name' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
          { title: 'Room Tier', dataIndex: 'roomTier', key: 'roomTier', render(_, record) 
            { return record.name }
          },
          {
            title: 'Features', dataIndex: 'features', key: 'features', render: (_, roomDetail) => {
              const features = {
                isBalcony: roomDetail?.isBalcony,
                isBathroom: roomDetail?.isBathroom,
                isAirConditioner: roomDetail?.isAirConditioner,
                isFreeWifi: roomDetail?.isFreeWifi,
                isTelevision: roomDetail?.isTelevision,
                isRefrigerator: roomDetail?.isRefrigerator,
                isBreakfast: roomDetail?.isBreakfast,
                isLunch: roomDetail?.isLunch,
                isDinner: roomDetail?.isDinner,
                isSnack: roomDetail?.isSnack,
                isDrink: roomDetail?.isDrink,
                isParking: roomDetail?.isParking,
                isSwimmingPool: roomDetail?.isSwimmingPool,
                isGym: roomDetail?.isGym,
                isSpa: roomDetail?.isSpa,
                isLaundry: roomDetail?.isLaundry,
                isCarRental: roomDetail?.isCarRental,
                isBusService: roomDetail?.isBusService,
              }

              const featureIcons: { [key: string]: string } = {
                isBalcony: "bi-house",
                isTelevision: "bi-tv",
                isAirConditioner: "bi-fan",
                isBathroom: "bi-droplet",
                isFreeWifi: "bi-wifi",
                isRefrigerator: "bi-box",
                isBreakfast: "bi-cup",
                isLunch: "bi-cup",
                isDinner: "bi-cup",
                isSnack: "bi-basket",
                isDrink: "bi-cup-straw",
                isParking: "bi-car-front",
                isSwimmingPool: "bi-person-workspace",
                isGym: "bi-droplet-half",
                isSpa: "bi-person-workspace",
                isLaundry: "bi-bucket",
                isCarRental: "bi-car-front",
                isBusService: "bi-bus-front",
              };

              return (
                <ul style={{ listStyle: '-', padding: 0, textAlign: 'left' }}>
                  {Object.entries(features).map(([feature, value]) => {
                    if (value) {
                      return (
                        <li>
                          <i key={feature} className={`bi ${featureIcons[feature]} me-2 text-success`}></i>
                          {feature.replace('is', '')}
                        </li>
                      )
                    }
                    return null;
                  })}
                </ul>
              )
            }
          },
          {
            title: 'Actions', key: 'actions', render: (_, record) => (
              <>
                <Button type="link" onClick={() => onEditRoom(record)}>Edit</Button>
                <Popconfirm
                  title="Are you sure to delete this room?"
                  onConfirm={() => onDeleteRoom(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>Delete</Button>
                </Popconfirm>
              </>
            )
          }
        ]}
      />
    </div>
  );
};

export default AdminRoom;
