import React from 'react'
import DetailStatus from '../../detailStatus/DetailStatus'
import './registered.css'

function Registered({kit, index}) {

  return (
    <div className='col-12'>
        <div key={index} style={{ marginTop: '20px' }}>
        <div style={{ position: 'relative', borderRadius: '10px', backgroundColor:"white", border: '0px solid #212529', padding: '15px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            position: 'absolute',
            right: '10px',
            top: '10px',
            overflow: 'hidden',
            borderRadius: '50%',
            border: '1px solid black',
            display: 'flex',          // flexbox를 사용
            justifyContent: 'center', // 가로 방향으로 중앙 정렬
            alignItems: 'center',     // 세로 방향으로 중앙 정렬
          }}>
            <img
              className='profile-img'
              src={kit.plant.profileImg}
              style={{
                width: '100%',
                height: '100%',
                scale: '1.3',
                // objectFit: 'cover',
                position: 'relative',
                top: '0px',
                right: '0px'
              }}
            />
          </div>
          <p><span style={{ fontWeight: '600', fontSize: '16px', marginBottom: '0px' }}>My {kit.plant.plantNickName} </span>  </p>
          <p style={{ fontSize: '16px', color: 'black', opacity: '80%', marginRight: '10px', marginTop: '0px' }}>{kit.plant.plantName}</p>
          <p><span style={{ fontSize: '16px', color: 'black', opacity: '50%' }}>{kit.kitDeviceName} Kit</span> </p>
          <p><span style={{ color: 'black', opacity: '50%', }}>{kit.plant.plantRegDate.split("T")[0]} &nbsp;~ Now</span> </p>
              <DetailStatus kit={kit}></DetailStatus>
            </div>
        </div>
    </div>
  )
}

export default Registered