import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Search = () => {
  const [searchBtn, setSearchBtn] = useState(false);

  const showSearchBarOnClick = () => {
    setSearchBtn(!searchBtn);
  }

  return (
    <section className='py-8 px-5 relative'>
      <button onClick={showSearchBarOnClick}><FaSearch className='opacity-70'/></button>
      {
        searchBtn === false 
        ? "" 
        : <div>
            <div className='absolute top-0 left-1/2 translate-x-[-50%] bg-gray-300 w-11/12 h-full flex justify-between items-center px-5 space-x-3'>
              <div><FaSearch /></div>
              <div className='w-full'><input className='w-full bg-gray-300 focus:outline-none' type="text" /></div>
              <div><button onClick={showSearchBarOnClick}><RxCross2 /></button></div>
            </div>
        </div>
      }
    </section>
  )
}

export default Search;
