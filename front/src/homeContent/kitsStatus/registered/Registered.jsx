import React from 'react'
import DetailStatus from '../../detailStatus/DetailStatus'

function Registered({kit, index}) {
  return (
    <div>
        <div key={index} style={{ marginTop: '20px' }}>
            <div style={{ borderRadius: '10px', border: '2px solid #212529', width: '100%', padding: '15px' }}>
                <p>Kit No: {kit.kitNo}</p>
                <p>Device Name: {kit.kitDeviceName}</p>
                <p>Serial Number: {kit.kitSerialNum}</p>
                <p>Date: {kit.date}</p>
                <DetailStatus kit={kit}></DetailStatus>
            </div>
        </div>
    </div>
  )
}

export default Registered
