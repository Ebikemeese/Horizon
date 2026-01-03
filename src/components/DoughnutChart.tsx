import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const palette = ['#0747b6', '#2265d8', '#2f91fa', '#34c759', '#ff9500', '#ff2d55'];
    const data = {
        datasets: [
            {
                label: "Bank",
                data: accounts,
                backgroundColor: accounts.map((_, i) => palette[i % palette.length]),

            }
        ],
        labels: accounts.map((_, i) => `Bank ${i + 1}`)
    }

    return <Doughnut 
        data={data} 
        options={{
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }}
    />
}

export default DoughnutChart