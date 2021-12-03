import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: true,
  error: null,
  productDetail: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (id) => {
    const { data } = await axios.get(`/api/touristRoutes/${id}`);
    return data;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  extraReducers: {
    [getProductDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
