import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PlatformIcon from '../components/common/Icon/PlatformIcon';
import parse from 'html-react-parser';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import db from '../index';

const DetailPage = () => {
  const {id} = (useLocation().state);  
  const [game, setGame] = useState();
  const [screenshots, setScreenshots] = useState();
  const [seeMore, setSeeMore] = useState(false);
  const [comments, setComments] = useState();
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY; 

  // 댓글 작성
  const writeComment = async () => {
    try{
      const docRef = await addDoc(collection(db, String(id)), {
        username: username,
        comment: comment,
        createdAt: new Date(),
      });

      setComments(p => [...p, { 
        id: docRef.id,
        username: username,
        comment: comment,
         }]);
      setUsername('');
      setComment('');

      console.log("댓글작성 완료", docRef.id)
    }catch (error) {
      console.log("댓글 작성 에러")
    }
  }

  // 댓글 조회
  useEffect(()=>{
    async function getAllDocuments() {
      const colRef = collection(db, String(id));
      const querySnapshot = await getDocs(colRef);
      const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setComments(dataList);
    }
    getAllDocuments();
  },[id])

  // 게임 디테일 api
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
        {/* Comments List */}
        <div className='px-5'>
          <h2 className='text-2xl'>Comments</h2>
          <ul className='space-y-3'>
            {
              comments === undefined || comments.length === 0
              ? <p className='text-center'>댓글 없음</p> 
              : comments?.map((item)=>(
                <li 
                className='bg-white bg-opacity-20 rounded-lg p-3'  
                key={item?.id}>
                  <div className='opacity-40'>{item?.username}</div>
                  <div>{item?.comment}</div>
                </li>
              ))
            }
          </ul>
        </div>
        {/* Submit Comment */}
        <div className='px-5 w-full text-black  space-y-2'>
          <h2 className='text-2xl text-white'>Write a comment</h2>
          <div className='w-full bg-white rounded-lg overflow-hidden p-2'>
            <input
            className='w-full bg-none outline-none' 
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder='username'
            />
            <hr/>
            <textarea
            className='w-full outline-none' 
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder='Comment...'
            />
          </div>
          <div className='text-center '>
            <button 
            onClick={writeComment}
            className='font-bold bg-white w-full p-3 rounded-lg'
              >
              작성
            </button>
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
