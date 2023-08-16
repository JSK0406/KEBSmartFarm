import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './tempSensor.css';

function TempSensor({ plantDetail }) {
    const [series, setSeries] = React.useState([40*2.5]);  // 넣을 때 2.5를 곱한 수로 넣어야 함
 
    const plantAvgTemp = plantDetail?.plantTemp?.split('~') || '';
    const plantLeastTemp = plantDetail?.plantWinterTemp || '';

    function getTemperatureStatus(plantAvgTemp, plantLeastTemp, series) {
        const measuredTemp = series / 2.5;  // Get the measured temperature (since series had been multiplied by 2.5 as mentioned in the comments)

        // If the measured temperature is within the optimal range
        if (measuredTemp >= plantAvgTemp[0] && measuredTemp <= plantAvgTemp[1]) {
            return 'Optimal';
        }

        // If the measured temperature is below the optimal range
        if (measuredTemp < plantAvgTemp[0]) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {`${plantAvgTemp[0] - measuredTemp}°C Below`}
                </div>
            )
        }

        // If the measured temperature is above the optimal range
        if (measuredTemp > plantAvgTemp[1]) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {`${measuredTemp - plantAvgTemp[1]}°C Above`} 
                </div>
            )
        }

        return 'No Data'; // For other cases (though this might not actually occur, it's added for exception handling.)
    }

    const options = {
        chart: {
            type: 'radialBar',
            offsetY: -20,
            parentHeightOffset: 0,
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                min: 0,
                max: 40,
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
                        fontSize: '22px',
                        formatter: function (val) {  // 현재 온도 값을 직접 표시하는 부분입니다.
                            return val/2.5 + '°C';
                        }
                    }
                },
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#FF8888'],  // 파스텔 계열의 빨간색으로 변경
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 40]
            }
        },
        series: series,  // 현재 온도 값을 여기에 설정합니다.
        stroke: {
            lineCap: 'round'
        },
        labels: ['Temperature'],
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
                {getTemperatureStatus(plantAvgTemp, plantLeastTemp, series)}
            </div>

        </div>
    )


}

export default TempSensor;