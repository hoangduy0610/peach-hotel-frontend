import React, { useEffect, useState } from 'react';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, Modal, Table, Popconfirm } from 'antd';

const AdminRoomTier = () => {
    const [form] = Form.useForm();
    const [roomTierList, setRoomTierList] = useState<any[]>([]);
    const [openCreateRoomTierModal, setOpenCreateRoomTierModal] = useState(false);
    const [editingRoomTier, setEditingRoomTier] = useState<any | null>(null);

    const fetchRoomTierList = async () => {
        const res = await MainApiRequest.get('/room/tier/list');
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
        const data = form.getFieldsValue();
        if (editingRoomTier) {
            await MainApiRequest.put(`/room/tier/put/${editingRoomTier.id}`, data);
        } else {
            await MainApiRequest.post('/room/tier/post', data);
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
        form.setFieldsValue(tier);
        setOpenCreateRoomTierModal(true);
    };

    const onDeleteRoomTier = async (id: number) => {
        await MainApiRequest.delete(`/room/tier/delete/${id}`);
        fetchRoomTierList();
    };

    return (
        <div className="container-fluid m-2">
            <h3 className="h3">Room Tier Management</h3>

            <Button type="primary" onClick={() => onOpenCreateRoomTierModal()}>
                Create Room Tier
            </Button>

            <Modal
                title={editingRoomTier ? "Edit Room Tier" : "Create Room Tier"}
                open={openCreateRoomTierModal}
                onOk={() => onOKCreateRoomTier()}
                onCancel={() => onCancelCreateRoomTier()}
            >
                <Form form={form}>
                    <Form.Item label="Tier Name" name="name" rules={[{ required: true, message: 'Please input tier name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please input tier type!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Slots" name="slot" rules={[{ required: true, message: 'Please input number of slots!' }]}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Room Tier List Table */}
            <Table
                dataSource={roomTierList}
                columns={[
                    { title: 'Tier Name', dataIndex: 'name', key: 'name' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Slots', dataIndex: 'slot', key: 'slot' },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <Button onClick={() => onEditRoomTier(record)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Button onClick={() => onDeleteRoomTier(record.id)} danger>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AdminRoomTier;
