import React, { useContext } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

function NavigateBar() {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className='nav-container'>
        <div className="logo"><p>Benu <span>Chat</span></p></div>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <p>{currentUser.displayName}</p>
            <button onClick={()=> signOut(auth)}>Çıkış</button>
        </div>
    </div>
  )
}

export default NavigateBar