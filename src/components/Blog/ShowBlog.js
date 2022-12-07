import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import '../Blog/ShowBlog.css';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import parse from 'html-react-parser'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage';
import swal from "sweetalert2";
// import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';







const ShowBlog = () => {

    const [posts,setPosts] = useState([]);
    const postID = localStorage.getItem('post_id');
    const [textComment, setTextComment] = useState('');
    const [score, setScore] = useState('');
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    const [updateStat, setUpdateStat] = useState(false);
    const htmlString = (posts.body || '')
    const { sub_name } = useParams();
    // const [userLogin, setUserlogin] = useState();
    // useEffect(() => {
    //   {
    //     const userString = localStorage.getItem("token");
    //     setUserlogin(userString);
    //   }
    // } );



    const str = (posts.hastag || ',')
    const arrayHashtag = typeof str === 'object' ? str : str.split(',');
    // console.log(arrayHashtag); '

    const countComment = (comments.all_comment || []).length;
    // console.log(countComment)

    ///// Sort commenst to show the newest comments on top ///////
    const listComments = (comments.all_comment || [])
    // const list = (comments.all_comment || [])
    listComments.sort((a, b) => (a.id > b.id) ? -1 : 1)

    // const listAscending = (comments.all_comment || [])
    // listAscending.sort((a, b) => (a.id < b.id) ? 1 : -1)
    // console.log(list) sortedProducts.sort((a, b) => {



    
    const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      
      color: '#ff6d75',
    },

    '& .MuiRating-iconHover': {
      
      color: '#ff3d47',
    },
    });


    //////// Display Post ////////////
    useEffect(() => {   
      fetch(`https://univelear.herokuapp.com/api/posts/${postID}`)
        .then(response => response.json())
        .then(data => setPosts(data.data))
    },[])

    // console.log(posts)
    

    /////////////// Display All Comments ///////////////////////////
    const FetchComment = () => {
      return fetch("https://univelear.herokuapp.com/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({postID: postID}),
      })
      .then(response => response.json())
      .then(data => setComments(data.data))
    }

    useEffect(() => {

      FetchComment()

    },[updateStat])

  
  const CreateComment = () => {
    const userLogin = localStorage.getItem("token")
    
    return fetch("https://univelear.herokuapp.com/api/comment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({postID: postID, description: textComment, score: score}),
    })
      .then((data) => data.json())
      .then(FetchComment())
      .then((data) => setUpdateStat(data.data))
      .then((data) => console.log(data))
      // .then(window.location.reload());
       
  };
  
  // const commentAlert = () => {
  // if(!userLogin){
  //   swal.fire({
  //     text: 'Please sign in your account and try again',
  //     icon: 'warning',
  //     confirmButtonText: 'Yes',
  //   })}
  // }


  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)


    return (

      <div>
          <div className='navbar-timeline'>
            <NavbarScrollAnotherPage/>
          </div>


      
        <div class='container-xl'>
        
        {/* Post Content */}
          <header>
          <p className='blog-date'>Published {posts.created_at}</p>
          <p className='blog-title'>{posts.title}</p>
          </header>
          <br></br>

          <div className='blog-author-detail'>
          <div className='author-user-name'>{posts.nameCreate}</div>
          </div>

          <div className='blog-subCategory'>
            <p>
              {/* {arrayHashtag.map((idx) => {
              return <div key={idx.id} className='hastag-post'>#{idx}</div>
            })} */}
            <div className='hastag-post'>#{sub_name}</div>
            </p>
            
          </div>
         <div class="row  d-flex justify-content-center"> 
          <div className='post-img-blog'>
            <img src={posts.image} alt='cover img' />
          </div>
          </div>

          <div className='blog-body'>
            {parse(htmlString)}
          </div>

          <br></br>

        {/* End Post Content */}


        {/* Comment Form */}
          
          <div className="container-comment">
            <div className='comment-box'>
              <div className='comment-title'>
                <p>Comments</p> 
              </div>
              <div className='comment-area'>
                <Box>
                <StyledRating
                  name="simple-controlled"
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  value={score}
                  onChange={(e) => {setScore(e.target.value);}}
                />
                </Box>
                

                <input
                element="textarea"
                className="form-control"
                placeholder="  Leave a comment here"
                defaultValue={textComment}
                onChange={(e) => setTextComment(e.target.value)}
                />

                <button 
                  type="submit"
                  className='submit-comment'
                  onClick={CreateComment}
                > review
                </button>


              </div>


            </div>     
          </div>

          {/* End Comment Form */}
        

        {/* Comment List */}
        
        <div class="container mt-5">

            <div class="row d-flex justify-content-center">

                <div class="col">

                    <div class="headings d-flex justify-content-between align-items-center mb-3">
                        <h6>All Comments({countComment})</h6>
                        
                    </div>
                    
                    {listComments.map((data)=>{
                        return {data},

                    <div class="card p-3 w-100">
                      <div class="d-flex justify-content-between align-items-center">

                        <div class="user d-flex flex-row align-items-center">
                          <span><small class="font-weight-bold text-primary">{data.nameCreate} </small></span>
                          <span>
                            <Box >
                              <StyledRating
                                className='rating-score'
                                value={data.score}
                                precision={0.5}
                                // edit={false}
                                disabled={true} 
                                count={5}
                                icon={<FavoriteIcon fontSize="inherit" />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                              />
                            </Box>
                          </span>
                      </div>
                      <small>{dayjs(data.created_at).fromNow()}</small>

                      </div>
                      <span><small class="font-weight-bold">{data.description}</small></span>

                    </div>
                      }
                    )}
                
                </div>
              </div>
            </div>

        {/* End Comment List */}

         {/* ///blog-wrap////  */}
    </div> {/* ///blog ////  */}
  </div>
      

    )
}



export default ShowBlog;