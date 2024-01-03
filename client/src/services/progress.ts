import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// TODO: import type { Pokemon } from './types'

const API_BASE_URL = "http://localhost:5000/api/progress"

// Define a service using a base URL and expected endpoints
export const progressApi = createApi({
  reducerPath: 'progressApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    // GET PROGRESS BY WEEK:
    getProgressByWeek: builder.query({
    // TODO: Assign Type to: getPokemonByName: builder.query<Pokemon, string>({
      query: ({ week, day }) => {
        console.log({ week, day });
        return `?week=${week}&day=${day}`
      }
    }),
    // POST WEEKLY PROGRESS:
    postWeeklyProgress: builder.mutation({
      query: (week)=>{
        return {
          url: "",
          method: "POST",
          body: week
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProgressByWeekQuery, usePostWeeklyProgressMutation } = progressApi