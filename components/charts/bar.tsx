"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Issues based on Tags',
        }
    },
};

export default function TagsBar({ counts }: any) {
    const data = {
        labels: Object.keys(counts),
        datasets: [
            {
                label: 'Tags',
                data: Object.values(counts),
                backgroundColor: "#1f293799",
            },
        ],
    };
    return (
        <div className='h-[300px] flex justify-center bg-slate-200 rounded py-2'>
            <Bar options={options} data={data} />
        </div>
    )
}
