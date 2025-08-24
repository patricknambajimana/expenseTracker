import { combineReducers } from "@reduxjs/toolkit";
import dummyReducer from './expenses/dummySlice'
import expenseReducer from './expenses/ExpenseSlice'
const rootReducer = combineReducers({
    myExpenses:expenseReducer,
    myDummy:dummyReducer,
})
export default rootReducer;