import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function Chart({ props }) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                display: false,
            },
            title: {
                display: true,
                text: 'Pendapatan Harian',
            },
        },
    };

    const labels = props.map((item) =>
        new Date(item.createdAt).toLocaleString('default', { month: 'long', day: 'numeric' })
    )
    const data = {
        labels,
        datasets: [
            {
                label: 'Pendapatan Harian',
                data: props.map((item) => item.total).slice(0, 5),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <div className='card shadow-sm rounded-lg w-[w-12] p-1 md:p-4 bg-white text-center flex justify-center items-center'>
            <Line options={options} data={data} />

        </div>
    )
}

export default Chart