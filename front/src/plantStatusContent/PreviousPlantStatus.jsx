import React from 'react'
import ShowImagesBtn from './ShowImagesBtn'
import { PiFlowerTulipBold } from 'react-icons/pi'

function PreviousPlantStatus({ previousPlant }) {

  console.log(previousPlant)

  return (
    <div className='col-12'>
      <div key={previousPlant.plant.plantNum} style={{ marginTop: '20px' }}>
        <div style={{ position: 'relative', borderRadius: '10px', backgroundColor: "#FFD7D5", border: '0px solid #212529', padding: '15px' }}>
          <PiFlowerTulipBold style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '40px' }}/>
          {/* <p>plantRegNo : {previousPlant.plantRegNo}</p> */}
          <p>Plant Name : {previousPlant.plant.plantName}</p>
          <p>Nick Name : {previousPlant.plant.plantNickName}</p>
          {/* <p>Plant Number : {previousPlant.plant.plantNum}</p> */}
          <p>Start Date: {previousPlant.plant.plantRegDate.split("T")[0]}</p>
          <p>Finish Date : {previousPlant.plantHarvestDate.split("T")[0]}</p>
          <ShowImagesBtn></ShowImagesBtn>
        </div>
      </div>
    </div>
  )
}

export default PreviousPlantStatus
