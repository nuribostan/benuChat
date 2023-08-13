import React from 'react'
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'

function Home() {
  return (
    <div className='home-container'>
        <div className="chat-screen">
            <SideBar />
            <Chat />
        </div>
    </div>
  )
}

export default Home