import React from 'react'
import { useLocation } from 'react-router';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

function SingleHero() {
    const location = useLocation()
    const {data,isSuccess,isLoading} = useQuery({
      queryKey:["singleHero"],
      queryFn:async()=>{
        const {data,status}=await axios.get(`http://localhost:4000/superHeroes/${location.state}`);
        if(status === 200){
          return data
        }
      }
    });
    if(isLoading){
      return <div>loading...</div>
    }
  return (
    <div>
       {isSuccess?
       <div>
        {data.name+ ' '+ data.alterego}
       </div>
       :null}
    </div>
  )
}

export default SingleHero