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

const TierChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  const sampleData = [
    { tier: 'Economy', rooms: 40 },
    { tier: 'Standard', rooms: 30 },
    { tier: 'Deluxe', rooms: 20 },
    { tier: 'Suite', rooms: 10 },
  ];

  useEffect(() => {
    const labels = sampleData.map(item => item.tier);
    const values = sampleData.map(item => item.rooms);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Rooms by Tier',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ]
    });
  }, []);

  return (
    <div className="chart">
      <h3 className='h3'>Rooms by Tier</h3>
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
                text: 'Rooms by Tier'
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

export default TierChart;
