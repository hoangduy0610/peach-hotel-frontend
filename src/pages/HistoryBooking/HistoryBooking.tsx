import React, { useEffect, useState } from 'react';
import './HistoryBooking.scss';
import { Table, Tag, Button, Modal, Form, Input, Rate, message } from 'antd';
import { Container } from 'react-bootstrap';
import Breadcrumbs from '@/layouts/Breadcrumbs/Breadcrumbs';

const HistoryBooking = () => {
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [currentReservationCode, setCurrentReservationCode] = useState<string | null>(null);
  const [feedbackForm] = Form.useForm();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    document.title = 'History Booking';
    window.scroll(0, 0);

    
  // const fetchBookingList = async () => {
  //   const res = await MainApiRequest.get('/booking/list');
  //   setBookingList(res.data)
  // }

  // useEffect(() => {
  //   fetchBookingList()
  // }, [])


    // Fake booking data
    const fakeData = [
      {
        key: '1',
        customerName: 'John Doe',
        reservationCode: 'RES123',
        customerPhone: '123456789',
        checkIn: '2024-12-01T14:00:00',
        checkOut: '2024-12-03T11:00:00',
        rooms: [{ roomTier: { name: 'Deluxe' } }],
        status: 'PENDING',
      },
      {
        key: '2',
        customerName: 'Jane Smith',
        reservationCode: 'RES456',
        customerPhone: '987654321',
        checkIn: '2024-11-28T15:00:00',
        checkOut: '2024-11-30T10:00:00',
        rooms: [{ roomTier: { name: 'Suite' } }],
        status: 'RESERVING',
      },
      {
        key: '3',
        customerName: 'Alice Johnson',
        reservationCode: 'RES789',
        customerPhone: '1122334455',
        checkIn: '2024-11-20T12:00:00',
        checkOut: '2024-11-25T10:00:00',
        rooms: [{ roomTier: { name: 'Standard' } }],
        status: 'RESERVED',
      },
    ];

    setBookingList(fakeData);
  }, []);

  const handleOpenFeedbackModal = (reservationCode: string) => {
    setCurrentReservationCode(reservationCode);
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = () => {
    feedbackForm.validateFields().then((values) => {
      console.log('Feedback Submitted:', { reservationCode: currentReservationCode, ...values });
      feedbackForm.resetFields();
      setIsFeedbackModalOpen(false);
      message.success('Thank you for your feedback!');
    });
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };


  return (
    <>
      <Breadcrumbs title="History Booking" pagename="History Booking" />
      <section className="history-section py-5">
        <Container>
          <Table
            dataSource={bookingList}
            columns={[
              { title: 'Guest', dataIndex: 'customerName', key: 'customerName' },
              { title: 'Reservation Code', dataIndex: 'reservationCode', key: 'reservationCode' },
              { title: 'Phone Number', dataIndex: 'customerPhone', key: 'customerPhone' },
              {
                title: 'Check In',
                dataIndex: 'checkIn',
                key: 'checkIn',
                render: (checkIn: string) => checkIn.split('T')[0],
              },
              {
                title: 'Check Out',
                dataIndex: 'checkOut',
                key: 'checkOut',
                render: (checkOut: string) => checkOut.split('T')[0],
              },
              {
                title: 'Room Type',
                dataIndex: 'rooms',
                key: 'rooms',
                render: (rooms: any[]) => rooms[0].roomTier.name,
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status: string) => {
                  let color = '';
                  switch (status) {
                    case 'PENDING':
                      color = 'orange';
                      break;
                    case 'RESERVING':
                      color = 'blue';
                      break;
                    case 'RESERVED':
                      color = 'green';
                      break;
                    default:
                      color = 'gray';
                  }
                  return <Tag color={color}>{status}</Tag>;
                },
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (_, record) => (
                  <>
                    {record.status === 'RESERVED' && (
                      <Button type="primary" onClick={() => handleOpenFeedbackModal(record.reservationCode)}>
                        Feedback
                      </Button>
                    )}
                  </>
                ),
              },
            ]}
          />
        </Container>
      </section>

      <Modal
        title="Feedback"
        open={isFeedbackModalOpen}
        onOk={handleFeedbackSubmit}
        onCancel={() => setIsFeedbackModalOpen(false)}
      >
        <Form form={feedbackForm} layout="vertical">
        <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please give a rating!' }]}
          >
            <div className="rating-container gap-2">
              <Rate 
                allowHalf 
                value={rating} 
                onChange={handleRatingChange} 
                style={{display: 'flex', justifyContent: 'center'}}
              />
              <span className="rating-value">{rating} / 5</span>
            </div>
          </Form.Item>
          <Form.Item
            label="Reservation Code"
            name="reservationCode"
            initialValue={currentReservationCode}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Feedback"
            name="feedback"
            rules={[{ required: true, message: 'Please provide your feedback!' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your feedback here..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HistoryBooking;
