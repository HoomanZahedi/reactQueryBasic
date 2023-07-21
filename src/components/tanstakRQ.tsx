import React, { useState } from 'react'
import { AppBar } from './appBar';
import {useQuery,useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
interface Hero{
  data:data[];
  status:number
}
type data= {
  id:number;
  name:string;
  alterego:string;
}
type newHero={
    name:string;
    alterego:string;
}


export const TanstakRQ = () => {
    const [heroId, setHeroId] = useState<string>('');
    const [Hero, setHero] = useState<newHero>({name:'',alterego:''})
    const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {isLoading,data,isError,error} = useQuery({
    queryKey:['SuperHeroes'],
    queryFn:async()=>{
    const {data,status}:Hero= await axios.get('http://localhost:4000/superHeroes'
    );
        if(status === 200){
        return data
        }
        },refetchInterval:1000
    })
    const selectHero = useQuery({
        queryKey:['SuperHeroes',heroId],
        queryFn:async()=>{
            const {data,status} = await axios.get(`http://localhost:4000/superHeroes/${heroId}`);
            if(status===200){
                return data;
            }
        },
        enabled:data?.some(x=>x.id === +heroId)
    })
    const postMutation = useMutation({
        mutationFn:async()=>{
            const {data,status} = await axios.post('http://localhost:4000/superHeroes',{id:4,name:'IronMan',alterego:'Chris Mount'})
            if(status === 200){
                return data;
            }
        },
        // ,onSuccess:()=>{

        //     queryClient.invalidateQueries(['SuperHeroes'])
        // }
    });

    const createHero = useMutation({
      mutationFn:async()=>{
        
        const {data,status} = await axios.post('http://localhost:4000/superHeroes',{id:6,name:Hero.name,alterego:Hero.alterego});
        if(status == 201){
          return data;
        }
      },onSuccess:()=>{
        queryClient.setQueryData(['SingleHero'],{id:6,name:Hero.name,alterego:Hero.alterego})
        navigate('/singleHero',{state:6})
      }
    })
    
  
  if(isLoading){
    return <>
      {/* <button onClick={()=>refetch}>fetch data</button> */}
      <div style={{fontSize:'2rem'}}>Loading...</div>
    </>
  }
  // if(isError){
  //   return <div>{error.message}</div>
  // }
  return (
    <div>
       <AppBar/>
       {/* <button onClick={refetch}>fetch data</button> */}
       {/* {isSuccuss?
       <div>data fetch successfully</div>:null
       }
       {isError?
       <div>fetching data unsuccessfully</div>:null
       } */}
       {
       <ul>
        {data?.map(hero=>
            <li key={hero.id}>
              {hero.name}
            </li>
          )}
       </ul>
      }
      <button onClick={()=>postMutation.mutate()}>add new</button>
      <input type="text" value={heroId} onChange={(e)=>setHeroId(e.target.value)} />
      {selectHero.isSuccess?<div>{selectHero.data.name}</div>:null}

      <span >name</span>
      <input type="text" value={Hero.name} onChange={(e)=>setHero({...Hero,name:e.target.value})} />
      <span>alterego</span>
      <input type="text" value={Hero.alterego} onChange={(e)=>setHero({...Hero,alterego:e.target.value})} />
      <button onClick={()=>createHero.mutate()}>click</button>
    </div>
  )
}
