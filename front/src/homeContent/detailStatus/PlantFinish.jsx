import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

function PlantFinish({ kitNo }) {

  const Server_IP = process.env.REACT_APP_Server_IP;

  const handlePlantFinish = async () => {
    const accessToken = Cookies.get('accessToken');
    await axios.post(`${Server_IP}/users/kit/${kitNo}/growth`,{}, 
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })
    .then((res) => {
      alert('Finish')
      window.location.reload();
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <div>
      <button type="button" data-bs-dismiss="modal" onClick={handlePlantFinish} style={{ color: 'white', backgroundColor: '#73BD72' }} className="btn" >Growth Finish</button>
    </div>
  )
}

export default PlantFinish
