import React from 'react'

function IntroPlantStatus() {
  return (
    <div>
        <h2>Plant Status</h2>
          <div>You can check the list of plants you grow and plants you grew and see your growth diary. </div>
        <div>
            <p>{"<Add Device>"}</p>
            <img src='Aimg.png' style={{ height: '100px' }} />
              The growing plant can be known through the flower-shaped icon above and the color of light green, and the grown plant can be known through the flower-shaped icon below and the color of pink.
            <p></p>
        </div>
        <div>
            <p>{"<unregistered kit>"}</p>
            <img src='Aimg.png' style={{ height: '100px' }} />
            then you can register plant and kit delete<br />
            When you add an image, ai analyzes the image to give you three plant names with high probability and choose from them.
            and input your plant's nickname and then register these information, then registration is completed
            You can erase the kit without any plant information stored in the kit.
            Press the kit delete button, follow the written phrase, and press the button to complete the deletion.
            <p></p>
        </div>
        <div>
            <p>{"<registrerd kit>"}</p>
            <img src='Aimg.png' style={{ height: '100px' }} />
            If you have registered a plant, a button will be created to view the detail status,
            and you can check the status of the current kit,
            the information of the plant you are growing, and the watering schedule in this window.
        </div>
    </div>
  )
}

export default IntroPlantStatus
