import { FC, useEffect, useCallback } from 'react'
import { Container, Button } from 'react-bootstrap'
import Search from './search'
import SmartImage from '../comps/smart-image'
import { useAppSelector } from '../store/hooks'
import { Photo } from '../interfaces'
import { pageChanged, dataChanged } from '../store/searchSlice'
import { useAppDispatch } from '../store/hooks'

import {
  useLazyGetRandomPhotosQuery,
  useLazySearchPhotosQuery,
} from '../store/api'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const { query, page, searchData } = useAppSelector(state => state.search)
  const [fetchRandon, randomResult] = useLazyGetRandomPhotosQuery()
  const [_fetchSearch, searchResult] = useLazySearchPhotosQuery()
  console.log(searchResult)
  const {
    isFetching: searchIsLoading,
    error: searchError,
    data: _searchData,
  } = searchResult
  const {
    isFetching: randomIsLoading,
    data: randomData,
    error: randomError,
  } = randomResult

  const fetchSearch = useCallback(() => {
    _fetchSearch({ query, page: page + 1 })
  }, [_fetchSearch, query, page])

  const incrementPage = useCallback(() => {
    dispatch(pageChanged(page + 1))
  }, [dispatch, page])

  useEffect(() => {
    if (query === '') {
      fetchRandon()
    } else {
      fetchSearch()
    }
  }, [query, page, fetchRandon, fetchSearch])
  useEffect(() => {
    if (_searchData && _searchData?.results?.length > 0) {
      dispatch(dataChanged(searchData.concat(_searchData.results)))
    }
  }, [_searchData]) // eslint-disable-line react-hooks/exhaustive-deps
  let isLoading: boolean
  let isError: boolean
  let photos: Photo[] | undefined
  let totalImages: number
  if (query === '') {
    isLoading = randomIsLoading
    isError = randomError !== undefined
    photos = randomData
    totalImages = randomData?.length || 0
  } else {
    isLoading = searchIsLoading
    isError = searchError !== undefined
    photos = searchData
    totalImages = _searchData?.total || 0
  }
  const isMore = _searchData && page < _searchData.total_pages - 1
  return (
    <Container>
      <div className="d-flex flex-column">
        <Search />
        <div className="title">{query || 'Random'}</div>
        {totalImages !== undefined && !isLoading && !isError && (
          <small className="text-muted">{totalImages} images found</small>
        )}

        <div className="my-3 d-flex flex-row flex-wrap justify-content-center">
          {photos &&
            photos.map(image => (
              <SmartImage key={image.id} image={image} />
              // <Image className="m-1" src={thumb} key={id} alt={description} />
            ))}
        </div>
        {isLoading && <div className="text-center">Loading...</div>}
        {isError && <div className="text-center red">Oops, an error occured!</div>}
        {isMore && (
          <Button
            // onClick={fetchSearch}
            onClick={incrementPage}
            disabled={isLoading}
            className="py-2 px-4 align-self-center my-4"
            variant="dark"
          >
            Load more
          </Button>
        )}
      </div>
    </Container>
  )
}

export default App
