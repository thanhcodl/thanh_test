import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './dateSlice';
import timeReducer from './timeSlice'
import mainReducer from './mainSlice'

export default configureStore({
  reducer: {
    date: dateReducer,
    time: timeReducer,
    main: mainReducer,
  },
});