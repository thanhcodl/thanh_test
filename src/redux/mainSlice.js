import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  display: '' // includes ['clock', 'calendar']
}

export const mainSlice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    changeDisplay: (state, action) => {
      state.display = action?.payload?.display
    }
  },
})

export const { changeDisplay } = mainSlice.actions
export const selectDisplay = (state) => state?.main?.display

export default mainSlice.reducer
