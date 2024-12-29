// src/app/components/BookingStatusChart.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const BookingStatusChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  // Dữ liệu mẫu cho booking status (Đã đặt và Đã hủy)
  const sampleData = [
    { status: 'Booked', count: 120 },
    { status: 'Cancelled', count: 30 },
  ];

  useEffect(() => {
    const labels = sampleData.map(item => item.status);
    const values = sampleData.map(item => item.count);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Booking Status in the Last 14 Days',
          data: values,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // Đã đặt
            'rgba(255, 99, 132, 0.6)', // Đã hủy
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)', // Đã đặt
            'rgba(255, 99, 132, 1)', // Đã hủy
          ],
          borderWidth: 1
        }
      ]
    });
  }, []);

  return (
    <div className="chart">
      <h3 className='h3'>Booking Status in the Last 14 Days</h3>
      {chartData ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Booking Status in the Last 14 Days'
              }
            }
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookingStatusChart;