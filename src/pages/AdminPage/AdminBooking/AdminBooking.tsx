import React, { useEffect, useState } from 'react';
import './AdminBooking.css';
import { MainApiRequest } from '@/services/MainApiRequest';
import { Button, Form, Input, DatePicker, Modal, Select, Table, Tag, message } from 'antd';
import moment from 'moment';
import { CreateBookingModal } from './CreateBookingModal';

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

  const onOKCreateBooking = async (data: any) => {
    setOpenCreateBookingModal(false);
    const res = await MainApiRequest.post('/booking', data);
    if (res.status === 200) {
      fetchBookingList();
    }
    const paymentData = {
      description: "Thanh toanh Dich Vu ABC",
      userId: data.userId,
      bookingId: res.data.id
    }
    await MainApiRequest.post('/payment', paymentData);
    message.success('Create booking successfully');
    // const data = form.getFieldsValue();
    // console.log(data);
  }

  const onCancelCreateBooking = () => {
    setOpenCreateBookingModal(false);
  }

  const mappingColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'blue';
      case 'CONFIRMED': return 'green';
      case 'CANCELLED': return 'red';
      case 'CHECKED_IN': return 'orange';
      case 'CHECKED_OUT': return 'purple';
      default: return 'black';
    }
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
      <CreateBookingModal
        openCreateBookingModal={openCreateBookingModal}
        onOKCreateBooking={onOKCreateBooking}
        onCancelCreateBooking={onCancelCreateBooking}
      />
      <Table
        dataSource={bookingList}
        columns={[
          { title: 'Guest', dataIndex: 'customerName', key: 'customerName' },
          { title: 'Reservation Code', dataIndex: 'reservationCode', key: 'reservationCode' },
          { title: 'Phone Number', dataIndex: 'customerPhone', key: 'customerPhone' },
          { title: 'Check In', dataIndex: 'checkIn', key: 'checkIn', render: (checkIn: string) => moment(checkIn).format('DD-MM-YYYY') },
          { title: 'Check Out', dataIndex: 'checkOut', key: 'checkOut', render: (checkOut: string) => moment(checkOut).format('DD-MM-YYYY') },
          { title: 'Room Type', dataIndex: 'rooms', key: 'roomType', render: (rooms: any[]) => rooms[0]?.roomTier?.name },
          { title: 'Room Name', dataIndex: 'rooms', key: 'roomName', render: (rooms: any[]) => rooms[0]?.name },
          { title: 'Booking Date', dataIndex: 'createdAt', key: 'createdAt', render: (bookingDate: string) => moment(bookingDate).format('DD-MM-YYYY HH:mm:ss') },
          { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={mappingColor(status)}>{status}</Tag> },
        ]}
      />
    </div>
  );
};

export default AdminBooking;
