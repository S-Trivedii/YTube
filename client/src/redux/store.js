import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice"; // changing reducer name since it is a default export
import authReducer from "./authSlice";
import channelReducer from "./channelSetupSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer, // slice wala reducer
    auth: authReducer,
    channelSetup: channelReducer,
  },
});

/*
1. install redux
2. create store
3. connect store with react-app
4. create slice, slice contains many action inside reducers
5. use dispatch (when something happens like click on a button) for updating state with action.payload
6. import reduer (slice wala reducer) to store
7. now state is changed, to display it on UI, use useSelector. useSelector receive a callback function and this callback function contains the state 
of whole redux


*/
