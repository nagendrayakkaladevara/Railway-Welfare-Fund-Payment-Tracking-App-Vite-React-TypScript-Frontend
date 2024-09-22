import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";

interface PolarAreaDemoPropos {
    Xaxis: any;
    Yaxis: any
}
const PolarAreaDemo: React.FC<PolarAreaDemoPropos> = ({ Xaxis, Yaxis }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            datasets: [
                {
                    data:Xaxis ,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--bluegray-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ],
                    label: 'Emp count'
                }
            ],
            labels:  Yaxis
        };
        const options = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="polarArea" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}
export default PolarAreaDemo;