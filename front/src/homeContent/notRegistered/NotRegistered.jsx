import React from 'react'
import RegisterPlant from './ResigerPlant'

function NotRegistered() {

  return (
    <div>
        <div className="main-content" style={{ height: '75vh' }}>
            <div>
                식물 등록이 필요합니다
            </div>
            <RegisterPlant></RegisterPlant>
        </div>
    </div>
  )
}

export default NotRegistered
