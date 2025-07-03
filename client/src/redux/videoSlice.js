import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    allVideos: [],
    loading: false,
    error: null,
  },

  reducers: {
    setAllVideos: (state, action) => {
      state.allVideos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAllVideos, setLoading, setError } = videoSlice.actions;
export default videoSlice.reducer;
