import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Popconfirm } from 'antd';

const AdminBlacklist = () => {
  const [form] = Form.useForm();
  const [blacklist, setBlacklist] = useState<any[]>([]);
  const [openCreateBlacklistModal, setOpenCreateBlacklistModal] = useState(false);

  // Dữ liệu mẫu
  const sampleBlacklist = [
    {
      id: 1,
      name: 'John Doe',
      reason: 'Frequent cancellations',
      dateAdded: '2023-12-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      reason: 'Non-payment',
      dateAdded: '2023-12-22',
    },
  ];

  const fetchBlacklist = async () => {
    setBlacklist(sampleBlacklist);
  };

  useEffect(() => {
    fetchBlacklist();
  }, []);

  const onOpenCreateBlacklistModal = () => {
    form.resetFields();
    setOpenCreateBlacklistModal(true);
  };

  const onOKCreateBlacklist = () => {
    const data = form.getFieldsValue();
    const newBlacklistEntry = {
      ...data,
      id: blacklist.length + 1,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setBlacklist([...blacklist, newBlacklistEntry]);
    setOpenCreateBlacklistModal(false);
  };

  const onCancelCreateBlacklist = () => {
    setOpenCreateBlacklistModal(false);
  };

  const onDeleteBlacklist = (id: number) => {
    setBlacklist(blacklist.filter(item => item.id !== id));
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
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Reason"
            name="reason"
            rules={[{ required: true, message: 'Please input the reason!' }]}
          >
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={blacklist}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Reason', dataIndex: 'reason', key: 'reason' },
          { title: 'Date Added', dataIndex: 'dateAdded', key: 'dateAdded' },
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
                  Delete
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
