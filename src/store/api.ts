import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Photo } from '../interfaces'

const COUNT = 15

// Define a service using a base URL and expected endpoints

const unsplashApi = createApi({
  reducerPath: 'unsplashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.unsplash.com',
    prepareHeaders: headers => {
      headers.set(
        'Authorization',
        `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`
      )
      return headers
    },
  }),
  endpoints: builder => ({
    getRandomPhotos: builder.query<Photo[], number | void>({
      query: count => `photos/random?count=${count || COUNT}`,
    }),
    searchPhotos: builder.query<
      { total: number; total_pages: 0; results: Photo[] },
      { query: string; page?: number; per_page?: number }
    >({
      query: ({ query, page = 1, per_page = COUNT }) =>
        `search/photos?query=${query}&page=${page}&per_page=${per_page}`,
    }),
  }),
})
export default unsplashApi
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useLazyGetRandomPhotosQuery, useLazySearchPhotosQuery } =
  unsplashApi
