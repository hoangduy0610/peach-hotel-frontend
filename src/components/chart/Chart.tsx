// // src/components/chart/Chart.tsx
// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Đăng ký các thành phần cần thiết cho Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Chart: React.FC = () => {
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Các tháng trong năm
//     datasets: [
//       {
//         label: 'Check In', // Dữ liệu cho Check In
//         data: [20, 35, 30, 50, 40, 60], // Số liệu Check In
//         backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền
//         borderColor: 'rgba(75, 192, 192, 1)', // Màu viền
//         borderWidth: 1,
//       },
//       {
//         label: 'Check Out', // Dữ liệu cho Check Out
//         data: [15, 25, 20, 45, 38, 55], // Số liệu Check Out
//         backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền khác
//         borderColor: 'rgba(255, 99, 132, 1)', // Màu viền khác
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Check In & Check Out Stats',
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <Bar data={data} options={options} />
//     </div>
//   );
// }

// export default Chart;