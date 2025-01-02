import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const CombinedChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);

    const sampleData = [
        { date: '2024-12-01', bookings: 10, revenue: 100 },
        { date: '2024-12-02', bookings: 12, revenue: 150 },
        // Các dữ liệu mẫu khác...
        { date: '2024-12-30', bookings: 10, revenue: 120 },
    ];

    useEffect(() => {
        const labels = sampleData.map(item => item.date);
        const bookingValues = sampleData.map(item => item.bookings);
        const revenueValues = sampleData.map(item => item.revenue);

        setChartData({
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Number of Rooms Booked',
                    data: bookingValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    yAxisID: 'y-axis-1',
                },
                {
                    type: 'line',
                    label: 'Daily Revenue',
                    data: revenueValues,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                    tension: 0.1,
                    yAxisID: 'y-axis-2',
                }
            ]
        });
    }, []);

    return (
        <div className="chart">
            <h3 className='h3'>Room Bookings and Daily Revenue in the Last 30 Days</h3>
            {chartData ? (
                <Chart
                    type='bar'
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Room Bookings and Daily Revenue in the Last 30 Days'
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            'y-axis-1': {
                                type: 'linear',
                                position: 'left',
                                title: {
                                    display: true,
                                    text: 'Number of Rooms Booked'
                                },
                                beginAtZero: true,
                            },
                            'y-axis-2': {
                                type: 'linear',
                                position: 'right',
                                title: {
                                    display: true,
                                    text: 'Revenue (USD)'
                                },
                                beginAtZero: true,
                                grid: {
                                    drawOnChartArea: false, 
                                },
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

export default CombinedChart;
