import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Table, Space, message } from 'antd';

const AdminRoomTier = () => {
    const [form] = Form.useForm();
    const [roomTierList, setRoomTierList] = useState<any[]>([]);
    const [openCreateRoomTierModal, setOpenCreateRoomTierModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRoomTier, setCurrentRoomTier] = useState<any | null>(null);

    // Dữ liệu mẫu
    const sampleRoomTierList = [
        {
            id: 1,
            name: 'Deluxe',
            description: 'Phòng cao cấp với view đẹp',
            slot: 5,
            capacity: 2
        },
        {
            id: 2,
            name: 'Standard',
            description: 'Phòng tiêu chuẩn với đầy đủ tiện nghi',
            slot: 10,
            capacity: 2
        },
        {
            id: 3,
            name: 'Suite',
            description: 'Phòng hạng sang với nhiều dịch vụ cao cấp',
            slot: 3,
            capacity: 4
        }
    ];

    const fetchRoomTierList = async () => {
        setRoomTierList(sampleRoomTierList);
    }

    useEffect(() => {
        fetchRoomTierList();
    }, []);

    const onOpenCreateRoomTierModal = () => {
        form.resetFields();
        setCurrentRoomTier(null);
        setIsEditing(false);
        setOpenCreateRoomTierModal(true);
    }

    const onOKCreateRoomTier = () => {
        form.validateFields().then(values => {
            const newRoomTier = {
                ...values,
                id: isEditing ? currentRoomTier.id : roomTierList.length + 1,
            };

            if (isEditing) {
                setRoomTierList(roomTierList.map(roomTier => roomTier.id === currentRoomTier.id ? newRoomTier : roomTier));
            } else {
                setRoomTierList([...roomTierList, newRoomTier]);
            }

            setOpenCreateRoomTierModal(false);
            message.success(isEditing ? 'Room tier updated successfully!' : 'Room tier created successfully!');
        });
    }

    const onCancelCreateRoomTier = () => {
        setOpenCreateRoomTierModal(false);
    }

    const onEditRoomTier = (record: any) => {
        setCurrentRoomTier(record);
        form.setFieldsValue(record);
        setIsEditing(true);
        setOpenCreateRoomTierModal(true);
    }

    const onDeleteRoomTier = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this room tier?',
            onOk: () => {
                setRoomTierList(roomTierList.filter(roomTier => roomTier.id !== id));
                message.success('Room tier deleted successfully!');
            },
        });
    }

    return (
        <div className="container-fluid m-2">
            <h3 className='h3'>Room Tier Management</h3>
            <Button
                type='primary'
                onClick={onOpenCreateRoomTierModal}
            >
                Create Room Tier
            </Button>

            <Modal
                title={isEditing ? "Edit Room Tier" : "Create Room Tier"}
                open={openCreateRoomTierModal}
                onOk={onOKCreateRoomTier}
                onCancel={onCancelCreateRoomTier}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input room tier name!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Description'
                        name='description'
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        label='Slot'
                        name='slot'
                        rules={[{ required: true, message: 'Please input slot!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        label='Capacity'
                        name='capacity'
                        rules={[{ required: true, message: 'Please input capacity!' }]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                dataSource={roomTierList}
                columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Slot', dataIndex: 'slot', key: 'slot' },
                    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
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
                rowKey="id"
            />
        </div>
    );
};

export default AdminRoomTier;
