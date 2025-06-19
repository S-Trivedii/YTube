import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChannelExist: false,
  channelLogo: null,
  channelName: "",
  channelBanner: null,
  channelDescription: "",
};

const channelSlice = createSlice({
  name: "channelSetup",
  initialState,
  reducers: {
    setIsChannelExist: (state, action) => {
      state.isChannelExist = action.payload;
    },
    setChannelLogo: (state, action) => {
      state.channelLogo = action.payload;
    },
    setChannelName: (state, action) => {
      state.channelName = action.payload;
    },
    setChannelBanner: (state, action) => {
      state.channelBanner = action.payload;
    },
    setDescription: (state, action) => {
      state.channelDescription = action.payload;
    },
  },
});

export const {
  setIsChannelExist,
  setChannelLogo,
  setChannelName,
  setChannelBanner,
  setDescription,
} = channelSlice.actions;

export default channelSlice.reducer;
