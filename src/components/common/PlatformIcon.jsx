import React from 'react'
import { FaWindows, FaXbox, FaPlaystation, FaLinux, FaApple } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";



const PlatformIcon = (platforms) => {


  
  const whatPlatforms = (platform) => {
    if(platform === 'pc') {
      return <FaWindows />
    } else if(platform === 'xbox') {
      return <FaXbox />
    } else if(platform === 'playstation') {
      return <FaPlaystation />
    } else if(platform === 'linux') {
      return <FaLinux />
    } else if(platform ==='mac') {
      return <FaApple />
    } else if(platform ==='nintendo') {
      return <BsNintendoSwitch />
    } else if(platform ==='android') {
      return <DiAndroid />
    } else {
      return null;
    }
  }
  
  return (
    <ul className='flex flex-row space-x-2 items-center'>
      {platforms?.platforms.map((item, index) => (
        <li className='w-[15px] text-white' key={index}>
          {whatPlatforms(item.platform.slug)}
        </li>
      ))}
    </ul>
  )
}

export default PlatformIcon;
