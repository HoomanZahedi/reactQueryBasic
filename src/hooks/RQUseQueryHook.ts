import {useQuery, useQueryClient,useMutation} from 'react-query';
import axios from 'axios';

interface SingleHero{
  data:data;
  status:number;
}
interface Hero{
    data:data[];
    status:number
  }
  type data= {
    id:number;
    name:string;
    alterego:string;
  }
  
export const RQUseQuery =(url:string ,queryKey:string,enabled=true,onSuccess?:((data: data[] | undefined) => void) | undefined,onError?:((err: unknown) => void) | undefined)=>{
  
  return useQuery(`${queryKey}`,async()=>{
      
      const {data,status}:Hero= await axios.get(url);
      if(status === 200){
        return data
      }
    },{
      // staleTime:20000,
      enabled,
      onSuccess,
      onError,
      refetchOnWindowFocus:true
    })
  
}

export const RQUseQueryById =(url:string ,queryKey:string,queryId:any ,enabled=true,onSuccess?:((data: data[] | undefined) => void) | undefined,onError?:((err: unknown) => void) | undefined)=>{
  
  // return useQuery([`${queryKey}`,queryId],async()=>{
      
  //     const {data,status}:SingleHero= await axios.get(url);
  //     if(status === 200){
  //       return data
  //     }
  //   },{
  //     // staleTime:20000,
  //     enabled,
  //     onSuccess,
  //     onError,
  //     refetchOnWindowFocus:true
  //   })
  const queryClient = useQueryClient();
  return useQuery([`${queryKey}`,queryId],async()=>{
        const {data,status}:SingleHero= await axios.get(url);
        if(status === 200){
          return data
        }
      },
      {
        initialData:()=>{
          const hero = queryClient.getQueryData(queryKey)?.data?.find(hero=>hero.id === parseInt(queryId));
          if(hero){
            return {
              data:hero
            }
          }else{
            return undefined
          }
        }
      }
    )
}

export const RQUseMutation=(url:string,postData:any,queryKey:string)=>{
  const queryClient = useQueryClient();
  return useMutation(async()=>{
    const {status,data} = axios.post(url,postData);
    if(status === 200){
      return data
    }
  }
  ,{
    // onSuccess:()=>{
    //   queryClient.invalidateQueries(queryKey)
    // },
    onMutate:async(newData)=>{//when you want make changes in UI before usemutation call post request
      await queryClient.cancelQueries(queryKey);
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey,(oldData)=>{
        debugger;
        console.log(postData);
        return[
          ...oldData,
          {...postData,id:oldData.length+1}
        
        ]
      })
    },onSettled:()=>{
      queryClient.invalidateQueries(queryKey)
    }
  }
  );
}
