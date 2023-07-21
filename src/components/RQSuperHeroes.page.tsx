import React, { useState } from 'react'
import { AppBar } from './appBar';
import {RQUseQuery,RQUseMutation} from '../hooks/RQUseQueryHook.ts';
import { Link } from 'react-router-dom';

interface Hero{
  name:string;
  alterego:string;
}

export const RQSuperHeroes = () => {
  const [isSuccuss, setIsSuccuss] = useState(false);
  const [NewHero, setNewHero] = useState<Hero>({name:'',alterego:''});
  const {mutate} = RQUseMutation('http://localhost:4000/superHeroes',NewHero,'superHeroes');
  const onSuccess = ()=>{
    setIsSuccuss(true)
  }
  
  const {data,error,isError,isLoading,isFetching,refetch}= RQUseQuery('http://localhost:4000/superHeroes','superHeroes')

  console.log('isftching:',isFetching , 'isloading:',isLoading);

  const handleChangeName =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setNewHero({...NewHero,[e.target.name]:e.target.value})
  }
  const handleSubmitHero=()=>{
    mutate();
  }
  
  if(isLoading){
    return <>
      {/* <button onClick={()=>refetch}>fetch data</button> */}
      <div style={{fontSize:'2rem'}}>Loading...</div>
    </>
  }
  if(isError){
    return<>
      <div style={{fontSize:'2rem'}}>{error.message}</div>
    </>
  }
  
  return (
    <div>
       <AppBar/>
       {/* <button onClick={refetch}>fetch data</button> */}
       {isSuccuss?
       <div>data fetch successfully</div>:null
       }
       <button onClick={refetch}>fetch Heroes Data</button>
       {
       <ul>
        {data?.map(hero=>
            <li key={hero.id}>
              <Link to={`/RQSingleSuperHero/${hero.id}`}>
              {hero.name}
              </Link>
            </li>
          )}
       </ul>
      }
      <h4>create new Hero</h4>
      <span >Hero Name</span><input type="text" value={NewHero.name} name='name' onChange={(e)=>handleChangeName(e)}/>
      <span >Hero Alter Ego</span><input type="text" value={NewHero.alterego} name='alterego' onChange={(e)=>handleChangeName(e)}/>
      <button onClick={handleSubmitHero}>Add User</button>
    </div>
  )
}
