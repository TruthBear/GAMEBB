import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PlatformIcon from '../components/common/Icon/PlatformIcon';
import parse from 'html-react-parser';

const DetailPage = () => {
  const {id} = (useLocation().state);  
  const [game, setGame] = useState();
  const [screenshots, setScreenshots] = useState();
  const [seeMore, setSeeMore] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY; 
  
  useEffect(() => {
    const fetchDetail = async () => {
      const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    }; 

    fetchDetail();
    console.log(game);
  }, [id, apiKey]);

  useEffect(()=>{
    const screenshotsList = async() => {
      const url = `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`;
      try {
        const response = await fetch(url);
        if(!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setScreenshots(data.results);
      } catch(error) {
        console.error('Failed to fetch screenshots:', error);
      }
    };

    screenshotsList();
  },[id, apiKey])


  const clickSeeMore = () => {
    setSeeMore(!seeMore);
  }


  
  return (
    <div className='relative w-full pt-28'>
      <div className='w-full space-y-3'>
        {/* title */}
        <h1 className='text-white text-4xl px-5 text-center font-bold'>{game?.name}</h1>
        {/* game_head */}
        <div className='flex space-x-5 justify-center px-5'>
          {/* released */}
          <div className='bg-white text-black font-bold rounded-md px-2 text-sm' >{game?.released}</div>
          {/* platforms */}
          <div>
            {game?.platforms && <PlatformIcon platforms={game?.parent_platforms} />}
          </div>
        </div>
        {/* screenshots */}
        <div className='overflow-y-auto pl-5 py-5'>
          <ul className='flex w-[1600px] space-x-3'>
            {screenshots?.map((item, index)=>(
              <li
                className='' 
                key={index}>
                <img 
                  className='w-full rounded-lg'
                  src={`${item.image}`}
                  alt={`screenshot-${index}`} />
              </li>
            ))}
          </ul>
        </div>
        {/* about */}
        <div className='px-5 pb-10'>
          <h2 className='text-2xl'>About</h2>
          <div className={`text-sm space-y-2 ${seeMore === false ? "line-clamp-4" : ""}`}>
            {game && parse(game?.description)}
          </div>
          <div className='text-center'>
            <button onClick={clickSeeMore} className='inline-block opacity-40 text-blue-300'>
              {seeMore === false ? "Read More" : "Show Less"}
            </button>
          </div>
        </div>
        {/* info block*/}
        <div className='px-5 grid grid-cols-2 gap-y-3 gap-x-1'>
          {/* Platforms */}
          <div>
            <h2 className='opacity-40' >Platforms</h2>
            <ul className='flex flex-wrap'>
              {game?.platforms.map((item, index) => (
                <li className='text-sm' key={index}>{item.platform.name} &nbsp;</li>
              ))}
            </ul>
          </div>
          {/* Genre */}
          <div>
            <h2 className='opacity-40'>Genre</h2>
            <ul className='flex flex-wrap'>
              {game?.genres.map((item, index) => (
                <li className='text-sm' key={index}>{item.name} &nbsp;</li>
              ))}
            </ul>
          </div>
          {/* Publisher */}
          <div>
            <h2 className='opacity-40'>Publisher</h2>
            <ul className='flex flex-wrap'>
              {game?.publishers.map((item, index) => (
                <li className='text-sm' key={index}>{item.name} &nbsp;</li>
              ))}
            </ul>
          </div>
          {/* Developer */}
          <div>
            <h2 className='opacity-40'>Developer</h2>
            <ul className='flex flex-wrap'>
              {game?.developers.map((item, index) => (
                <li className='text-sm' key={index}>{item.name} &nbsp;</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className='absolute w-full top-0 left-0 z-[-1]' style={{marginTop: "0"}}>
        <div 
          style={{backgroundImage : `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url("${game?.background_image}")`}}
          className='h-[300px] bg-cover bg-center'
        />
      </div>
    </div>
  );
}

export default DetailPage;
