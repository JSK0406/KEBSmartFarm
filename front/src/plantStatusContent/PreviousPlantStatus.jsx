import React from 'react'
import ShowImagesBtn from './ShowImagesBtn'

function PreviousPlantStatus({ previousPlant }) {

  console.log(previousPlant)

  return (
    <div className='col-12'>
      <div key={previousPlant.plant.plantNum} style={{ marginTop: '20px' }}>
        <div style={{ borderRadius: '10px', backgroundColor: "white", border: '0px solid #212529', padding: '15px' }}>
          <p>plantRegNo : {previousPlant.plantRegNo}</p>
          <p>plantName : {previousPlant.plant.plantName}</p>
          <p>plantNickName : {previousPlant.plant.plantNickName}</p>
          <p>plantNum : {previousPlant.plant.plantNum}</p>
          <p>plantRegDate: {previousPlant.plant.plantRegDate}</p>
          <p>plantRegNo : {previousPlant.plantHarvestDate}</p>
          <ShowImagesBtn></ShowImagesBtn>
        </div>
      </div>
    </div>
  )
}

export default PreviousPlantStatus
