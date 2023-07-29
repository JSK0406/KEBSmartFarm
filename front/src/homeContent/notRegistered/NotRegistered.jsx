import React from 'react'

function NotRegistered({ setPlantRegistered }) {
  return (
    <div>
        <div className="main-content" style={{ height: '75vh' }}>
            <div>
                식물 등록이 필요합니다
            </div>
            <button onClick={ () => setPlantRegistered(true) }>등록</button>
        </div>
    </div>
  )
}

export default NotRegistered
