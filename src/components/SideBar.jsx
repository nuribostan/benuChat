import React from 'react'
import NavigateBar from './NavigateBar'
import Search from './Search'
import Chats from './Chats'

function SideBar() {
  return (
    <div className='sideBar-container'>
        <NavigateBar />
        <Search />
        <Chats />
    </div>
  )
}

export default SideBar