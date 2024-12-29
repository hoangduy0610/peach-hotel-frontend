// src/app/pages/DashboardPage/DashboardPage.tsx
import React from 'react';

// import Chart from '../../../components/chart/Chart.tsx';
import './Dashboard.css';
import DashboardCard from '@/components/admin/dashboard-card/DashboardCard';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard">
      <DashboardCard
        count={100}
        title="New Booking"
        icon="https://example.com/icon-users.png"
      />
      <DashboardCard
        count={50}
        title="Schedule Room"
        icon="https://example.com/icon-orders.png"
      />
      <DashboardCard
        count={50}
        title="Check In"
        icon="https://example.com/icon-orders.png"
      />
      <DashboardCard
        count={50}
        title="Check Out"
        icon="https://example.com/icon-orders.png"
      />
      <DashboardCard
        count={50}
        title="Available Room"
        icon=""
      />
      {/* <div className="chart-section">
        <Chart />
      </div> */}
    </div>
  );
}

export default DashboardPage;
