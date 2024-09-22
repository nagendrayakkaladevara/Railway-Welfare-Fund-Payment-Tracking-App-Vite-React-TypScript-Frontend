
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import Loader from './loader';

interface BasicDemoProps {
    Xaxis: any,
    Yaxis: any,
    loading?: boolean
}

const BasicDemo: React.FC<BasicDemoProps> = ({ Xaxis, Yaxis, loading }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        const data = {
            labels: Yaxis,
            datasets: [
                {
                    label: 'Total ₹',
                    data: Xaxis,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            {/* {loading ? (<>
                <Loader isLoading={true} />
            </>) : (<> */}
            <Chart type="bar" data={chartData} options={chartOptions} />
            {/* </>)} */}

        </div>
    )
}
export default BasicDemo;