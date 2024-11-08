import { configureStore } from '@reduxjs/toolkit'
import adminReducer from "../lib/features/api/apiSlice"
import studentReducer from "../lib/features/api/studentSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
        item:adminReducer,
        stuDetails:studentReducer,
    },
  })
}