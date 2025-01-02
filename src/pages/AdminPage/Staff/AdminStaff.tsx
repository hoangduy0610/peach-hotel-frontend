import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Modal, Table, Space, Popconfirm, message, Select } from 'antd';
import { MainApiRequest } from '@/services/MainApiRequest';
import "./AdminStaff.scss";

const AdminStaff = () => {
    const [form] = Form.useForm();
    const [staffList, setStaffList] = useState<any[]>([]);

    const [openCreateStaffModal, setOpenCreateStaffModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState<any | null>(null);
<<<<<<< HEAD
    
=======
    const [nextId, setNextId] = useState<number>(1); // Quản lý ID tiếp theo

>>>>>>> 61b62cfa378cb701ab7ab3b63ba1c0abaa40c14f
    const fetchStaffList = async () => {
        const res = await MainApiRequest.get('/staff/list');
        setStaffList(res.data);
    };

    useEffect(() => {
        fetchStaffList();
    }, []);

    const onOpenCreateStaffModal = () => {
<<<<<<< HEAD
        setOpenCreateStaffModal(true);    
=======
        setEditingStaff(null); // Xóa trạng thái đang chỉnh sửa
        form.setFieldsValue({});
        setOpenCreateStaffModal(true);
>>>>>>> 61b62cfa378cb701ab7ab3b63ba1c0abaa40c14f
    };

    const onOKCreateStaff = async () => {
        setOpenCreateStaffModal(false);
        const data = form.getFieldsValue();
        if (editingStaff) {
            const {
                password,
                ...rest
            } = data;
            await MainApiRequest.put(`/staff/${editingStaff.id}`, rest);
        } else {
            await MainApiRequest.post('/staff', data);
        }
        fetchStaffList();
        setEditingStaff(null);
        form.resetFields();
    }


    const onCancelCreateStaff = () => {
        setOpenCreateStaffModal(false);
        setEditingStaff(null);
        form.resetFields();
    };

    const onEditStaff = (staff: any) => {
        setEditingStaff(staff);
        form.setFieldsValue(staff);
        setOpenCreateStaffModal(true);
    };

    const onDeleteStaff = async (id: number) => {
        await MainApiRequest.delete(`/staff/${id}`);
        fetchStaffList();
    };

    return (
        <div className="container-fluid m-2">
            <h3 className='h3'>Staff Management</h3>
            <Button
                type='primary'
                onClick={() => onOpenCreateStaffModal()}
            >
                Create Staff
            </Button>

            <Modal
                title={editingStaff ? "Edit Staff" : "Create Staff"}
                open={openCreateStaffModal}
                onOk={onOKCreateStaff}
                onCancel={onCancelCreateStaff}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{ role: "ROLE_ADMIN" }} // Đặt giá trị mặc định cho "role"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input name!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input email!" }]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    {!editingStaff &&
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please input password!" }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    }
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: "Please input address!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: "Please input phone number!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                    >
                        <Select>
                            <Select.Option value="ROLE_ADMIN">Admin</Select.Option>
                            <Select.Option value="ROLE_RECEP">Staff</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                dataSource={staffList}
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                    { title: 'Address', dataIndex: 'address', key: 'address' },
                    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
                    { title: 'Role', dataIndex: 'role', key: 'role', render: (role: string) => role === 'ROLE_ADMIN' ? 'Admin' : 'Staff' },
                    {
                        title: 'Action',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button type="link" onClick={() => onEditStaff(record)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this staff?"
                                    onConfirm={() => onDeleteStaff(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="link" danger>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Popconfirm>
                            </>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AdminStaff;
