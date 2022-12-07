import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {FiSearch} from 'react-icons/fi'

const Search = () => {
  const [blog, getBlog] = useState([])
  const API = 'https://univelear.herokuapp.com/api/subcategory';
  const fetchBlog = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        getBlog(res)
      })
  }
  useEffect(() => {
    fetchBlog()
  }, [])

  return (
    <div>
      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="search"
          aria-label="search"
          aria-describedby="search"
        />
        <InputGroup.Text id="basic-addon2"><FiSearch/></InputGroup.Text>
      </InputGroup>
      {/* <div>
        {blog.map((item, i) => {
            return <li key={i}>{item[0].sub_name}</li>
          })}
      </div> */}

    </div>
  )
}
export default Search;