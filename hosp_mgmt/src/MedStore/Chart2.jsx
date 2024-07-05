import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement // Register the ArcElement for pie chart
);

// Define the hsl function
const hsl = (h, s, l) => `hsl(${h}, ${s}, ${l})`;

const MedicineUsageChart2 = () => {
    const data = [
        { name: "Atorvastatin", company: "Pfizer", type: "Cholesterol-lowering" },
        { name: "Metformin", company: "Bristol-Myers Squibb", type: "Antidiabetic" },
        { name: "Aspirin", company: "Bayer", type: "Analgesic/Antipyretic" },
        { name: "Omeprazole", company: "AstraZeneca", type: "Proton pump inhibitor" },
        { name: "Paracetamol", company: "GlaxoSmithKline", type: "Analgesic" },
        { name: "Amoxicillin", company: "Pfizer", type: "Antibiotic" },
        { name: "Simvastatin", company: "Merck & Co.", type: "Cholesterol-lowering" },
        { name: "Losartan", company: "Merck & Co.", type: "Antihypertensive" },
        { name: "Clopidogrel", company: "Sanofi", type: "Antiplatelet" },
        { name: "Cetirizine", company: "Johnson & Johnson", type: "Antihistamine" },
        { name: "Pantocid 40mg", company: "Sun Pharma labs", type: "Antacid" },
    ];

    // Aggregate data by company
    const companyCounts = data.reduce((acc, med) => {
        acc[med.company] = (acc[med.company] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(companyCounts);
    const values = Object.values(companyCounts);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Medicine Distribution by Company',
                data: values,
                backgroundColor: labels.map((_, index) => hsl(`${index * 35}`, `${100}%`, `${50}%`)),
                hoverBackgroundColor: labels.map((_, index) => hsl(`${index * 35}`, `${100}%`, `${40}%`)),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Medicine Distribution by Company',
            },
        },
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-2/3 lg:w-1/2">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default MedicineUsageChart2;