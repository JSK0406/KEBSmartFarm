import React from 'react'

function IntroHome() {
  return (
    <div>
      <h2>Home</h2>
      <div>You can handle your own kits</div>
      <div className='imgContainer' style={{ display: 'flex' }}>
        <div>
            <img src='Aimg.png' style={{ height: '100px' }}/>
            unregistered kit
            </div>
        <div>
            <img src='Aimg.png'/>
            registrerd kit
        </div>
      </div>
    </div>
  )
}

export default IntroHome
