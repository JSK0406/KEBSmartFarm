import React, { useState } from 'react';
import Chart from 'react-apexcharts';


function MoistureSensor() {
    const [tooltipData, setTooltipData] = useState('');

    const data = [
        { date: '2023-08-01', value: 10 },
        { date: '2023-08-02', value: 25 },
        { date: '2023-08-03', value: 18 },
        // ... 더 많은 데이터
    ];

    const options = {
        chart: {
            type: 'heatmap',
            events: {
                dataPointMouseEnter: function (event, chartContext, { dataPointIndex }) {
                    setTooltipData(data[dataPointIndex]);
                },
                dataPointMouseLeave: function () {
                    setTooltipData('');
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'dd MMM',
            },
        },
    };

    const series = [
        {
            name: 'heatmap',
            data: data.map(item => ({
                x: new Date(item.date).getTime(),
                y: item.value,
            })),
        },
    ];

    return (
        <div>
            <Chart options={options} series={series} type="heatmap" height='70%' />
            {tooltipData && (
                <div>
                    Date: {tooltipData.date}, Value: {tooltipData.value}
                </div>
            )}
        </div>
    );
}

export default MoistureSensor

