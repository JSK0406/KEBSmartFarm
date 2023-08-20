import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './illuminanceSensor.css';
import { useEffect } from 'react';

function IlluminanceSensor({ plantDetail, kitIlluminance }) {
    
    const [series, setSeries] = React.useState([kitIlluminance / 100]); 
    const plantLeastIlluminance = plantDetail?.plantLeastIlluminance || '';

    console.log(kitIlluminance)

    useEffect(() => {
        if (kitIlluminance === '') {
            setSeries(['notYet']);
        } else {
            setSeries([kitIlluminance / 100]);
        }
    }, [kitIlluminance]);


    function getIlluminanceStatus(plantLeastIlluminance, series) {
        const measuredIlluminance = series * 100;  

        console.log(measuredIlluminance);

        // If the measured temperature is within the optimal range
        if (measuredIlluminance >= plantLeastIlluminance && measuredIlluminance <= 10000) {
            return 'Optimal';
        }

        // If the measured temperature is below the optimal range
        if (measuredIlluminance < plantLeastIlluminance) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {`${plantLeastIlluminance - measuredIlluminance}Lux Below`}
                </div>
            )
        }

        // If the measured temperature is above the optimal range
        if (measuredIlluminance > 10000) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {`${measuredIlluminance - 10000}Lux Above`}
                </div>
            )
        }

        return 'No Data'; // For other cases (though this might not actually occur, it's added for exception handling.)
    }

    console.log(getIlluminanceStatus(plantLeastIlluminance, series));

    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            parentHeightOffset: 0
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                min: 0,
                max: 100,
                track: {
                    background: '#e7e7e7',
                    strokeWidth: '97%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 3,
                        opacity: 0.5
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 25,
                        fontSize: '18px',
                        formatter: function (val) {  // 현재 온도 값을 직접 표시하는 부분입니다.
                            return val * 100 + 'Lux';
                        }
                    }
                },
            }
        },
        fill: {
            colors: ['#dfd880']
        },
        series: series,
        stroke: {
            lineCap: 'round'
        },
        labels: ['Illuminance'],
    }

    return (
        <div style={{ position: 'relative' }}>
            <ReactApexChart id='chart' options={options} series={series} type="radialBar" height='100%' paddingBottom="10px" />
            <div style={{
                position: 'absolute',
                left: '50%',  // 가로 중앙에 배치하기 위해 50%로 설정
                transform: 'translateX(-50%)',  // 가로 방향으로 자기 자신의 반만큼 이동
                fontSize: '16px',
                top: '70%',
                bottom: '20%'
            }}>
                {getIlluminanceStatus(plantLeastIlluminance, series)}
            </div>

        </div>
    )
}

export default IlluminanceSensor;