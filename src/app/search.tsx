import { FC, FormEvent, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { queryChanged } from '../store/searchSlice'
import { ReactComponent as SearchLogo } from './search.svg'

const Search: FC = () => {
  const dispatch = useAppDispatch()
  const { query } = useAppSelector(state => state.search)

  const [err, setErr] = useState(false)
  const [quer, setQuer] = useState('')
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErr(false)
    if (quer !== query) {
      dispatch(queryChanged(quer))
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="my-4">
        <Col>
          <Form.Group className="" controlId="formSearch">
            <Form.Control
              // size="lg"
              className="p-3 shadow-sm border-0"
              type="search"
              placeholder="Search for photos"
              isInvalid={err}
              onChange={(e: any) => setQuer(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Oops, an error occured!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button className="h-100 px-3" variant="dark" type="submit">
            <SearchLogo className="mx-4" />
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Search
