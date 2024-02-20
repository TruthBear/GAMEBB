import React, { useEffect, useState } from 'react'
import GameCard from '../components/common/GameCard';
import { useInView } from 'react-intersection-observer';


const HomePage = () => {
  
  const [games, setGames] = useState([]);  
  const [page, setPage] = useState(1);
  
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchGames = async () => {
      const apiKey = process.env.REACT_APP_API_KEY; 
      const date = new Date();
      const currentDate = date.toISOString().split('T')[0];
      date.setMonth(date.getMonth() - 3);
      const threeMonthsAgo = date.toISOString().split('T')[0];

      const url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=5&dates=${threeMonthsAgo},${currentDate}&ordering=-added&page=${page}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setGames([...games, ...data.results]);
        setPage(page + 1)
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    // 최초 데이터 요청
    // fetchGames();

    // 무한스크롤 요청
    if(inView) {
      fetchGames();
    }

  }, [inView]);


  // <li className='w-full h-[400px] bg-black bg-opacity-10 rounded-lg'></li> 
  

  return (
    <section className='px-5 pb-10'>
      <div></div>
      <ul className='space-y-5 flex flex-col'>
      {
        games.length === 0
        ? <p className='text-center'>Loading...</p>
        // ? <div className='space-y-5'>
        //   <li className='w-full h-[400px] bg-black bg-opacity-10 rounded-lg'></li> 
        //   <li className='w-full h-[400px] bg-black bg-opacity-10 rounded-lg'></li> 
        //   <li className='w-full h-[400px] bg-black bg-opacity-10 rounded-lg'></li> 
        // </div>
        : games?.map((item, index) => (
          <li key={index}>
            <GameCard 
              background={item?.background_image} 
              name={item?.name} 
              platforms={item?.parent_platforms} 
              rating={item?.rating}
              released={item?.released}
              genres={item?.genres}
            />
            </li>
            
        ))
      }
      <div className='text-center' ref={ref}>무한스크롤 요청</div>
      </ul>
    </section>
  )
}



export default HomePage;