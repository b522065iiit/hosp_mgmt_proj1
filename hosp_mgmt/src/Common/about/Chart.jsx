import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BedDetailsChart = () => {
  const data = {
    labels: ['General Ward', 'ICU', 'Emergency', 'Maternity', 'Pediatrics'],
    datasets: [
      {
        label: '# of Beds',
        data: [30, 20, 15, 10, 25],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Light Blue
          'rgba(0, 123, 255, 0.5)',   // Blue
          'rgba(0, 99, 255, 0.5)',    // Dark Blue
          'rgba(0, 75, 130, 0.5)',    // Steel Blue
          'rgba(25, 25, 112, 0.5)',   // Midnight Blue
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // Light Blue
          'rgba(0, 123, 255, 1)',   // Blue
          'rgba(0, 99, 255, 1)',    // Dark Blue
          'rgba(0, 75, 130, 1)',    // Steel Blue
          'rgba(25, 25, 112, 1)',   // Midnight Blue
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 max-w-md justify-start">
      <h2 className="text-2xl font-bold mb-4 px-16">Ward Occupancy</h2>
      <Pie data={data} />
    </div>
  );
};

export default BedDetailsChart;