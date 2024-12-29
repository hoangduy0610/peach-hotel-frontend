import React, { useEffect, useState } from 'react';
import './AdminService.css';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, Modal, Select, Table, Tag } from 'antd';

const AdminService = () => {
    const [form] = Form.useForm();
    const [serviceList, setServiceList] = useState<any[]>([]);
    const [serviceTierList, setServiceTierList] = useState<any[]>([]);
    const [openCreateServiceModal, setOpenCreateServiceModal] = useState(false);
    const [openCreateServiceTierModal, setOpenCreateServiceTierModal] = useState(false);

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
        console.log(data);
        await MainApiRequest.post('/service/post', data);
        fetchServiceList();
    };

    const onOKCreateServiceTier = async () => {
        setOpenCreateServiceTierModal(false);
        const data = form.getFieldsValue();
        console.log(data);
        await MainApiRequest.post('/service/tier/post', data);
        fetchServiceTierList();
    };

    const onCancelCreateService = () => {
        setOpenCreateServiceModal(false);
    };

    const onCancelCreateServiceTier = () => {
        setOpenCreateServiceTierModal(false);
    };

    return (
        <div className="container-fluid m-2">
            <h3 className="h3">Service Management</h3>

            <Button type="primary" onClick={() => onOpenCreateServiceModal()}>
                Create Service
            </Button>
            <Button type="primary" onClick={() => onOpenCreateServiceTierModal()} style={{ marginLeft: '10px' }}>
                Create Service Tier
            </Button>

            <Modal
                title="Create Service"
                open={openCreateServiceModal}
                onOk={() => onOKCreateService()}
                onCancel={() => onCancelCreateService()}
            >
                <Form form={form}>
                    <Form.Item label="Service Name" name="name" rules={[{ required: true, message: 'Please input service name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Service Tier" name="serviceTierId" rules={[{ required: true, message: 'Please select service tier!' }]}>
                        <Select>
                            {serviceTierList.map((tier) => (
                                <Select.Option key={tier.id} value={tier.id}>
                                    {tier.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Create Service Tier"
                open={openCreateServiceTierModal}
                onOk={() => onOKCreateServiceTier()}
                onCancel={() => onCancelCreateServiceTier()}
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

            {/* Service List Table */}
            <Table
                dataSource={serviceList}
                columns={[
                    { title: 'Service Name', dataIndex: 'name', key: 'name' },
                    { title: 'Price', dataIndex: 'price', key: 'price' },
                    {
                        title: 'Tier', dataIndex: 'serviceTierId', key: 'serviceTierId', render: (serviceTierId) => {
                            const tier = serviceTierList.find((tier) => tier.id === serviceTierId);
                            return tier ? tier.name : 'N/A';
                        }
                    },
                ]}
            />

            <Table
                dataSource={serviceTierList}
                columns={[
                    { title: 'Tier Name', dataIndex: 'name', key: 'name' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Slots', dataIndex: 'slot', key: 'slot' },
                ]}
            />
        </div>
    );
};

export default AdminService;
