import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const {id} = (useLocation().state);  
  const [game, setGame] = useState();
  
  useEffect(() => {
    const fetchDetail = async () => {
      const apiKey = process.env.REACT_APP_API_KEY; 
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

  }, [id]);
  
  return (
    <div>{game?.name}입니다.</div>
  );
}

export default DetailPage;
