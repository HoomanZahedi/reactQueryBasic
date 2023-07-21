import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
interface User{
    userId:number;
}

function DependentQuery({userId}:User) {
    const userData = useQuery({
        queryKey:['user',userId],
        queryFn:async () => {
            const {data,status} = await axios.get(`http://localhost:4000/users?userId=${userId}`);
            if(status===200)
                return data
        }
    })
    const CourseData = useQuery({
        queryKey:['Course',userData.data],
        queryFn:async () => {
            const {data,status} = await axios.get(`http://localhost:4000/courses?userName=${userData.data[0].userName}`);
            if(status===200)
                return data
        },
        enabled:!!userData?.data
        
    });
    console.log(CourseData)

  return (
    <div>

    </div>
  )
}

export default DependentQuery