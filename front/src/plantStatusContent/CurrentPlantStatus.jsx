import React from 'react'
import ShowImagesBtn from './ShowImagesBtn'
import { PiPottedPlantDuotone } from 'react-icons/pi'
import { GiWateringCan } from 'react-icons/gi'
import UploadImageBtn from './UploadImageBtn'

function CurrentPlantStatus({plant}) {

    // const uploadPlantImg (img, )


    return (
    <div className='col-12'>
        <div key={plant.plantNum} style={{ marginTop: '20px' }}>
                {/* <div style={{ position: 'relative', borderRadius: '10px', backgroundColor: "#DFFFD6", border: '0px solid #212529', padding: '15px' }}> */}
                <div style={{ position: 'relative', borderRadius: '10px', backgroundColor: "white", border: '0px solid #212529', padding: '15px' }}>
                {/* <PiPottedPlantDuotone style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '40px' }}/> */}
                <GiWateringCan style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '40px', color: '#50bcdf' }}/>
                <p style={{ fontWeight: '600', fontSize: '16px' }} >My {plant.plantNickName}</p>
                <p style={{ fontSize: '16px', color: 'black', opacity: '80%', marginRight: '10px', marginTop: '0px' }} >{plant.plantName}</p>
                <p style={{ fontSize: '16px', color: 'black', opacity: '50%' }} >{plant.plantRegDate.split('T')[0]} ~ Now</p>
                {/* <p>Start Date: {plant.plantRegDate.split('T')[0]}</p> */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <UploadImageBtn plantNum={plant.plantNum}></UploadImageBtn>
                        <ShowImagesBtn plantNickName={plant.plantNickName} plantNum={plant.plantNum} statusType='cur'></ShowImagesBtn>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CurrentPlantStatus
