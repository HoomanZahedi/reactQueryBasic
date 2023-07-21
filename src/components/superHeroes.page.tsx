import React, { useState, useEffect } from 'react'
import { AppBar } from './appBar'
import axios from 'axios';

interface Hero{
  id:number;
  name:string;
  alterego:string;
}

export const SuperHeroes = () => {
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const [HeroList, setHeroList] = useState<Array<Hero>>([]);
  const [IsError, setIsError] = useState(false);
  useEffect(() => {
    fetchData()
  }, [])
  

  const fetchData = async()=>{
    try {
      const {data,status} = await axios.get('http://localhost:4000/superHeroes');
      if(status ===200){
        setHeroList(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false)
    }
    
  }
  if(IsError){
    return <div style={{color:'red'}}>Fetch Data unsuccessfully</div>
  }
  return (
    <div>
       <AppBar/>
       {IsLoading?
       <div>SuperHeroes</div>:
       <ul>
          {HeroList.map(hero=>
            <li key={hero.id}>
              {hero.name}
            </li>
          )}
       </ul>
       
      }
    </div>
  )
}
