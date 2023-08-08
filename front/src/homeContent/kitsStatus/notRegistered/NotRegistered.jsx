import React from 'react'
import RegisterPlant from './ResigerPlant'
import KitDelete from './KitDelete'

function NotRegistered({kit, index}) {
  return (
    <div>
      <div key={index}  style={{ marginTop: '20px' }}>
        <div style={{ borderRadius: '10px', backgroundColor:"white", border: '0px solid #212529', width: '100%', padding: '15px' }}>
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
