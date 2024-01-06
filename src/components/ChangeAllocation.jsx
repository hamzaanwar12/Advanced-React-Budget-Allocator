import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currencyActions } from '../store/CurrencyPrices'
import { IoMdArrowDropdown } from "react-icons/io";

export default function ChangeAllocation() {

    const [department, setDepartment] = useState("Choose")
    const [operation, setOperation] = useState("select")
    const [price, setPrice] = useState(0)
    const [drop, setDrop] = useState(false)
    const [drop2, setDrop2] = useState(false)


    const { sign, allocations, budget } = useSelector(state => state.budget)
    const dispatch = useDispatch()


    const handleDepartment = (value) => {

        setDepartment(value)
        setDrop(false)
    }

    const handleOperation = (value) => {
        setOperation(value)
        setDrop2(false)
    }

    const handleSave = (event) => {
        event.preventDefault()
        console.log("In Save")
        if (department === "Choose") {
            alert("Select department before making Change")
        }
        else if (operation === "select") {
            alert("Select Operation before making Change")
        }
        else {
            /*
            console.log(
                operation,
                price,
                department
            )
            */
            dispatch(currencyActions.modifyAllocation({
                operation:operation,
                price:price,
                department:department
            }))
        }
    }

    const handlePrice = (event) => {
        let number = parseInt(event.target.value)
        if (number >= 0 && number <= budget) {
            setPrice(number)
        }
        else{
            alert("Can't give thevalu greater than budget : " + sign + budget)
        }
    }


    return (
        <div className=' mt-[3%] flex flex-col gap-y-5  pl-[1%]'>
            <h2 className='text-2xl font-roboto font-semibold'>Change Allocation</h2>

            <div className='flex flex-row w-[70%] justify-between items-center'>
                <div className='flex flex-row bg-gray-200'>
                    <label className='p-1' htmlFor="">Department:</label>
                    <div className='relative border-2 border-gray-700' name="" id="" >
                        <div className='flex items-center justify-center w-20 text-black bg-white' onClick={() => setDrop(true)}>
                            <h1>{department}</h1>
                            <IoMdArrowDropdown />
                        </div>
                        <div className={drop ? "flex w-32 flex-col absolute top-8 bg-gray-700 text-center text-white p-1" : "hidden"}>
                            {
                                drop &&
                                Array.from(allocations).map((element, index) => <h1 key={index} className='w-[100%] text-sm hover:text-gray-700 hover:bg-white text-white' onClick={() => handleDepartment(element.department)}>{element.department}</h1>)
                            }
                        </div>
                    </div>
                </div>

                <div className='relative flex flex-row items-center'>
                    <div className='flex items-center justify-center border-2 border-gray-700 text-black bg-white' onClick={() => setDrop2(true)}>
                        <h1>{operation}</h1>
                        <IoMdArrowDropdown />
                    </div>

                    {
                        drop2 &&
                        <div className={drop2?'absolute top-7 w-20 text-white bg-gray-700 p-1':"hidden"}>
                            <h3 className="w-[100%] hover:text-gray-700 hover:bg-white text-center" onClick={() => handleOperation("Add")}>Add</h3>
                            <h3 className="w-[100%] hover:text-gray-700 hover:bg-white text-center" onClick={() => handleOperation("Subtract")}>Subtract</h3>
                            <h3 className="w-[100%] hover:text-gray-700 hover:bg-white text-center" onClick={() => handleOperation("Update")}>Update</h3>
                        </div>
                    }
                </div>

                <div className='flex flex-row items-center'>
                    <h1>{sign}<input className='ml-2 text-center border-2 outline-0 rounded-none focus:ouline-0 ' type="number" value={price} onChange={handlePrice} /></h1>
                </div>

                <button className='w-20 h-8 bg-blue-500 rounded-lg text-white border-0 hover:border-2 hover:border-blue-500 hover:bg-white hover:text-blue-500 active:bg-blue-500 active:text-white' onClick={handleSave}>Save</button>
            </div>
        </div >
    )
}