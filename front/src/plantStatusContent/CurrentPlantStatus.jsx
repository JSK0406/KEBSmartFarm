import React from 'react'
import ShowImagesBtn from './ShowImagesBtn'

function CurrentPlantStatus({plant}) {

    return (
    <div className='col-12'>
        <div key={plant.plantNum} style={{ marginTop: '20px' }}>
            <div style={{ borderRadius: '10px', backgroundColor: "white", border: '0px solid #212529', padding: '15px' }}>
                <p>plantName : {plant.plantName}</p>
                <p>plantNickName : {plant.plantNickName}</p>
                <p>plantNum : {plant.plantNum}</p>
                <p>plantRegDate: {plant.plantRegDate}</p>
                <ShowImagesBtn plantNickName={plant.plantNickName}></ShowImagesBtn>
            </div>
        </div>
    </div>
    )
}

export default CurrentPlantStatus
