import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  chosen: {},
  listDate: [],
  isEmpty: true,
  isShowListYear: false,
}

export const dateSlice = createSlice({
  name: 'date',
  initialState: initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action?.payload?.date
      state.month = action?.payload?.month
      state.year = action?.payload?.year
      state.listDate = action?.payload?.listDate
      state.isEmpty = false
    },
    changeDate: (state, action) => {
      state[action.payload.key] = action.payload.value
    },
    clearDate: (state) => {
      state.isEmpty = true
    }
  },
})

export const { setDate, changeDate, clearDate } = dateSlice.actions
export const selectDate = (state) => state?.date?.date
export const selectMonth = (state) => state?.date?.month
export const selectYear = (state) => state?.date?.year
export const selectShowYear = (state) => state?.date?.isShowListYear
export const selectListDate = (state) => state?.date?.listDate
export const selectFullDate = (state) => state?.date
export const selectChosenDate = (state) => state?.date?.chosen

export default dateSlice.reducer
