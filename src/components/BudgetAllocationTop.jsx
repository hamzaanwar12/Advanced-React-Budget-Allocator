import React, { useState } from 'react'
import { currencyActions } from '../store/CurrencyPrices'
import { useSelector, useDispatch } from 'react-redux'
import { IoMdArrowDropdown } from "react-icons/io";

export default function BudgetAllocationTop() {
    const [check, setCheck] = useState("Currency (£ Pound)")
    const [total, setTotal] = useState(1000)
    const [drop, setDrop] = useState(false)
    const dispatch = useDispatch()
    const { sign, budget, spent } = useSelector(state => state.budget)
    
    // const checker = useSelector(state => state.budget)
    // console.log(budget)
    // console.log(checker)

    // const handleCheck = (currency, newSign) => 
    const handleCheck = (value) => {
        let result = ""

        if (value == "$")
            result = "$ Dollar"
        else if (value == "₹")
            result = "₹ Ruppee"
        else if (value == "€")
            result = "€ Euro"
        else if (value == "£")
            result = "£ Pound"

        setCheck("Currency" + "(" + result + ")")
        dispatch(currencyActions.setSign({ sign: value }))
    }

    const handleBudget = (event) => {
        let number = parseInt(event.target.value)
        if ( number <= 20000 && number >= spent)
        {
            setTotal(number)
            dispatch(currencyActions.setBudget(number))
        }
        else {
            alert("Budget can't exceed the value 20,000 in any Currency and can't be less than the spent"+sign+spent)
        }
    }

    return (

        <div className='flex flex-col text-roboto gap-y-10 mt-[1%] pl-[1%] '>
            <h1 className='text-4xl font-roboto font-semibold'>Company's Budget Allocation</h1>
            <div className="text-roboto flex flex-row  justify-between w-[95%] ">

                <div className='flex items-center h-14 text-center w-[15%] bg-slate-400'>
                    <h1 className='w-[42%] text-center'>Budget </h1>
                    <span>{sign}</span>
                    <input className="ml-2 text-center hover:border-none hover:ouline-none focus:border-none  focus:outline-none w-24" type="number" value={total} onChange={handleBudget} />
                </div>

                <div className='text-roboto flex items-center h-13 bg-green-200 text-green-800 w-[15%]'>
                    <h1 className='w-[100%] text-center'>Remaining {sign + " "+(budget-spent)} </h1>
                </div>

                <div className='text-roboto flex items-center h-12 bg-cyan-200 text-cyan-800 w-[15%] '>
                    <h1 className='w-[100%] text-center'>Spent so far ({sign + " "+ spent})</h1>
                </div>


                <div className='flex flex-col  w-[15%]'>

                    <div className='bg-green-400 text-roboto text-center cursor-pointer p-3 h-8 flex flex-row text-white items-center' onClick={() => setDrop(true)}>
                        <h2>{check}</h2>
                        <IoMdArrowDropdown />
                    </div>
                    {
                        drop &&
                        <div className='bg-green-400  text-white absolute top-[19%] w-[11.5%] rounded-md p-1 flex flex-col ' onClick={() => setDrop(false)}>
                            <div className='text-roboto cursor-pointer hover:text-green-400 hover:bg-white pl-5' onClick={() => handleCheck("£")}>
                                <h1 className=''> £ Pound </h1>
                            </div>
                            <div className='text-roboto cursor-pointer hover:text-green-400 hover:bg-white pl-5' onClick={() => handleCheck("$")}>
                                <h1 className=''> $ Dollar </h1>
                            </div >
                            <div className='text-roboto cursor-pointer hover:text-green-400 hover:bg-white pl-5' onClick={() => handleCheck("€")}>
                                <h1 className=''> € Euro </h1>
                            </div>
                            <div className='text-roboto cursor-pointer hover:text-green-400 hover:bg-white pl-5' onClick={() => handleCheck("₹")}>
                                <h1 className=''> ₹ Ruppee </h1>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
