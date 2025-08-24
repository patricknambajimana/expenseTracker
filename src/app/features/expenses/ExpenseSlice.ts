import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the interface for an expense
interface Expense {
  id: number;
  title: string;   // changed "name" → "title" for consistency
  amount: number;
}

// Define state structure
interface ExpenseState {
  expenses: Expense[];
}

// Initial state
const initialState: ExpenseState = {
  expenses: [],
};

// Create slice
const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<{ title: string; amount: number }>
    ) => {
      state.expenses.push({ id: Date.now(), ...action.payload });
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      
    },
   resetExpense:()=>initialState
  },
});

// Export actions and reducer
export const { addExpense, removeExpense,resetExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
