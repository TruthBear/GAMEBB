import React, { useEffect, useState } from 'react'
import GameCard from '../components/common/GameCard';
import { useInView } from 'react-intersection-observer';


const HomePage = () => {
  
  const [games, setGames] = useState([]);
  const [firstRun, setFirstRun] = useState(true);  
  const [page, setPage] = useState(1);

  const [bottom, bottomView] = useInView();

  useEffect(() => {
    const fetchGames = async () => {
      const apiKey = process.env.REACT_APP_API_KEY; 
      const date = new Date();
      const currentDate = date.toISOString().split('T')[0];
      date.setMonth(date.getMonth() - 3);
      const threeMonthsAgo = date.toISOString().split('T')[0];

      const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=10&dates=${threeMonthsAgo},${currentDate}&ordering=-added&page=${page}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setGames(g => [...g, ...data.results]);
        setPage(p => p+1)
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    if(firstRun === true) {
      setFirstRun(!firstRun);
      console.log(firstRun)
      // 최초 데이터 요청
      fetchGames();
    } else {
      console.log(firstRun)
       // 무한스크롤 요청
      if(bottomView) {
        fetchGames();
      }
    }

    

  }, [bottomView, page, firstRun]);

  console.log(games)


  // <li className='w-full h-[400px] bg-black bg-opacity-10 rounded-lg'></li> 
  

  return (
    <section className='px-5 pb-10'>
      <div></div>
      <ul className='space-y-5 flex flex-col'>
      {
        games.length === 0
        // ? <p className='text-center'>Loading...</p>
        ? <div className='space-y-5'>
          <li className='w-full h-[400px] bg-gray-400 opacity-10 rounded-lg'></li>  
          <li className='w-full h-[400px] bg-gray-400 opacity-10 rounded-lg'></li>  
          <li className='w-full h-[400px] bg-gray-400 opacity-10 rounded-lg'></li>  
          <li className='w-full h-[400px] bg-gray-400 opacity-10 rounded-lg'></li>  
          <li className='w-full h-[400px] bg-gray-400 opacity-10 rounded-lg'></li>  
        </div>
        : games?.map((item, index) => (
          <li key={index}>
            <GameCard 
              background={item?.background_image} 
              name={item?.name} 
              platforms={item?.parent_platforms} 
              rating={item?.rating}
              released={item?.released}
              genres={item?.genres}
              slug={item?.slug}
              id={item?.id}
            />
            </li>
            
        ))
      }
      <div className='text-center' ref={bottom}>무한스크롤 요청</div>
      </ul>
    </section>
  )
}



export default HomePage;