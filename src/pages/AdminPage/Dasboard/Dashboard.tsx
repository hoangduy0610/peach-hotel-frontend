// src/app/pages/AdminPage/Dashboard/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import BookingsChart from '@/components/admin/BookingsChart';
import BookingStatusChart from '@/components/admin/BookingStatusChart';
import CombinedChart from '@/components/admin/CombinedChart';
import CustomerTierChart from '@/components/admin/CustomerTierChart';
import RevenueChart from '@/components/admin/RevenueChart';
import TierChart from '@/components/admin/TierChart';
import { AdminApiRequest } from '@/services/AdminApiRequest';
import { Card } from 'react-bootstrap';
import PaymentSummaryChart from '@/components/admin/PaymentSummaryChart';


const DashboardPage: React.FC = () => {
  const [chartData, setChartData] = useState<any>({});

  const fetchData = async () => {
    const res = await AdminApiRequest.get('/report/system');
    setChartData(res.data);

    const totalRoom = document.getElementById('totalRoom');
    const totalUser = document.getElementById('totalUser');
    const totalService = document.getElementById('totalService');
    const totalBooking = document.getElementById('totalBooking');

    if (res.data.totalRoom && totalRoom) {
      totalRoom.innerText = res.data.totalRoom;
    }
    if (res.data.totalUser && totalUser) {
      totalUser.innerText = res.data.totalUser;
    }
    if (res.data.totalService && totalService) {
      totalService.innerText = res.data.totalService;
    }
    if (res.data.totalBookingValue && totalBooking) {
      totalBooking.innerText = res.data.totalBookingValue.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="h1 fw-bold">Dashboard</h1>
        </div>
        <hr />
        <div className='py-4'></div>
        {/* <div className="col">
          <BookingsChart data={chartData} />
        </div>
        <div className="col">
          <RevenueChart data={chartData} />
        </div> */}
        <div className="col-3">
          <Card className="shadow analytics-gradient-1 mb-3 text-white">
            <Card.Body>
              <Card.Title className='h5 fw-bold'>Total Room</Card.Title>
              <Card.Text className='h1 fw-bold' id="totalRoom">N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow analytics-gradient-2 mb-3 text-white">
            <Card.Body>
              <Card.Title className='h5 fw-bold'>Total User</Card.Title>
              <Card.Text className='h1 fw-bold' id="totalUser">N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow analytics-gradient-3 mb-3 text-white">
            <Card.Body>
              <Card.Title className='h5 fw-bold'>Total Service</Card.Title>
              <Card.Text className='h1 fw-bold' id="totalService">N/A</Card.Text>
            </Card.Body>
          </Card>
          <Card className="shadow analytics-gradient-4 mb-3 text-white">
            <Card.Body>
              <Card.Title className='h5 fw-bold'>Total Booking</Card.Title>
              <Card.Text className='h1 fw-bold' id="totalBooking">N/A</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-5">
          <CombinedChart data={chartData} />
          <TierChart data={chartData} />
        </div>
        <div className="col-4">
          <RevenueChart data={chartData} />
          <BookingsChart data={chartData} />
        </div>
      </div>
      <div className='py-4'></div>
      <hr />
      <div className='py-4'></div>
      <div className="row">
        <div className="col">
          <PaymentSummaryChart data={chartData} />
        </div>
        <div className="col">
          <CustomerTierChart data={chartData} />
        </div>
        <div className="col">
          <BookingStatusChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
