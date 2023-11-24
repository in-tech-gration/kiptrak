import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// TODO: import type { Pokemon } from './types'

const API_BASE_URL = "http://localhost:5000/api/progress"

// Define a service using a base URL and expected endpoints
export const progressApi = createApi({
  reducerPath: 'progressApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getProgressByWeek: builder.query({
    // TODO: Assign Type to: getPokemonByName: builder.query<Pokemon, string>({
      query: ({ week, day }) => {
        console.log({ week, day });
        return `?week=${week}&day=${day}`
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProgressByWeekQuery } = progressApi