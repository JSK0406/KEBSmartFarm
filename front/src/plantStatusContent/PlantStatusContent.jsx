import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import CurrentPlantStatus from './CurrentPlantStatus';
import PreviousPlantStatus from './PreviousPlantStatus';


function PlantStatusContent() {
  const Server_IP = process.env.REACT_APP_Server_IP;
  const [currentPlant, setCurrentPlant] = useState([])
  const [previousPlant, setPreviousPlant] = useState([])



  useEffect(() => {
    receivePlantInfo();
  }, [])

  const receivePlantInfo = async () => {
    await axios.get(`${Server_IP}/users/plantList`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("accessToken")}`
        },
    })
    .then((res) => {
      setCurrentPlant(res.data.plant);
      setPreviousPlant(res.data.previousPlant);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      <div className='col-11 col-lg-10' style={{ margin: '0 auto' }}>
            키우는 식물
        <div style={{ borderBottom: '1px solid black', margin: '0 auto', padding: '0' }}>
          <div className='row col-12 col-lg-6' style={{ margin: '0 auto', width: '100%' }}>
            {currentPlant.map((plant, index) =>
              <div className="col-12 col-lg-6">
                <CurrentPlantStatus plant={plant}></CurrentPlantStatus>
              </div>
            )}
          </div>
        </div>

        <div style={{ margin: '0 auto', padding: '0' }}>
          키웠던 식물
          <div className='row col-12 col-lg-6' style={{ margin: '0 auto', width: '100%' }}>
            {previousPlant.map((plant, index) =>
              <div className="col-12 col-lg-6">
                <PreviousPlantStatus previousPlant={plant}></PreviousPlantStatus>
              </div>
            )}
          </div>
        </div>
      </div>
    
    </>

    // <>
    //   <div className='col-11 col-lg-10' style={{ margin: '0 auto' }}>
    //     <div style={{ margin: '0 auto', padding: '0' }}>
    //       <div className='row col-12 col-lg-6' style={{ margin: '0 auto', width: '100%' }}>
    //         {
    //           currentPlant.length === 0 ? (
    //             <p>Loading current plants...</p>
    //           ) : (
    //             currentPlant.map((plant, index) =>
    //               <div className="col-12 col-lg-6" key={index}>
    //                 <CurrentPlantStatus plant={plant}></CurrentPlantStatus>
    //               </div>
    //             )
    //           )
    //         }
    //       </div>
    //     </div>

    //     <div style={{ margin: '0 auto', padding: '0' }}>
    //       <div className='row col-12 col-lg-6' style={{ margin: '0 auto', width: '100%' }}>
    //         {
    //           previousPlant.length === 0 ? (
    //             <p>Loading previous plants...</p>
    //           ) : (
    //             previousPlant.map((plant, index) =>
    //               <div className="col-12 col-lg-6" key={index}>
    //                 <PreviousPlantStatus previousPlant={plant}></PreviousPlantStatus>
    //               </div>
    //             )
    //           )
    //         }
    //       </div>
    //     </div>
    //   </div>
    // </>





  )
}

export default PlantStatusContent