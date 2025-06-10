import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer; // slice wala reducer

/*
Creating slice:

1. name -> slice name
2. initialState -> initial state of slice, isOpen name of state with value true
3. reducers -> reducers contains action function. toggleSidebar: () => {}, toggleSidebar is an action and 
() => {} is a reducer function. All the actions related to sidebar will be inside reducers.

4. Reducer fn accept two arguments, first one is state and action (action.payload)
toggleSidebar: (state, action) => {}

4. We export two things: actions and reducer    

*/

//------------ Another example of slice for cart-------------------

/*

import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state, action) => {
      state.items.length = 0;
    },
  },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default reducer;


// import addItem

const dispatch = useDispatch()
function handleClick(fruit) => {
    dispatch(addItem(fruit))
    // this fruit is action.payload
}

<button onClick={() => handleClick('orange')}>Add</button>
*/
