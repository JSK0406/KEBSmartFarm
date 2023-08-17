import React from 'react'
import IntroHome from './IntroHome'

function IntroContent() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='col-11 col-lg-10'>
          <div style={{ margin: '6px 12px', backgroundColor: 'white', borderRadius: '10px', height: '90vh' }}>
            <IntroHome></IntroHome>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroContent
