import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    sign: "£",
    budget: 1000,
    spent: 960,
    allocations: [
        {
            department: "Marketing",
            price: 50,
        },
        {
            department: "Finance",
            price: 300,
        },
        {
            department: "Sales",
            price: 70,
        },
        {
            department: "Human Resource",
            price: 40,
        },
        {
            department: "IT",
            price: 500,
        },
    ]
}


const check = (allocations) => {

    let sum = 0
    Array.from(allocations).map(element => {
        sum += element.price
    })
    return sum
}

const currencySlice = createSlice({
    name: "currencySlice",
    initialState,
    reducers:
    {

        setSign(state, action) 
        {
            state.sign = action.payload.sign
        },
        setBudget(state, action) {
            state.budget = action.payload
            state.spent = check(state.allocations)
        },
        addAllocation(state, action) {
            state.allocations.push(action.payload)
        },
        modifyAllocation(state, action) 
        {
            const { operation, price, department } = action.payload
            const index = state.allocations.findIndex(element => element.department === department)
            const allocations = [...state.allocations]

            if (operation == "Add")  
            {
                if((state.spent + parseInt(price)) <= state.budget)
                {
                    allocations[index].price += parseInt(price)
                    state.allocations = [...allocations]
                    state.spent = state.spent + action.payload.price
                }
                else
                {
                    alert('Allocation cannot exceed the remaining funds : '+state.sign+(state.budget-state.spent))
                }

            }
            else if (operation == "Subtract") 
            {
                if( (allocations[index].price - parseInt(price)) >= 0)
                {

                    state.allocations[index].price -= parseInt(action.payload.price)
                    state.spent = state.spent - action.payload.price
                }
                else{
                    alert("only allocated budget can be deducted : "+state.sign+state.allocations[index].price)
                }
            }
            else if (operation == "Update") 
            {
                if (price >= 0 && (price + state.spent-allocations[index].price) <= state.budget) 
                {

                    const checker = { ...state.allocations[index], price: parseInt(action.payload.price) }

                    state.allocations[index] = { ...checker }
                    state.spent = check(state.allocations)
                }
                else
                {
                    alert("The value shouls be between the 0 and the budget : "+state.sign+state.budget)
                }
            }
        },
        IncreaseByTen(state, action) {
            if (state.spent + 10 <= state.budget) {
                state.allocations[action.payload] = { ...state.allocations[action.payload], price: state.allocations[action.payload].price + 10 }
                state.spent += 10
            }
        },
        DecreaseByTen(state, action) {
            if (state.spent - 10 >= 0 && state.allocations[action.payload].price - 10 >= 0) {
                state.allocations[action.payload] = { ...state.allocations[action.payload], price: state.allocations[action.payload].price - 10 }
                state.spent -= 10
            }
        },
        cancelAllocation(state, action) {
            state.allocations[action.payload] = { ...state.allocations[action.payload], price: 0 }
            state.spent = check(state.allocations)
        }
    }
})


export default currencySlice
const currencyActions = currencySlice.actions
export { currencyActions }
