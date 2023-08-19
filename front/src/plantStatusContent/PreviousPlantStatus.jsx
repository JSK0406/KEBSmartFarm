import React from 'react'
import ShowImagesBtn from './ShowImagesBtn'
import { PiFlowerTulipBold } from 'react-icons/pi'

function PreviousPlantStatus({ previousPlant }) {

  return (
    <div className='col-12'>
      <div key={previousPlant.plant.plantNum} style={{ marginTop: '20px' }}>
        <div style={{ position: 'relative', borderRadius: '10px', backgroundColor: "#FFD7D5", border: '0px solid #212529', padding: '15px' }}>
          <PiFlowerTulipBold style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '40px' }}/>
          <p>Plant Name : {previousPlant.plant.plantName}</p>
          <p>Nick Name : {previousPlant.plant.plantNickName}</p>
          <p>Start Date: {previousPlant.plant.plantRegDate.split("T")[0]}</p>
          <p>Finish Date : {previousPlant.plantHarvestDate.split("T")[0]}</p>
          <div style={{ position: 'absolute', right: '15px', bottom: '15px' }}>
            <ShowImagesBtn plantNickName={previousPlant.plant.plantNickName} plantNum={previousPlant.plant.plantNum} statusType = 'pre' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviousPlantStatus
