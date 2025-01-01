import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;

const PaymentHistory = () => {
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState(false);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<any | null>(null);

  // Sample data
  const samplePaymentsList = [
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      amount: 150000,
      paymentDate: '2023-01-01',
      status: 'Completed',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      amount: 200000,
      paymentDate: '2023-02-15',
      status: 'Pending',
    },
    {
      id: 3,
      customerName: 'Lê Văn C',
      amount: 300000,
      paymentDate: '2023-03-10',
      status: 'Completed',
    },
  ];

  const fetchPaymentsList = async () => {
    setPaymentsList(samplePaymentsList);
  };

  useEffect(() => {
    fetchPaymentsList();
  }, []);

  const onOpenCreatePaymentModal = () => {
    form.resetFields();
    setCurrentPayment(null);
    setIsEditing(false);
    setOpenCreatePaymentModal(true);
  };

  const onOKCreatePayment = () => {
    form.validateFields().then(values => {
      const newPayment = {
        ...values,
        id: isEditing ? currentPayment.id : paymentsList.length + 1,
        paymentDate: new Date().toISOString().split('T')[0],
      };

      if (isEditing) {
        setPaymentsList(
          paymentsList.map(payment =>
            payment.id === currentPayment.id ? newPayment : payment
          )
        );
      } else {
        setPaymentsList([...paymentsList, newPayment]);
      }

      setOpenCreatePaymentModal(false);
    });
  };

  const onCancelCreatePayment = () => {
    setOpenCreatePaymentModal(false);
  };

  const onEditPayment = (record: any) => {
    setCurrentPayment(record);
    form.setFieldsValue(record);
    setIsEditing(true);
    setOpenCreatePaymentModal(true);
  };

  const onDeletePayment = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this payment?',
      onOk: () => {
        setPaymentsList(paymentsList.filter(payment => payment.id !== id));
      },
    });
  };

  return (
    <div className="container-fluid m-2">
      <h3 className="h3">Payment History</h3>
      <Button type="primary" onClick={onOpenCreatePaymentModal}>
        Create Payment
      </Button>

      <Modal
        title={isEditing ? 'Edit Payment' : 'Create Payment'}
        open={openCreatePaymentModal}
        onOk={onOKCreatePayment}
        onCancel={onCancelCreatePayment}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: 'Please input customer name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input amount!' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Payment Date"
            name="paymentDate"
            rules={[{ required: true, message: 'Please select payment date!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select payment status!' }]}>
            <Select>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={paymentsList}
        columns={[
          { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
          { title: 'Amount', dataIndex: 'amount', key: 'amount' },
          { title: 'Payment Date', dataIndex: 'paymentDate', key: 'paymentDate' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button onClick={() => onEditPayment(record)}>Edit</Button>
                <Button onClick={() => onDeletePayment(record.id)} danger>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PaymentHistory;
