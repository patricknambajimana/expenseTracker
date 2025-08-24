import { createSlice} from "@reduxjs/toolkit";
import { getDummyAction } from "../../actionCreators/dummyAction";

const initialState: {
  loading: boolean;
  data: null | { username: string; email: string };
  error: null | string;
} = {
  loading: false,
  data: null,
  error: null,
};

const dummySlice = createSlice({
  name: "dummy",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getDummyAction.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(getDummyAction.rejected, (state, action) => {
        state.error = action.payload as unknown as string;
        state.data = null;
        state.loading = false;
      })
      .addCase(getDummyAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload
      }),
});

export default dummySlice.reducer ;

