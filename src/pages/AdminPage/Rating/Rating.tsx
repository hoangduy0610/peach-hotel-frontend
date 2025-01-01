import React, { useEffect, useState } from 'react';
import { Table, Rate, Space, Button, Modal, Form, Input, Popconfirm } from 'antd';

const AdminCustomerRating = () => {
    const [ratingsList, setRatingsList] = useState<any[]>([]);
    const [openCreateRatingModal, setOpenCreateRatingModal] = useState(false);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [currentRating, setCurrentRating] = useState<any | null>(null);

    // Dữ liệu mẫu
    const sampleRatingsList = [
        {
            id: 1,
            customerName: 'Nguyễn Văn A',
            rating: 5,
            comment: 'Excellent service!',
            date: '2023-01-01'
        },
        {
            id: 2,
            customerName: 'Trần Thị B',
            rating: 4,
            comment: 'Very good, will come again.',
            date: '2023-02-15'
        },
        {
            id: 3,
            customerName: 'Lê Văn C',
            rating: 3,
            comment: 'Average experience.',
            date: '2023-03-10'
        }
    ];

    const fetchRatingsList = async () => {
        setRatingsList(sampleRatingsList);
    }

    useEffect(() => {
        fetchRatingsList();
    }, []);

    const onOpenCreateRatingModal = () => {
        form.resetFields();
        setCurrentRating(null);
        setIsEditing(false);
        setOpenCreateRatingModal(true);
    }

    const onOKCreateRating = () => {
        form.validateFields().then(values => {
            const newRating = {
                ...values,
                id: isEditing ? currentRating.id : ratingsList.length + 1,
                date: new Date().toISOString().split('T')[0],
            };

            if (isEditing) {
                setRatingsList(ratingsList.map(rating => rating.id === currentRating.id ? newRating : rating));
            } else {
                setRatingsList([...ratingsList, newRating]);
            }

            setOpenCreateRatingModal(false);
        });
    }

    const onCancelCreateRating = () => {
        setOpenCreateRatingModal(false);
    }

    const onEditRating = (record: any) => {
        setCurrentRating(record);
        form.setFieldsValue(record);
        setIsEditing(true);
        setOpenCreateRatingModal(true);
    }

    const onDeleteRating = (id: number) => {
        setRatingsList(ratingsList.filter(rating => rating.id !== id));
    }

    return (
        <div className="container-fluid m-2">
            <h3 className='h3'>Customer Rating Management</h3>
            <Button
                type='primary'
                onClick={onOpenCreateRatingModal}
            >
                Create Rating
            </Button>

            <Modal
                title={isEditing ? "Edit Rating" : "Create Rating"}
                open={openCreateRatingModal}
                onOk={onOKCreateRating}
                onCancel={onCancelCreateRating}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label='Customer Name'
                        name='customerName'
                        rules={[{ required: true, message: 'Please input customer name!' }]}

                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        label='Rating'
                        name='rating'
                        rules={[{ required: true, message: 'Please select rating!' }]}

                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item
                        label='Comment'
                        name='comment'
                        rules={[{ required: true, message: 'Please input comment!' }]}

                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                dataSource={ratingsList}
                columns={[
                    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
                    { title: 'Rating', dataIndex: 'rating', key: 'rating', render: (rating: number) => <Rate disabled value={rating} /> },
                    { title: 'Comment', dataIndex: 'comment', key: 'comment' },
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                            <Space size="middle">
                                <Button onClick={() => onEditRating(record)}>Edit</Button>
                                <Popconfirm
                                    title="Are you sure you want to delete this rating?"
                                    onConfirm={() => onDeleteRating(record.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            </Space>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default AdminCustomerRating;
