// src/app/pages/AdminPage/Dashboard/DashboardPage.tsx
import React from 'react';
import './Dashboard.css';
import BookingsChart from '@/components/admin/BookingsChart';
import BookingStatusChart from '@/components/admin/BookingStatusChart';
import CombinedChart from '@/components/admin/CombinedChart';
import CustomerTierChart from '@/components/admin/CustomerTierChart';
import RevenueChart from '@/components/admin/RevenueChart';
import TierChart from '@/components/admin/TierChart';


const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="chart">
        <BookingsChart />
      </div>
      <div className="chart">
        <RevenueChart />
      </div>
      <div className="chart">
        <CombinedChart />
      </div>
      <div className="chart">
        <TierChart />
      </div>
      <div className="chart">
        <CustomerTierChart />
      </div>
      <div className="chart">
        <BookingStatusChart />
      </div>
    </div>
  );
}

export default DashboardPage;
