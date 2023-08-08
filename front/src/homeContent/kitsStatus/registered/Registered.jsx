import React from 'react'
import DetailStatus from '../../detailStatus/DetailStatus'

function Registered({kit, index}) {
  return (
    <div>
        <div key={index} style={{ marginTop: '20px' }}>
            <div style={{ borderRadius: '10px', backgroundColor:"white", border: '0px solid #212529', width: '100%', padding: '15px' }}>
                <p>plantNum : {kit.plant.plantNum}</p>
                <p>plantName : {kit.plant.plantName}</p>
                <p>startedDate : {kit.plant.plantRegDate}</p>
                <p>Device Name: {kit.kitDeviceName}</p>
                <DetailStatus kit={kit}></DetailStatus>
            </div>
        </div>
    </div>
  )
}

export default Registered