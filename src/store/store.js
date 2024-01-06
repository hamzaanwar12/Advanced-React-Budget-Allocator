import {configureStore} from "@reduxjs/toolkit"
import currencySlice from "./CurrencyPrices"

const store = configureStore({
    reducer:{
        budget: currencySlice.reducer,
    }
})

export default store