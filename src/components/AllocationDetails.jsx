import React from 'react'
import { useSelector } from 'react-redux'
import Allocated from "./Allocated"

export default function AllocationDetails() {
    
    const allocations = useSelector(state=>state.budget.allocations)
    
    return (
    <div className='mt-[5%] flex flex-col gap-y-5 pl-[1%]'>
        <h2 className='text-2xl font-roboto font-semibold'>Allocations</h2>
        <div className='flex flex-col'>
          <div className='flex flex-row w-[80%] text-md justify-between items-center'>
            <h3 className='font-semibold text-xl w-[20%]'>Department</h3>
            <h3 className='font-semibold text-xl'>Allocated Budget</h3>
            <h3 className='font-semibold text-xl'>Increase by 10</h3>
            <h3 className='font-semibold text-xl'>Decrease by 10</h3>
          </div>
          {
            Array.from(allocations).map((element,index)=><Allocated key={index} index={index} department={element.department} price={element.price}/>)
          }
        </div>
    </div>
  )
}
