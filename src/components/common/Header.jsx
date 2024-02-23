import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className='bg-black text-white py-3 px-5 flex justify-between items-center'>
      <div>
        <h1 className='text-[32px] font-bold'><Link to={'/'}>GAMEBB</Link></h1>
      </div>
      <div>
        <FaCircleUser className='text-4xl' />
      </div>
    </header>
  );
}

export default Header;
