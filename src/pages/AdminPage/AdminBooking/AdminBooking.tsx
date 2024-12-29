// src/app/pages/AdminPage/Booking/Booking.tsx
import React, { useEffect, useState } from 'react';
import './AdminBooking.css';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Modal, Table, Tag } from 'antd';

const AdminBooking = () => {
  const [form] = Form.useForm();
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [openCreateBookingModal, setOpenCreateBookingModal] = useState(false);

  const fetchBookingList = async () => {
    const res = await MainApiRequest.get('/booking/list');
    setBookingList(res.data)
  }

  useEffect(() => {
    fetchBookingList()
  }, [])

  const onOpenCreateBookingModal = () => {
    setOpenCreateBookingModal(true)
  }

  const onOKCreateBooking = () => {
    setOpenCreateBookingModal(false)

    const data = form.getFieldsValue();
    console.log(data)
  }

  const onCancelCreateBooking = () => {
    setOpenCreateBookingModal(false)
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
            <input type='text' />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={bookingList}
        columns={[
          { title: 'Guest', dataIndex: 'customerName', key: 'customerName' },
          { title: 'Reservation Code', dataIndex: 'reservationCode', key: 'reservationCode' },
          { title: 'Phone Number', dataIndex: 'customerPhone', key: 'customerPhone' },
          { title: 'Check In', dataIndex: 'checkIn', key: 'checkIn', render: (checkIn: string) => checkIn.split('T')[0] },
          { title: 'Check Out', dataIndex: 'checkOut', key: 'checkOut', render: (checkOut: string) => checkOut.split('T')[0] },
          { title: 'Room Type', dataIndex: 'rooms', key: 'rooms', render: (rooms: any[]) => rooms[0].roomTier.name },
          { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={status === 'PENDING' ? 'orange' : 'green'}>{status}</Tag> },
        ]}
      />
    </div>
  );
};

export default AdminBooking;
