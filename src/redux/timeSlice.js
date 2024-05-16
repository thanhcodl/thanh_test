import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chosen: {},
  isEmpty: true
}

export const timeSlice = createSlice({
  name: 'date',
  initialState: initialState,
  reducers: {
    setTime: (state, action) => {
      state.hour = action?.payload?.hour
      state.minutes = action?.payload?.minutes
      state.isEmpty = false
    },
    changeTime: (state, action) => {
      const key = action?.payload?.key
      let value = action?.payload?.value
      if (key === 'hour' && value === '00') value = '24'
      state[key] = value
    },
    clearTime: (state) => {
      state.isEmpty = true
    }
  },
})

export const { setTime, changeTime, clearTime } = timeSlice.actions
export const selectHour = (state) => {
  let value = state?.time?.hour
  if (value === '24') value = '00'
  return value
}
export const selectMinutes = (state) => state?.time?.minutes
export const selectFullTime = (state) => state?.time
export const selectChosenTime = (state) => state?.time?.chosen

export default timeSlice.reducer
