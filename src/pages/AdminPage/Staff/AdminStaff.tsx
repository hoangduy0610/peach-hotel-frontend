import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Modal, Table, Space, Popconfirm } from 'antd';
import moment from 'moment';

const AdminStaff = () => {
    const [form] = Form.useForm();
    const [staffList, setStaffList] = useState<any[]>([]);
    const [openCreateStaffModal, setOpenCreateStaffModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStaff, setCurrentStaff] = useState<any | null>(null);

    // Dữ liệu mẫu
    const sampleStaffList = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phoneNumber: '0123456789',
            position: 'Manager',
            startDate: '2023-01-01T10:00:00'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            phoneNumber: '0987654321',
            position: 'Receptionist',
            startDate: '2023-03-15T09:00:00'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@example.com',
            phoneNumber: '0223344556',
            position: 'Housekeeper',
            startDate: '2023-06-10T08:30:00'
        }
    ];

    const fetchStaffList = async () => {
        setStaffList(sampleStaffList);
    };

    useEffect(() => {
        fetchStaffList();
    }, []);

    const onOpenCreateStaffModal = () => {
        form.resetFields();
        setCurrentStaff(null);
        setIsEditing(false);
        setOpenCreateStaffModal(true);
    };

    const onOKCreateStaff = () => {
        form.validateFields().then(values => {
            const newStaff = {
                ...values,
                id: isEditing ? currentStaff.id : staffList.length + 1,
                startDate: values.startDate.toISOString(),
            };

            if (isEditing) {
                setStaffList(staffList.map(staff => staff.id === currentStaff.id ? newStaff : staff));
            } else {
                setStaffList([...staffList, newStaff]);
            }

            setOpenCreateStaffModal(false);
        });
    };

    const onCancelCreateStaff = () => {
        setOpenCreateStaffModal(false);
    };

    const onEditStaff = (record: any) => {
        setCurrentStaff(record);
        form.setFieldsValue({
            ...record,
            startDate: moment(record.startDate),
        });
        setIsEditing(true);
        setOpenCreateStaffModal(true);
    };

    const onDeleteStaff = (id: number) => {
        setStaffList(staffList.filter(staff => staff.id !== id));
    };

    return (
        <div className="container-fluid m-2">
            <h3 className='h3'>Staff Management</h3>
            <Button
                type='primary'
                onClick={onOpenCreateStaffModal}
            >
                Create Staff
            </Button>

            <Modal
                title={isEditing ? "Edit Staff" : "Create Staff"}
                open={openCreateStaffModal}
                onOk={onOKCreateStaff}
                onCancel={onCancelCreateStaff}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input staff name!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true, message: 'Please input email!' }]}
                    >
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item
                        label='Phone Number'
                        name='phoneNumber'
                        rules={[{ required: true, message: 'Please input phone number!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Position'
                        name='position'
                        rules={[{ required: true, message: 'Please input position!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Start Date'
                        name='startDate'
                        rules={[{ required: true, message: 'Please select start date!' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                dataSource={staffList}
                columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
                    { title: 'Position', dataIndex: 'position', key: 'position' },
                    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: (startDate: string) => moment(startDate).format('YYYY-MM-DD HH:mm:ss') },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <Button type="primary" onClick={() => onEditStaff(record)}>
                                    Edit
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this staff?"
                                    onConfirm={() => onDeleteStaff(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>
                                        Delete
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

export default AdminStaff;
