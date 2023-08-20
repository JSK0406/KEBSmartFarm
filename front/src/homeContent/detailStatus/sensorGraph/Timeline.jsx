import React from 'react';
import './timeline.css';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const timelineData = [
    { date: '08-01' },
    { date: '08-05' },
    { date: '08-10' },
    { date: '08-15' },
    { date: '08-20' }
];

function Timeline({ wateringDates: initialWateringDates }) {

    const [wateringDates, setWateringDates] = React.useState([]);

    React.useEffect(() => {
        setWateringDates(initialWateringDates); // 상위 컴포넌트에서 전달받은 wateringDates를 상태에 할당
    }, [initialWateringDates]);

    console.log(wateringDates);

    // return (
    //     <div className="timeline-container" style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
    //         {wateringDates? [...wateringDates].reverse().map((item, index) => (
    //             <div key={index} className="timeline-item">
    //                 <div className="timeline-date" style={{ fontSize: '2.3vmin' }} >{item.wateringDate.substring(5, 16).replace("T", " ")}</div>
    //                 <div className="timeline-event">
    //                     <FontAwesomeIcon icon={faDroplet} style={{ color: '#80cee1', }} />
    //                 </div>
    //             </div>
    //         )) : <div>There is no record of watering</div>}
    //     </div>
    // );

    return (
        <div className="timeline-container" style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            {wateringDates ? [...wateringDates].reverse().map((item, index) => (
                <div key={index} className="timeline-item">
                    <div className="timeline-date" style={{ fontSize: '2.3vmin', fontWeight: index === 4 ? '600' : '500' }}>
                        {item.wateringDate.substring(5, 16).replace("T", " ")}
                    </div>
                    <div className="timeline-event">
                        <FontAwesomeIcon icon={faDroplet} style={{ color: '#80cee1', }} />
                    </div>
                </div>
            )) : <div>There is no record of watering</div>}
        </div>
    );


}

export default Timeline;
