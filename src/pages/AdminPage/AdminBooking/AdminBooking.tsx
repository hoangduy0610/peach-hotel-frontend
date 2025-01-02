import React, { useEffect, useState } from 'react';
import './AdminBooking.css';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, DatePicker, Modal, Select, Table, Tag } from 'antd';
import moment from 'moment';

const AdminBooking = () => {
  const [form] = Form.useForm();
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [openCreateBookingModal, setOpenCreateBookingModal] = useState(false);

  const fetchBookingList = async () => {
    const res = await MainApiRequest.get('/booking/list');
    setBookingList(res.data);
  }

  useEffect(() => {
    fetchBookingList();
  }, []);

  const onOpenCreateBookingModal = () => {
    setOpenCreateBookingModal(true);
  }

  const onOKCreateBooking = () => {
    setOpenCreateBookingModal(false);

    const data = form.getFieldsValue();
    console.log(data);
  }

  const onCancelCreateBooking = () => {
    setOpenCreateBookingModal(false);
  }

  return (
    <div className="container-fluid m-2">
      <h3 className='h3'>Booking Management</h3>
      <Button
        type='primary'
        onClick={() => onOpenCreateBookingModal()}
      >
        Create Booking
      </Button>
      <Modal
        title="Create Booking"
        open={openCreateBookingModal}
        onOk={() => onOKCreateBooking()}
        onCancel={() => onCancelCreateBooking()}
      >
        <Form
          form={form}
        >
          <Form.Item
            label='Customer Name'
            name='customerName'
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='Reservation Code'
            name='reservationCode'
            rules={[{ required: true, message: 'Please input reservation code!' }]}
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='Phone Number'
            name='customerPhone'
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='Check In'
            name='checkIn'
            rules={[{ required: true, message: 'Please select check-in date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label='Check Out'
            name='checkOut'
            rules={[{ required: true, message: 'Please select check-out date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label='Room Type'
            name='roomType'
            rules={[{ required: true, message: 'Please select room type!' }]}
          >
            <Select>
              <Select.Option value="single">Single</Select.Option>
              <Select.Option value="double">Double</Select.Option>
              <Select.Option value="suite">Suite</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={bookingList}
        columns={[
          { title: 'Guest', dataIndex: 'customerName', key: 'customerName' },
          { title: 'Reservation Code', dataIndex: 'reservationCode', key: 'reservationCode' },
          { title: 'Phone Number', dataIndex: 'customerPhone', key: 'customerPhone' },
          { title: 'Check In', dataIndex: 'checkIn', key: 'checkIn', render: (checkIn: string) => moment(checkIn).format('DD-MM-YYYY') },
          { title: 'Check Out', dataIndex: 'checkOut', key: 'checkOut', render: (checkOut: string) => moment(checkOut).format('DD-MM-YYYY') },
          // { title: 'Room Type', dataIndex: 'rooms', key: 'rooms', render: (rooms: any[]) => rooms[0].roomTier.name },
          { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'PENDING' ? 'orange' : 'green'}>{status}</Tag> },
        ]}
      />
    </div>
  );
};

export default AdminBooking;
