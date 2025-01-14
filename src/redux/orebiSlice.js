import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Axios instance with base URL and credentials configuration
const api = axios.create({
  baseURL: "https://api.najm.uz/products",
  withCredentials: true,
});

const initialState = {
  userInfo: [],
  products: [],
  categories: [],
  newArrivals: [],
  bestSellers: [],
  saved: [],
  liked: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    //--------------- Product Actions -----------------
    getNewArrivalsSuccess: (state, action) => {
      state.newArrivals = action.payload;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
    },
    getAllProductsSuccess: (state, action) => {
      state.products = action.payload;
    },
    getBestSellersSuccess: (state, action) => {
      state.bestSellers = action.payload;
    },
    //--------------- Cart Actions -----------------
    addToCart: (state, action) => {
      const itemInSaved = state.saved.find(
        (savedItem) => savedItem.id === action.payload.id
      );

      if (itemInSaved) {
        itemInSaved.quantity += action.payload.quantity;
      } else {
        state.saved.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.saved.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.saved.find((item) => item.id === action.payload.id);
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.saved = state.saved.filter((item) => item.id !== action.payload);
    },
    resetCart: (state) => {
      state.saved = [];
    },
    //--------------- Saved Actions -----------------
    addToSaved: (state, action) => {
      const itemInSaved = state.liked.find(
        (savedItem) => savedItem.id === action.payload.id
      );

      if (!itemInSaved) {
        state.liked.push({ ...action.payload });
      }
    },
    deleteSaved: (state, action) => {
      state.liked = state.liked.filter((item) => item.id !== action.payload);
    },
    resetSaved: (state) => {
      state.liked = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  getCategoriesSuccess,
  getAllProductsSuccess,
  getBestSellersSuccess,
  addToSaved,
  deleteSaved,
  resetSaved,
} = orebiSlice.actions;
export default orebiSlice.reducer;

// Async actions to fetch data
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await api.get("/all-products/");
    dispatch(orebiSlice.actions.getAllProductsSuccess(res.data));
  } catch (err) {
    console.error("Error fetching all products:", err);
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await api.get("/categories/");
    dispatch(orebiSlice.actions.getCategoriesSuccess(res.data));

  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

export const getNewArrivals = () => async (dispatch) => {
  try {
    const res = await api.get("/new-products/");
    dispatch(orebiSlice.actions.getNewArrivalsSuccess(res.data));

  } catch (err) {
    console.error("Error fetching new arrivals:", err);
  }
};

export const getBestSellers = () => async (dispatch) => {
  try {
    const res = await api.get("/best-sellers/");
    dispatch(orebiSlice.actions.getBestSellersSuccess(res.data));
  } catch (err) {
    console.error("Error fetching best sellers:", err);
  }
};