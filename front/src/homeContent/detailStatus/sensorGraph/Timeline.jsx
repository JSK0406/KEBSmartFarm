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

function Timeline() {
    return (
        <div className="timeline-container" style={{ width: '100%' }}>
            {timelineData.map((item, index) => (
                <div key={index} className="timeline-item">
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-event">
                        <FontAwesomeIcon icon={faDroplet} style={{ color: '#80cee1', }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Timeline;
