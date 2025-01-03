import React, { useEffect, useState } from 'react';
import './AdminService.scss';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, Modal, Select, Table, Popconfirm, Space } from 'antd';

const AdminService = () => {
    const [form] = Form.useForm();
    const [serviceList, setServiceList] = useState<any[]>([]);
    const [serviceTierList, setServiceTierList] = useState<any[]>([]);
    const [openCreateServiceModal, setOpenCreateServiceModal] = useState(false);
    const [openCreateServiceTierModal, setOpenCreateServiceTierModal] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [editingServiceTier, setEditingServiceTier] = useState<any | null>(null);

    const fetchServiceList = async () => {
        const res = await MainApiRequest.get('/service/list');
        setServiceList(res.data);
    };

    const fetchServiceTierList = async () => {
        const res = await MainApiRequest.get('/service/tier/list');
        setServiceTierList(res.data);
    };

    useEffect(() => {
        fetchServiceList();
        fetchServiceTierList();
    }, []);

    const onOpenCreateServiceModal = () => {
        setOpenCreateServiceModal(true);
    };

    const onOpenCreateServiceTierModal = () => {
        setOpenCreateServiceTierModal(true);
    };

    const onOKCreateService = async () => {
        setOpenCreateServiceModal(false);
        const data = form.getFieldsValue();
        if (editingService) {
            await MainApiRequest.put(`/service/${editingService.id}`, data);
        } else {
            await MainApiRequest.post('/service', data);
        }
        fetchServiceList();
        setEditingService(null);
        form.resetFields();
    };

    const onOKCreateServiceTier = async () => {
        setOpenCreateServiceTierModal(false);
        const data = form.getFieldsValue();
        if (editingServiceTier) {
            await MainApiRequest.put(`/service/tier/${editingServiceTier.id}`, data);
        } else {
            await MainApiRequest.post('/service/tier', data);
        }
        fetchServiceTierList();
        setEditingServiceTier(null);
        form.resetFields();
    };

    const onCancelCreateService = () => {
        setOpenCreateServiceModal(false);
        setEditingService(null);
        form.resetFields();
    };

    const onCancelCreateServiceTier = () => {
        setOpenCreateServiceTierModal(false);
        setEditingServiceTier(null);
        form.resetFields();
    };

    const onEditService = (service: any) => {
        setEditingService(service);
        form.setFieldsValue(service);
        setOpenCreateServiceModal(true);
    };

    const onDeleteService = async (id: number) => {
        await MainApiRequest.delete(`/service/${id}`);
        fetchServiceList();
    };

    const onEditServiceTier = (tier: any) => {
        setEditingServiceTier(tier);
        form.setFieldsValue(tier);
        setOpenCreateServiceTierModal(true);
    };

    const onDeleteServiceTier = async (id: number) => {
        await MainApiRequest.delete(`/service/tier/${id}`);
        fetchServiceTierList();
    };

    console.log(serviceList);

    return (
        <div className="container-fluid m-2">
            <h3 className="h3">Service Management</h3>

            <Button type="primary" onClick={() => onOpenCreateServiceModal()}>
                Create Service
            </Button>
            <Button 
                type="primary" 
                onClick={() => onOpenCreateServiceTierModal()} 
                style={{ marginLeft: '10px' }}
                >
                Create Service Tier
            </Button>

            {/* Service Modal */}
            <Modal
                className="service-modal"
                title={editingService ? "Edit Service" : "Create Service"}
                open={openCreateServiceModal}
                onOk={onOKCreateService}
                onCancel={onCancelCreateService}
                >
                <Form form={form} layout="vertical">
                    <div className="field-row">
                    <Form.Item
                        label="Service Name"
                        name="name"
                        rules={[{ required: true, message: "Please input service name!" }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Service Tier"
                        name="serviceTierId"
                        rules={[{ required: true, message: "Please select service tier!" }]}
                    >
                        <Select>
                            {serviceTierList.map((tier) => (
                            <Select.Option key={tier.id} value={tier.id}>
                                {tier.name}
                            </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    </div>
                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please input price!" }]}
                    >
                    <Input type="number" />
                    </Form.Item>
                </Form>
                </Modal>

            {/* Service Tier Modal */}
            <Modal
                className="service-modal"
                title={editingServiceTier ? "Edit Service Tier" : "Create Service Tier"}
                open={openCreateServiceTierModal}
                onOk={onOKCreateServiceTier}
                onCancel={onCancelCreateServiceTier}
                >
                <Form form={form} layout="vertical">
                    <Form.Item
                    label="Tier Name"
                    name="name"
                    rules={[{ required: true, message: "Please input tier name!" }]}
                    >
                    <Input type="text" />
                    </Form.Item>
                    <div className="field-row">
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: "Please input tier type!" }]}
                    >
                        <Select>
                        <Select.Option value="Restaurent">RESTAURENT</Select.Option>
                        <Select.Option value="Other">OTHER</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Available People"
                        name="available"
                        rules={[{ required: true, message: "Please input number of availables!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    </div>
                    <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Please input description!" }]}
                    >
                    <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>

            <h4 className="h4 mt-3">Service List</h4>                  
            {/* Service List Table */}
            <Table
                dataSource={serviceList}
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Service Name', dataIndex: 'name', key: 'name' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    { 
                        title: 'Tier', dataIndex: 'serviceTier', key: 'serviceTier', render(_, record) {
                            return record.name;
                            console.log(record.name);
                        }
                    
                    },
                    
                    {
                        title: 'Actions', key: 'action', render: (_, record) => (
                            <Space size="middle">
                                <Button onClick={() => onEditService(record)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this service?"
                                    onConfirm={() => onDeleteService(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button onClick={() => onDeleteService(record.id)} danger>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )
                    }
                ]}
            />

            {/* Service Tier List Table */}
            <h4 className="h4 mt-3">Service Tier List</h4>
            <Table
                dataSource={serviceTierList}
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Tier Name', dataIndex: 'name', key: 'name' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Available people', dataIndex: 'available', key: 'available' },
                    {    
                        title: 'Actions', 
                        key: 'action', 
                        render: (_, record) => (
                            <Space size="middle">
                                <Button onClick={() => onEditServiceTier(record)}>
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Popconfirm
                                    title="Are you sure to delete this service tier?"
                                    onConfirm={() => onDeleteServiceTier(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button onClick={() => onDeleteServiceTier(record.id)} danger>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default AdminService;
