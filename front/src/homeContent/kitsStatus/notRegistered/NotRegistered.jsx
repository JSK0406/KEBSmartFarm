import React from 'react'
import RegisterPlant from './RegisterPlant'
import KitDelete from './KitDelete'

function NotRegistered({kit, index}) {
  return (
    <div className='col-12'>
      <div key={index}  style={{ marginTop: '20px' }}>
        <div className='col-12' style={{ borderRadius: '10px', backgroundColor:"white", border: '0px solid #212529', padding: '15px' }}>
          <p>Kit No: {kit.kitNo}</p>
          <p>Device Name: {kit.kitDeviceName}</p>
          <p>Serial Number: {kit.kitSerialNum}</p>
          <p>Date: {kit.date}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <RegisterPlant kitNo={kit.kitNo}></RegisterPlant>
            <KitDelete kitNo={kit.kitNo}></KitDelete>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotRegistered
