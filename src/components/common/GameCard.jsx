import React, { useState } from 'react'
import PlatformIcon from './PlatformIcon';
import RatingIcon from './RatingIcon';
import { Link } from 'react-router-dom';
const GameCard = ({background, name, platforms, rating, released, genres}) => {
  
  // const viewMoreObj = [
  //   {
  //     title: "Release date:",
  //     cotent: released,
  //   },
  //   {
  //     title: "Genres:",
  //     cotent: genres.map((item,index)=> <span  key={index}>{item.name} </span>),
  //   },
  // ]

  const [viewMore, setViewMore] = useState(false)


  const showMoreInfo = () => {
    setViewMore(!viewMore);
  }


  
  return (
    <article className=' w-full overflow-hidden rounded-xl shadow-xl'>
      <div className='w-full'>
        <img src={background} alt={`${name} preview`} />
      </div>
      <div className='bg-[#151515] text-white w-full p-5 space-y-1 flex flex-col'>
        <PlatformIcon platforms={platforms} />
        <h3 className='text-2xl font-bold'>{name} <RatingIcon rating={rating}/></h3>
        {
          viewMore === false
          ? ""
          : <div className='space-y-5'>
              <div>
                <div className='flex flex-row justify-between items-center py-2 border-b-[1px] border-white border-opacity-15 text-sm '><div className='text-white text-opacity-40'>Release date:</div><div>{released}</div></div>
                <div className='flex flex-row justify-between items-center py-2 border-b-[1px] border-white border-opacity-15 text-sm '><div className='text-white text-opacity-40'>Genres:</div><div className='text-xs'>{genres.map((item,index)=> <span  key={index}>{item.name} </span>)}</div></div>
              </div>
              <div className='flex justify-center'>
                <div className='bg-white bg-opacity-25 p-2 rounded-lg font-bold '><Link to={`/detail/${name}`}>See More Detail</Link></div>
              </div>
            </div>
        }
        <div className='flex flex-row justify-center pt-5'>
          <button className='underline text-xs' onClick={showMoreInfo}>
            {
              viewMore === false 
              ? "View more"
              : "View less"
            }
          </button> 
        </div>
      </div>
      

    </article>
  );
}

export default GameCard;