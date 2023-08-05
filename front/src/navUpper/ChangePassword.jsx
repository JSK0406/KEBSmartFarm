import React from 'react'
import { useState } from 'react';

function ChangePassword() {

    const [modalVisible, setModalVisible] = useState(false);


  return (
    <div>
      
            <div>
              <button onClick={() => setModalVisible(!modalVisible)}>Toggle Modal</button>

              {modalVisible && (
                <div style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#fff',
                  padding: '50px',
                  zIndex: '1000'
                }}>
                    <div className='changePasswordContent'>
                        <h2> Change Password</h2>

                        Current Password : <input type='password'></input><br></br>
                        Change Password : <input type='password'></input>
                        <button> submit </button>
                    </div>


                </div>
              )}

              {modalVisible && <div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                zIndex: '500'
              }} onClick={() => setModalVisible(false)} />}
            </div>

    </div>
  )
}

export default ChangePassword
