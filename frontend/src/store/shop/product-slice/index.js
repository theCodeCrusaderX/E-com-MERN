import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const getFilteredProduct = createAsyncThunk(
  "/product/getFilteredProduct",
  async () => {
    const res = await axios.get("http://localhost:8000/api/v1/shop/getProduct");

    return res
    
  }
);

const shopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload?.data?.data);
        state.productList = action.payload?.data?.data
      })
      .addCase(getFilteredProduct.rejected, (state) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default shopProductSlice.reducer;
