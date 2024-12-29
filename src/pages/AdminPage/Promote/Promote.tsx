import React, { useEffect, useState } from 'react';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, DatePicker, Modal, Table, Tag, Select } from 'antd';
import moment from 'moment';

const AdminPromote = () => {
    const [form] = Form.useForm();
    const [promoteList, setPromoteList] = useState<any[]>([]);
    const [couponList, setCouponList] = useState<any[]>([]);
    const [openCreatePromoteModal, setOpenCreatePromoteModal] = useState(false);
    const [openCreateCouponModal, setOpenCreateCouponModal] = useState(false);

    const fetchPromoteList = async () => {
        const res = await MainApiRequest.get('/promote/list');
        setPromoteList(res.data);
    }

    const fetchCouponList = async () => {
        const res = await MainApiRequest.get('/promote/coupon/list');
        setCouponList(res.data);
    }

    useEffect(() => {
        fetchPromoteList();
        fetchCouponList();
    }, []);

    const onOpenCreatePromoteModal = () => {
        setOpenCreatePromoteModal(true);
    }

    const onOpenCreateCouponModal = () => {
        setOpenCreateCouponModal(true);
    }

    const onOKCreatePromote = () => {
        setOpenCreatePromoteModal(false);
        const data = form.getFieldsValue();
        console.log(data);
    }

    const onCancelCreatePromote = () => {
        setOpenCreatePromoteModal(false);
    }

    const onOKCreateCoupon = () => {
        setOpenCreateCouponModal(false);
        const data = form.getFieldsValue();
        console.log(data);
    }

    const onCancelCreateCoupon = () => {
        setOpenCreateCouponModal(false);
    }

    return (
        <div className="container-fluid m-2">
            <h3 className='h3'>Promote & Coupon Management</h3>
            <Button
                type='primary'
                onClick={() => onOpenCreatePromoteModal()}
            >
                Create Promote
            </Button>
            <Button
                type='primary'
                onClick={() => onOpenCreateCouponModal()}
                style={{ marginLeft: 10 }}
            >
                Create Coupon
            </Button>

            <Modal
                title="Create Promote"
                open={openCreatePromoteModal}
                onOk={() => onOKCreatePromote()}
                onCancel={() => onCancelCreatePromote()}
            >
                <Form form={form}>
                    <Form.Item
                        label='Promote Name'
                        name='name'
                        rules={[{ required: true, message: 'Please input promote name!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Description'
                        name='description'
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Discount'
                        name='discount'
                        rules={[{ required: true, message: 'Please input discount!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        label='Type'
                        name='type'
                        rules={[{ required: true, message: 'Please select type!' }]}
                    >
                        <Select>
                            <Select.Option value="percentage">Percentage</Select.Option>
                            <Select.Option value="fixed">Fixed</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Start Date'
                        name='startAt'
                        rules={[{ required: true, message: 'Please select start date!' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        label='End Date'
                        name='endAt'
                        rules={[{ required: true, message: 'Please select end date!' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Create Coupon"
                open={openCreateCouponModal}
                onOk={() => onOKCreateCoupon()}
                onCancel={() => onCancelCreateCoupon()}
            >
                <Form form={form}>
                    <Form.Item
                        label='Promote ID'
                        name='promoteId'
                        rules={[{ required: true, message: 'Please input promote ID!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        label='Coupon Code'
                        name='code'
                        rules={[{ required: true, message: 'Please input coupon code!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='User ID'
                        name='userId'
                        rules={[{ required: true, message: 'Please input user ID!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                dataSource={promoteList}
                columns={[
                    { title: 'Promote Name', dataIndex: 'name', key: 'name' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    { title: 'Start At', dataIndex: 'startAt', key: 'startAt', render: (startAt: string) => moment(startAt).format('YYYY-MM-DD HH:mm:ss') },
                    { title: 'End At', dataIndex: 'endAt', key: 'endAt', render: (endAt: string) => moment(endAt).format('YYYY-MM-DD HH:mm:ss') },
                ]}
            />

            <Table
                dataSource={couponList}
                columns={[
                    { title: 'Promote ID', dataIndex: 'promoteId', key: 'promoteId' },
                    { title: 'Coupon Code', dataIndex: 'code', key: 'code' },
                    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
                ]}
            />
        </div>
    );
};

export default AdminPromote;
