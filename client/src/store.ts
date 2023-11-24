// cSpell: disable
import { configureStore } from '@reduxjs/toolkit'
// @ts-expect-error: like this?
import counterReducer from './features/counter/counterSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { progressApi } from './services/progress'

export const store = configureStore({
  reducer: {
    [progressApi.reducerPath]: progressApi.reducer,
    counter: counterReducer
  },
  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(progressApi.middleware)
  }
})

setupListeners(store.dispatch);