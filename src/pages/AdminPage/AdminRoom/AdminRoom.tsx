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
            await MainApiRequest.put(`/room/put/${editingRoom.id}`, data);
        } else {
            await MainApiRequest.post('/room/post', data);
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
        await MainApiRequest.delete(`/room/delete/${id}`);
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
                    {
                        title: 'Tier', dataIndex: 'roomTierId', key: 'roomTierId', render: (roomTierId) => {
                            const tier = roomTierList.find((tier: any) => tier.id === roomTierId);
                            return tier ? tier.name : 'N/A';
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
