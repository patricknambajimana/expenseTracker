import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDummyAction = createAsyncThunk(
  "stringDummy",
  async(_,{ rejectWithValue }) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: "emilys",
        password: "emilyspass",
      });
      return res.data
    } catch (error) {
        return rejectWithValue("error")
    }
  }
);
