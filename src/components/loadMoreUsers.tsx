import axios from 'axios';
import React, { useState } from 'react';
import {useInfiniteQuery} from 'react-query'

function LoadMoreUsers({pageParam}) {
    const [page, setpage] = useState(pageParam)
    const loadMoreResult = useInfiniteQuery(
    {
        queryKey:['userList'],
        queryFn: async () => {
            debugger
            const {data,status} = await axios.get(`http://localhost:4000/users?_limit=2&_page=${page}`)
            if(status === 200){
                return data;
            }
        },
        getNextPageParam:(_lastPage,pages)=>{
            if(pages.length<4){
                return pageParam+1
            }else{
                return undefined
            }
        }
    }
    )
    console.log(loadMoreResult)
  return (
    <div>
        {loadMoreResult.data?.pages?.map((group,id)=>
            <div key={id}>{
                group.map(user=>
                    <div key={user.userId}>{user.userName}</div>
                )
            }</div>
        )}
        <button onClick={()=>{
            setpage(page+1)
            setTimeout(() => {
                loadMoreResult.fetchNextPage();
            }, 0);
        }} disabled={!loadMoreResult.hasNextPage}>load more</button>
    </div>
  )
}

export default LoadMoreUsers