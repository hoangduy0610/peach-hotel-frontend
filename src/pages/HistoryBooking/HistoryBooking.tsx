import React, { useEffect, useState } from 'react';
import './HistoryBooking.scss';
import { Table, Tag, Button, Modal, Form, Input, Rate, message } from 'antd';
import { Container } from 'react-bootstrap';
import Breadcrumbs from '@/layouts/Breadcrumbs/Breadcrumbs';
import { MainApiRequest } from '@/services/MainApiRequest';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const HistoryBooking = () => {
  const [bookingList, setBookingList] = useState<any[]>([]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [currentReservationCode, setCurrentReservationCode] = useState<number | null>(null);
  const [feedbackForm] = Form.useForm();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const fetchBookingList = async () => {
    const res = await MainApiRequest.get('/booking/list');
    setBookingList(res.data)
  }

  useEffect(() => {
    document.title = 'History Booking';
    window.scroll(0, 0);

    fetchBookingList()
  }, [])

  const handleOpenFeedbackModal = (id: number) => {
    setCurrentReservationCode(id);
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = async () => {
    const values = await feedbackForm.getFieldsValue();

    const user = await MainApiRequest.get("/auth/callback");

    if (!user?.data?.data) {
      alert("Please login to continue payment");
      navigate("/login");
      return;
    }

    const res = await MainApiRequest.post('/rating', {
      score: rating,
      comment: values.comment,
      userId: user.data.data.id,
      roomId: currentReservationCode,
    });
    feedbackForm.resetFields();
    setIsFeedbackModalOpen(false);
    message.success('Thank you for your feedback!');
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCancel = async (id: number) => {
    const res = await MainApiRequest.post(`/booking/cancel/${id}`);
    if (res) {
      message.success('Booking has been cancelled successfully');
      fetchBookingList();
    }
  }

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
                render: (checkIn: string) => moment(checkIn).format('DD-MM-YYYY'),
              },
              {
                title: 'Check Out',
                dataIndex: 'checkOut',
                key: 'checkOut',
                render: (checkOut: string) => moment(checkOut).format('DD-MM-YYYY'),
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
                    case 'CANCELLED':
                      color = 'red';
                      break;
                    case 'CONFIRMED':
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
                    {record.status === 'CONFIRMED' && (
                      <Button type="primary" onClick={() => handleOpenFeedbackModal(record.rooms[0].id)}>
                        Feedback
                      </Button>
                    )}
                    {
                      record.status === 'PENDING' && (
                        <Button className='btn btn-danger' onClick={() => handleCancel(record.id)}>
                          Cancel
                        </Button>
                      )
                    }
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
            name="score"
            rules={[{ required: true, message: 'Please give a rating!' }]}
          >
            <div className="rating-container gap-2">
              <Rate
                allowHalf
                value={rating}
                onChange={handleRatingChange}
                style={{ display: 'flex', justifyContent: 'center' }}
              />
              <span className="rating-value">{rating} / 5</span>
            </div>
          </Form.Item>
          <Form.Item
            label="Feedback"
            name="comment"
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
