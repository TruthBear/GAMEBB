import React, { useEffect, useState } from 'react'
import GameCard from '../components/common/GameCard';


const HomePage = () => {
  
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const apiKey = '8002a31aaf4147db8fce8bc551b606fd'; // 여기에 실제 RAWG API 키를 입력하세요.
      const date = new Date();
      const currentDate = date.toISOString().split('T')[0];
      date.setMonth(date.getMonth() - 3);
      const threeMonthsAgo = date.toISOString().split('T')[0];
      
      const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${threeMonthsAgo},${currentDate}&ordering=-added&page_size=20`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <section className='px-5 py-10'>
      <div></div>
      <ul className='space-y-5 flex flex-wrap'>
      {
        games.length === 0 
        ? "Loading" 
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
      </ul>
    </section>
  )
}



export default HomePage;