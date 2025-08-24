import { useEffect, useState } from "react";
import type { RootState } from "../app/store/Store";
import { useDispatch, useSelector } from "react-redux";

import {
  addExpense,
  removeExpense,
  resetExpense,
} from "../app/features/expenses/ExpenseSlice";
import { getDummyAction } from "../app/actionCreators/dummyAction";
import type { UnknownAction } from "@reduxjs/toolkit";

function ExpenseTracker() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useDispatch();
  const expenses = useSelector((state: RootState) => state.myExpenses.expenses);

  const { data, error, loading } = useSelector(
    (state: RootState) => state.myDummy
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() && amount > 0) {
      dispatch(addExpense({ title, amount }));
      setTitle("");
      setAmount(0);
    }
  };

  useEffect(() => {
    dispatch(getDummyAction() as unknown as UnknownAction);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center p-5">
      <div>
        <p>status: {(error && error) || (loading && "loading")}</p>
        <div>
          <span>username: {data ? data.username : ""}</span>
        </div>

        <div>
          <span>email: {data ? data.email : ""}</span>
        </div>
      </div>
      <h1 className="text-xl font-bold text-green-800"> Expense Tracker</h1>

      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-1/3">
        <input
          type="text"
          className="border border-slate-400 px-3 py-2 rounded-md"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="border border-slate-400 px-3 py-2 rounded-md"
          placeholder="Expense amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button className="py-2 px-4 bg-green-900 text-white" type="submit">
          {" "}
          Add expense
        </button>
      </form>

      {/* Listing my expenses */}

      <div className="flex flex-col gap-3 bg-green-200">
        {expenses?.map((expense) => (
          <div className="flex flex-col gap-2 items-center border border-slate-200 shadow-md rounded-md ">
            <span className="flex justify-between items-center">
              {" "}
              <h1 className="text-xl font-semibold">{expense.title}</h1>
              <p className="bg-green-200 p-2 text-green-800">
                {expense.amount}
              </p>
            </span>
            <button
              className="p-2 bg-red-600 text-white"
              onClick={() => {
                dispatch(removeExpense(expense.id));
              }}>
              delete
            </button>
          </div>
        ))}
        <button
          className="p-2 bg-red-600 text-white"
          onClick={() => {
            dispatch(resetExpense());
          }}>
          clear all expenses
        </button>
      </div>
    </div>
  );
}

export default ExpenseTracker;
