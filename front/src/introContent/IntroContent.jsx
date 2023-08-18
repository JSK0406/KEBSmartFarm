import React from 'react'
import IntroHome from './IntroHome'
import IntroPlantSearch from './IntroPlantSearch'
import IntroPlantStatus from './IntroPlantStatus'

function IntroContent() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='col-11 col-lg-10'>
          <div style={{ margin: '6px 12px', backgroundColor: 'white', borderRadius: '10px', height: '100%' }}>
            <IntroHome></IntroHome>
            <IntroPlantSearch></IntroPlantSearch>
            <IntroPlantStatus></IntroPlantStatus>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroContent
