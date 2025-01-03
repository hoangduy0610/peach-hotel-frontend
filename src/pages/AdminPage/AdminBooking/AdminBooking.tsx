import React, { useEffect, useState } from 'react';
import './AdminBooking.scss';
import { AdminApiRequest } from '@/services/AdminApiRequest';
import { Button, Form, Input, DatePicker, Modal, Select, Table, Tag, message } from 'antd';
import moment from 'moment';
import { CreateBookingModal } from './CreateBookingModal';

const AdminBooking = () => {
  const [form] = Form.useForm();
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [originalBookingList, setOriginalBookingList] = useState<any[]>([]);
  const [openCreateBookingModal, setOpenCreateBookingModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchBookingList = async () => {
    const res = await AdminApiRequest.get('/booking/list');
    setBookingList(res.data);
    setOriginalBookingList(res.data);
  }

  useEffect(() => {
    fetchBookingList();
  }, []);

  const onOpenCreateBookingModal = () => {
    setOpenCreateBookingModal(true);
  }

  const onOKCreateBooking = async (data: any) => {
    setOpenCreateBookingModal(false);
    const res = await AdminApiRequest.post('/booking', data);
    if (res.status === 200) {
      fetchBookingList();
    }
    const paymentData = {
      description: "Thanh toanh Dich Vu ABC",
      userId: data.userId,
      bookingId: res.data.id
    }
    await AdminApiRequest.post('/payment', paymentData);
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

  const handleSearchKeyword = () => {
    if (searchKeyword === '') {
      setBookingList(originalBookingList);
    } else {
      const filteredList = originalBookingList.filter(booking => {
        return booking.customerName.toLowerCase().includes(searchKeyword.toLowerCase())
          || booking.reservationCode.toLowerCase().includes(searchKeyword.toLowerCase())
          || booking.customerPhone.toLowerCase().includes(searchKeyword.toLowerCase());
      });
      setBookingList(filteredList);
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
      {/* Search field */}
      <Form
        layout='inline'
        className='d-flex justify-content-end mb-3'
      >
        <Form.Item label='Search (Customer Name, Reservation code, Number)' className='d-flex flex-1'>
          <Input placeholder='Search Keyword' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={handleSearchKeyword}>Search</Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={bookingList}
        showSorterTooltip={{ target: 'sorter-icon' }}
        columns={[
          {
            sorter: (a: any, b: any) => a.customerName.localeCompare(b.customerName),
            title: 'Guest', dataIndex: 'customerName', key: 'customerName'
          },
          {
            sorter: (a: any, b: any) => a.reservationCode.localeCompare(b.reservationCode),
            title: 'Reservation Code', dataIndex: 'reservationCode', key: 'reservationCode'
          },
          {
            sorter: (a: any, b: any) => a.customerPhone.localeCompare(b.customerPhone),
            title: 'Phone Number', dataIndex: 'customerPhone', key: 'customerPhone'
          },
          // { sorter:true, title: 'Check In', dataIndex: 'checkIn', key: 'checkIn', render: (checkIn: string) => moment(checkIn).format('DD-MM-YYYY') },
          // { sorter:true, title: 'Check Out', dataIndex: 'checkOut', key: 'checkOut', render: (checkOut: string) => moment(checkOut).format('DD-MM-YYYY') },
          {
            title: 'Booking Time', key: 'bookingTime', render: (record: any) => {
              return (
                <div className='text-left d-flex flex-column'>
                  <span><strong className="fw-bold">Arrive:</strong> {moment(record.checkIn).format('DD-MM-YYYY')}</span>
                  <span><strong className="fw-bold">Leave: </strong> {moment(record.checkOut).format('DD-MM-YYYY')}</span>
                </div>
              )
            }
          },
          {
            title: 'Checkin Time', key: 'checkinTime', render: (record: any) => {
              return (
                <div className='text-left d-flex flex-column'>
                  <span><strong className="fw-bold">Check In:</strong> {record.realCheckIn ? moment(record.realCheckIn).format('DD-MM-YYYY HH:mm:ss') : '-'}</span>
                  <span><strong className="fw-bold">Check Out:</strong> {record.realCheckOut ? moment(record.realCheckOut).format('DD-MM-YYYY HH:mm:ss') : '-'}</span>
                </div>
              )
            }
          },
          {
            sorter: (a: any, b: any) => a.rooms[0]?.roomTier?.name.localeCompare(b.rooms[0]?.roomTier?.name),
            title: 'Room Type', dataIndex: 'rooms', key: 'roomType', render: (rooms: any[]) => rooms[0]?.roomTier?.name
          },
          {
            sorter: (a: any, b: any) => a.rooms[0]?.name.localeCompare(b.rooms[0]?.name),
            title: 'Room Name', dataIndex: 'rooms', key: 'roomName', render: (rooms: any[]) => rooms[0]?.name
          },
          {
            sorter: (a: any, b: any) => a.createdAt.localeCompare(b.createdAt),
            title: 'Booking Date', dataIndex: 'createdAt', key: 'createdAt', render: (bookingDate: string) => moment(bookingDate).format('DD-MM-YYYY HH:mm:ss')
          },
          {
            sorter: (a: any, b: any) => a.status.localeCompare(b.status),
            title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => <Tag color={mappingColor(status)}>{status}</Tag>
          },
          {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
              <>
                {
                  record.status === 'CONFIRMED' && (
                    <Button
                      type='primary'
                      onClick={() => {
                        Modal.confirm({
                          title: 'Check In',
                          content: 'Are you sure to check in this booking?',
                          onOk: async () => {
                            const res = await AdminApiRequest.put(`/booking/check-in/${record.id}`);
                            if (res.status === 200) {
                              fetchBookingList();
                              message.success('Check in successfully');
                            }
                          }
                        })
                      }}
                    >
                      Check In
                    </Button>
                  )
                }
                {
                  record.status === 'CHECKED_IN' && (
                    <Button
                      type='primary'
                      onClick={() => {
                        Modal.confirm({
                          title: 'Check Out',
                          content: 'Are you sure to check out this booking?',
                          onOk: async () => {
                            const res = await AdminApiRequest.put(`/booking/check-out/${record.id}`);
                            if (res.status === 200) {
                              fetchBookingList();
                              message.success('Check out successfully');
                            }
                          }
                        })
                      }}
                    >
                      Check Out
                    </Button>
                  )
                }
              </>
            )
          }
        ]}
      />
    </div>
  );
};

export default AdminBooking;
