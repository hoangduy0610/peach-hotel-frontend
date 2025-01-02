import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Popconfirm, Select } from 'antd';
import { MainApiRequest } from '@/services/MainApiRequest';
import './AdminBlacklist.scss';
import moment from 'moment';
const { Option } = Select;

const AdminBlacklist = () => {
  const [form] = Form.useForm();
  const [blacklist, setBlacklist] = useState<any[]>([]);
  const [openCreateBlacklistModal, setOpenCreateBlacklistModal] = useState(false);
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [nextId, setNextId] = useState<number>(1); // Quản lý ID Blacklist tiếp theo

  // Fetch danh sách Blacklist và User
  const fetchBlacklist = async () => {
    const res = await MainApiRequest.get('/blacklist/list');
    setBlacklist(res.data);
    if (res.data.length > 0) {
      const maxId = Math.max(...res.data.map((item: any) => item.id));
      setNextId(maxId + 1); // Xác định ID tiếp theo
    }
  };

  const fetchCustomerList = async () => {
    const res = await MainApiRequest.get('/user/list');
    setCustomerList(res.data);
  };

  useEffect(() => {
    fetchBlacklist();
    fetchCustomerList();
  }, []);

  // Mở Modal tạo Blacklist
  const onOpenCreateBlacklistModal = () => {
    form.resetFields();
    form.setFieldsValue({ id: nextId });
    setOpenCreateBlacklistModal(true);
  };

  // Hủy tạo Blacklist
  const onCancelCreateBlacklist = () => {
    setOpenCreateBlacklistModal(false);
    form.resetFields();
  };

  // Lưu Blacklist mới
  const onOKCreateBlacklist = async () => {
    const formData = form.getFieldsValue();
    const newBlacklistEntry = {
      reason: formData.reason,
      userId: formData.userId,
    };
    await MainApiRequest.post('/blacklist', newBlacklistEntry);
    fetchBlacklist();
    setOpenCreateBlacklistModal(false);
  };

  // Xóa Blacklist
  const onDeleteBlacklist = async (id: number) => {
    await MainApiRequest.delete(`/blacklist/${id}`);
    fetchBlacklist();
  };

  // Cập nhật Customer ID khi chọn Customer Name
  const handleCustomerChange = (customerId: number) => {
    const selectedCustomer = customerList.find((customer: any) => customer.id === customerId);
    form.setFieldsValue({ name: selectedCustomer?.name, userId: customerId });
  };

  return (
    <div className="container-fluid m-2">
      <h3 className="h3">Blacklist Management</h3>
      <Button type="primary" onClick={onOpenCreateBlacklistModal}>
        Add to Blacklist
      </Button>

      <Modal
        title="Add to Blacklist"
        open={openCreateBlacklistModal}
        onOk={onOKCreateBlacklist}
        onCancel={onCancelCreateBlacklist}
      >
        <Form form={form} layout="vertical">

          {/* Customer Name */}
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[{ required: true, message: 'Please select a customer!' }]}
          >
            <Select
              placeholder="Select a customer"
              onChange={handleCustomerChange}
            >
              {customerList.map((customer: any) => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Customer ID */}
          <Form.Item label="Customer ID" name="userId">
            <Input readOnly />
          </Form.Item>

          {/* Reason */}
          <Form.Item
            label="Reason"
            name="reason"
            className="reason-field "
            rules={[{ required: true, message: 'Please input the reason!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={blacklist}
        columns={[
          { title: 'ID Blacklist', dataIndex: 'id', key: 'id' },
          {
            title: 'ID Customer', dataIndex: 'idCustomer', key: 'idCustomer', render(_, record) {
              return record.user.id;
            },
          },
          {
            title: 'Name Customer', dataIndex: 'name', key: 'name', render(_, record) {
              return record.user.name;
            },
          },
          { title: 'Date Added', dataIndex: 'bannedAt', key: 'bannedAt', render: (bannedAt) => moment(bannedAt).format("DD-MM-YYYY") },
          { title: 'Reason', dataIndex: 'reason', key: 'reason' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Popconfirm
                title="Are you sure to delete this entry?"
                onConfirm={() => onDeleteBlacklist(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  <i className="fas fa-trash"></i>
                </Button>
              </Popconfirm>
            ),
          },
        ]}
        rowKey="id"
      />
    </div>
  );
};

export default AdminBlacklist;
