import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";
const initialState = {
  cart: [],
  userName: "",
  email: "",
  quantity: 0,
};
const cartSystem = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUser: (state, action) => {
      state.userName = action.payload;
    },
    AddEmail: (state, action) => {
      state.email = action.payload;
    },
    AddCart: (state, action) => {
      const find = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      console.log(state.cart);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        const temp = {
          ...action.payload,
          action: "Order-Placed",
          created: moment().format("DD-MM-YYYY"),
          expected: moment()
            .add(Math.floor(Math.random() * 5 + 1), "days")
            .format("DD-MM-YYYY"),
          quantity: 1,
        };
        state.cart.push(temp);
      }
    },
    RemoveCart: (state, action) => {
      const find = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cart[find].quantity === 1) {
        const filterItem = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        state.cart = [...filterItem];
      } else {
        state.cart[find].quantity -= 1;
      }
    },
    DeleteCart: (state, action) => {
      const filterItem = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = [...filterItem];
    },
    DeleteCartComplete: (state, action) => {
      const filterItem = [];
      state.cart = [...filterItem];
    },
  },
});

export const {
  AddCart,
  AddEmail,
  RemoveCart,
  DeleteCart,
  AddUser,
  DeleteCartComplete,
} = cartSystem.actions;
export default cartSystem.reducer;
