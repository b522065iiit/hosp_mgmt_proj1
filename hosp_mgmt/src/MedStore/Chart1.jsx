import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Define the hsl function
const hsl = (h, s, l) => `hsl(${h}, ${s}, ${l})`;

const MedicineUsageChart1 = () => {
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

    // Example usage data for each medicine (in arbitrary units)
    const baseUsageData = [
        { month: 'Jan', usage: [30, 50, 80, 40, 90, 20, 30, 40, 10, 60, 30] },
        { month: 'Feb', usage: [40, 60, 70, 50, 80, 30, 40, 50, 20, 70, 40] },
        { month: 'Mar', usage: [50, 70, 60, 60, 70, 40, 50, 60, 30, 80, 50] },
        { month: 'Apr', usage: [60, 80, 50, 70, 60, 50, 60, 70, 40, 90, 60] },
        { month: 'May', usage: [70, 90, 40, 80, 50, 60, 70, 80, 50, 100, 70] },
    ];

    // Function to add random noise to the data
    const addNoise = (value) => {
        const noise = Math.random() * 20 - 10; // Random value between -10 and 10
        return value + noise;
    };

    // Apply noise to the usage data
    const usageData = baseUsageData.map(item => ({
        month: item.month,
        usage: item.usage.map(addNoise),
    }));

    const labels = usageData.map(item => item.month);
    const datasets = data.map((med, index) => ({
        label: med.name,
        data: usageData.map(item => item.usage[index]),
        backgroundColor: hsl(`${ index * 35}`, `${100}%`, `${50}%`, 0.6),
        borderColor: hsl(`${index * 35}`, `${100}%`, `${50}%`),
        borderWidth: 1,
    }));

    const chartData = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Medicine Usage by Patients'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-2/3 lg:size-4/5">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default MedicineUsageChart1;