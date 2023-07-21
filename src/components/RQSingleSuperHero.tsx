import React from 'react'
import { useParams } from 'react-router-dom'
import { RQUseQuery } from '../hooks/RQUseQueryHook';
import {RQUseQueryById} from '../hooks/RQUseQueryHook';
import axios from 'axios';

function RQSingleSuperHero() {
    const params = useParams();
    const {isError,data,error,isLoading}=RQUseQueryById(`http://localhost:4000/superHeroes/${params.HeroId}`,'singleHero',params.HeroId)
    if(isLoading){
        return(
            <div>loading...</div>
        )
    }
    if(isError){
        return (
            <div>
                {error.message}
            </div>
        )
    }
    
    return(
        <div>
            {data?.name + ' - '+ data?.alterego}
        </div>
    )
    
    
}

export default RQSingleSuperHero