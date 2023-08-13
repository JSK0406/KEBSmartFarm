import React from 'react'
import DetailStatus from '../../detailStatus/DetailStatus'
import './registered.css'

function Registered({kit, index}) {
  return (
    <div className='col-12'>
        <div key={index} style={{ marginTop: '20px' }}>
        <div style={{ position: 'relative', borderRadius: '10px', backgroundColor:"white", border: '0px solid #212529', padding: '15px' }}>
                <img className='profile-img' src='Aimg.png' style={{ borderRadius: '50%', position: 'absolute', right: '15px', top: '15px', border: '1px solid black'}}></img>
                <p>Plant Number : {kit.plant.plantNum}</p>
                <p>plant Name : {kit.plant.plantName}</p>
                <p>Started Date : {kit.plant.plantRegDate.split("T")[0]}</p>
                <p>Device Name: {kit.kitDeviceName}</p>
                <DetailStatus kit={kit}></DetailStatus>
            </div>
        </div>
    </div>
  )
}

export default Registered