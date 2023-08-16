import React from 'react'
import ShowImagesBtn from './ShowImagesBtn'
import { PiPottedPlantDuotone } from 'react-icons/pi'

function CurrentPlantStatus({plant}) {

    return (
    <div className='col-12'>
        <div key={plant.plantNum} style={{ marginTop: '20px' }}>
                <div style={{ position: 'relative', borderRadius: '10px', backgroundColor: "#DFFFD6", border: '0px solid #212529', padding: '15px' }}>
                <PiPottedPlantDuotone style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '40px' }}/>
                <p>Plant Name : {plant.plantName}</p>
                <p>Nick Name : {plant.plantNickName}</p>
                {/* <p>Plant Number : {plant.plantNum}</p> */}
                <p>Start Date: {plant.plantRegDate.split('T')[0]}</p>
                <ShowImagesBtn plantNickName={plant.plantNickName}></ShowImagesBtn>
            </div>
        </div>
    </div>
    )
}

export default CurrentPlantStatus
