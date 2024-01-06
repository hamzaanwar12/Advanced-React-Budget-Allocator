import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { currencyActions } from '../store/CurrencyPrices';

export default function Allocated({ department, price, index }) {
  const dispatch = useDispatch()
  const sign = useSelector(state => state.budget.sign)

  const handleIncrease = (event) => {
    event.preventDefault()
    dispatch(currencyActions.IncreaseByTen(index))
  }

  const handleDecrease = (event) => {
    event.preventDefault()
    dispatch(currencyActions.DecreaseByTen(index))
  }

  const handleCancel = (event) => {
    event.preventDefault()
    console.log(index)
    dispatch(currencyActions.cancelAllocation(index))
  }

  return (
    <>
      {price ?
        <div className='flex text-lg h-12 items-center w-[98%] justify-between border-b-2 border-b-slate-600'>
          <h4 className='w-[10%]'>{department}</h4>
          <h4 className='w-[5%]'>{sign + " " + price}</h4>
          <button onClick={handleIncrease} className='cursor-pointer flex items-center text-2xl text-white justify-center bg-green-700 rounded-[50%] w-7 h-7'><FaPlus /></button>
          <button onClick={handleDecrease} className='cursor-pointer flex items-center text-2xl text-white justify-center bg-red-700 rounded-[50%] w-7 h-7'><FaMinus /></button>
          <button onClick={handleCancel} className='relative right-[4%] cursor-pointer text-2xl'><MdCancel /></button>
        </div>
        : ""}
    </>
  )
}
