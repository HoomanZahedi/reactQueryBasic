import React from 'react';
import { useQueries } from 'react-query';
import axios from 'axios';

function ParallelQueries() {
    const heroIds=[1,3];
    const parallel = useQueries(
        heroIds.map(id=>{
            return{
                queryKey:['parallelHero',id],
                queryFn:async()=>{
                    const {data,status} = await axios.get(`http://localhost:4000/superHeroes/${id}`);
                    if(status === 200){
                        return data;
                    }
                }
            }
        })
    )
    console.log(parallel)
    if(parallel[0].isLoading){
        return(<div>loading...</div>)
    }
  return (
    <div>
        <ul>
            {
                parallel?.map(x=>
                    <li key={x.data.id}>{x.data.name} </li>
                )
            }
        </ul>
    </div>
  )
}

export default ParallelQueries