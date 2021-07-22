import { createSlice } from '@reduxjs/toolkit'
import { Photo } from '../interfaces'

const initialState: { page: number; query: string; searchData: Photo[] } = {
  page: 0, // page currently on, page to fetch is next one
  query: '',
  searchData: [],
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    queryChanged: (state, action) => {
      state.query = action.payload
      state.page = 0
      state.searchData = []
    },
    pageChanged: (state, action) => {
      state.page = action.payload
    },
    dataChanged: (state, action) => {
      state.searchData = action.payload
    },
  },
})
const { actions, reducer } = searchSlice
export default reducer
export const { queryChanged, pageChanged, dataChanged } = actions
