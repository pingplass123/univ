import React, { useEffect, useState,useRef } from 'react'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage'
// import CourseList from './CourseComponents/CourseList'
import { Button ,ListGroup, ButtonGroup} from 'react-bootstrap'
import styled from "styled-components";
import ReactPlayer from 'react-player';
import { BsPersonCircle, BsPlayCircle ,BsCalendarCheck} from 'react-icons/bs'
import './ShowCourse.css'
import Swal from 'sweetalert2'
import axios from 'axios';
import CommentEditor from './CourseComponents/CommentEditor';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import parser from "html-react-parser";
import {useNavigate} from 'react-router-dom';
import { slice } from 'lodash'
import Badge from 'react-bootstrap/Badge';


const ShowCourse = () => {
  const [course,setCourse] = useState([]);
  const course_id = localStorage.getItem('course_id');
  const user_id =localStorage.getItem('userID');

  const couresID = localStorage.getItem('course_id');
  const [comments, setComments] = useState([]);
  const [updateStat, setUpdateStat] = useState(false);
  const [score, setScore] = useState('');
  const token = localStorage.getItem('token');
  const list = (comments.all_comment || [])
  list.sort((a, b) => (a.id > b.id) ? -1 : 1)
  const [textComment, setTextComment] = useState('');
  const countComment = (comments.all_comment || []).length;
  const [video, setVideo] = useState();
  const navigate = useNavigate();
  const [userLogin, setUserlogin] = useState();
  const [show, setShow] = useState(false);

  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)


 //////// Count number of comment/////////////////////////
 const [isCompleted, setIsCompleted] = useState(false);
 const commentsFirst = 5;
 const [index, setIndex] = useState(commentsFirst);

 const loadMore = () => {
   setIndex(index + commentsFirst)
   console.log(index)
   if (index >= countComment) {
     setIsCompleted(true)
   } else {
     setIsCompleted(false)
   }
 }
 
 const initialComments = slice(comments.all_comment || [], 0, index)


  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      
      color: '#ff6d75',
    },

    '& .MuiRating-iconHover': {
      
      color: '#ff3d47',
    },
    });


  // console.log(course)

  useEffect(() => {
    fetchCourse();
    FetchComment();
    const userString = localStorage.getItem("user");
    setUserlogin(userString);
    
  },[], [updateStat]);


  const fetchCourse = async () => {
    await axios.get(`https://univelear.herokuapp.com/api/course/${course_id}`)
    .then(({data}) => {
      setCourse(data.data);
    })
  }
  const deleteCourse = async (id) => {
    const isConfirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        return result.isConfirmed
    })

    if (!isConfirm) {
        return;
    }
    await axios.delete(`https://univelear.herokuapp.com/api/delete/course/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then(({data}) => {
        Swal.fire({
            icon: 'success',
            text: data.message
        })
        navigate(-1)
        fetchCourse()
    }).catch(({response:{data}}) => {
        Swal.fire({
            text: data.message,
            icon: 'error'
        })
    })
}
  // console.log(video)

  
  // const handleClickScroll = () => {
  //   const element = document.getElementById('video');
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

    const FetchComment = () => {
      return fetch("https://univelear.herokuapp.com/api/course/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({couresID: couresID}),
      })
      .then(response => response.json())
      .then(data => setComments(data.data))
    }

    const CreateComment = () => {
      if(!userLogin){
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Sign in before',
      })
      }
      if(userLogin){
        if (textComment.trim().length !== 0 && score.trim().length !== 0) {
          Swal.fire({
            icon: 'success',
            // title: 'Success',
            text: 'Your comment was added successfully'
        })
      }  else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please leave comment and score before.',
       })
      }
      return fetch("https://univelear.herokuapp.com/api/comment/create/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({couresID: couresID, description: textComment, score: score}),
      })
        .then((data) => data.json())
        .then(FetchComment())
        .then((data) => setUpdateStat(data.data))
        .then((data) => console.log(data))
  
       } 
    }
  
  // console.log(video);
  
  console.warn = () => {};
  console.error = () => {};

  const deleteComment = async (id) => {
    const isConfirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        return result.isConfirmed
    })

    if (!isConfirm) {
        return;
    }
    await axios.delete(`https://univelear.herokuapp.com/api/delete/comment/course/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then(({data}) => {
        Swal.fire({
            icon: 'success',
            text: data.message
        })
        FetchComment()
    }).catch(({response:{data}}) => {
        Swal.fire({
            text: data.message,
            icon: 'error'
        })
    })
}

function introStart(){
  setVideo(course.videoList[0].videolink);
  setShow((isVisible) => !isVisible);
}

// {console.log(user_id)}
// {console.log(course)}
// console.log(video)

if(user_id!=course.userID){
  return (
    <main className="container">
      <div className='navbar'>
        <NavbarScrollAnotherPage/>
      </div><hr/><hr/><br/>
      
      <div className="p-4 mb-4 rounded-3" style={{ backgroundImage:`url(${course.image})` }}>
        <div className="py-4 container-fluid">
          <h1 className="text-primary display-5 fw-bold text-uppercase">{course.title}</h1>
          <div className="col-md-8 fs-4" style={{display:'flex'}}>
            <div className='text-primary align-self-center'><BsPersonCircle/></div>
            <div className='text-primary'>&nbsp;{course.nameCreate}</div>
          </div>
          <div className="pt-3 col-md-8 fs-6" style={{display:'flex'}}>
            <div className='text-primary align-self-center'><BsCalendarCheck/></div>
            <div className='text-primary'>&nbsp;launch date {course.created_at}</div>
          </div>
          <br/>
          {/* {...setTimeout(()=>introStart(),1000)}*/}
          <Button id="introstart" className="border-primary btn btn-lg" variant="outline-primary" type="button" onClick={()=>introStart() }>Start watching</Button >
        </div>
      </div>
      
      <div className='video-player' id="video">
        {show && <ReactPlayer url={video} className="react-player" playing width="auto" height="500px" controls={true} />}    
      </div>
      <br/>
      <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="p-5 text-bg-dark border rounded-3">
          <h2>Course Description</h2><hr/>
            <p className="col-md-8 fs-6">{course.body}</p>
            <div className="col-md-8 fs-6" style={{display:'flex'}}>
              <div className='align-self-center'><BsCalendarCheck/></div>
              <div className='text-white'>&nbsp;latest update {course.updated_at}</div>
            </div>
          <br/>
          <h2>Course outline</h2><hr/>
          <ButtonGroup vertical>
          {
            course.videoList && course.videoList.map((data,index)=>{
              return (data),
              <Button key={index} className="videoname" variant='outline-dark' style={{display:'flex'}} onClick={()=>setVideo(data.videolink)}>
                <div className='text-white align-self-center'><BsPlayCircle/></div>
                <div className='text-white'>&nbsp;{data.videoname}</div>
              </Button>
              
            })
          }
          </ButtonGroup>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-light border rounded-3">
          <h2>Comment</h2>
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
          <CommentEditor setTextComment={setTextComment} onChange={(e) => setTextComment(e.target.value)}/>

          <div className="text-end">
            <Button variant="primary" type='submit' className='mb-3' style={{margin:'0.5rem', marginLeft:'1rem'}} onClick={CreateComment}>
              Comment
            </Button>
          </div>
      </div>
    </div>
    <div className="p-4 mb-4 text-bg-white rounded-3">
        <div className="py-4 container-fluid">
          <h4 className="text-black">All Comments ({countComment})</h4>
          <div className='scroll' style={{overflow:"auto", width:"auto", height:"800px", overflowX:'hidden'}}>
          {initialComments.map((data)=>{
            // return data,
              if(!userLogin){
                return data,
                <div key={data.id} className="mb-3 text-bg-white rounded-3" style={{ border:'1px black solid' }}>
                <div className="ml-5 col-md-8" style={{display:'flex'}}>
                  <div className='align-self-center'><BsPersonCircle/></div>
                  <div className='text-black fs-4'>&nbsp;{data.nameCreate}</div>
                  <div className='text-gray' style={{paddingLeft:'50px'}}>{dayjs(data.created_at).fromNow()}</div>
                </div>
                
                <div className="py-1 container-fluid" style={{marginLeft:'1rem'}}>{parser(data.description)}</div>
                <Box >
                  <StyledRating
                    className='rating-score'
                    value={data.score}
                    precision={1}
                    // edit={false}
                    disabled={true} 
                    count={5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </div>
              }
              if(data.userID != user_id){
                return data,
                <div key={data.id} className="mb-3 text-bg-white rounded-3" style={{ border:'1px black solid' }}>
                <div className="ml-5 col-md-8" style={{display:'flex'}}>
                  <div className='align-self-center'><BsPersonCircle/></div>
                  <div className='text-black fs-4'>&nbsp;{data.nameCreate}</div>
                  <div className='text-gray' style={{paddingLeft:'50px'}}>{dayjs(data.created_at).fromNow()}</div>
                </div>
                
                <div className="py-1 container-fluid" style={{marginLeft:'1rem'}}>{parser(data.description)}</div>
                <Box >
                  <StyledRating
                    className='rating-score'
                    value={data.score}
                    precision={1}
                    // edit={false}
                    disabled={true} 
                    count={5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </div>
              }
              if(data.userID == user_id){
                return data,
                <div className="mb-3 text-bg-white rounded-3" style={{ border:'1px black solid' }}>
                <div className="ml-5 col-md-8" style={{display:'flex'}}>
                  <div className='align-self-center'><BsPersonCircle/></div>
                  <div className='text-black fs-4'>&nbsp;{data.nameCreate}</div>
                  <div className='text-gray' style={{paddingLeft:'50px'}}>{dayjs(data.created_at).fromNow()}</div>
                </div>
                
                <div className="py-1 container-fluid" style={{marginLeft:'1rem'}}>{parser(data.description)}</div>
                <Box >
                  <StyledRating
                    className='rating-score'
                    value={data.score}
                    precision={1}
                    // edit={false}
                    disabled={true} 
                    count={5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
                <div className='m-1 text-end'>
                  <Button variant='danger' onClick={() => deleteComment(data.id)}>Delete</Button>
                </div>
              </div>
              } 
          })}
            <div className="mt-3 mb-5 d-grid">
              {isCompleted ? (
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-dark disabled"
                >
                  No more comments
                </button>
              ) : (
                <button onClick={loadMore} type="button" className="btn btn-dark">
                  Load More Comment
                </button>
              )}
            </div>
          </div>
        </div> 
      </div>
    </div>
  </main>
  )
}

//Permission for delete course
if(user_id==course.userID){
  return (
    <main className="container">
      <div className='navbar'>
        <NavbarScrollAnotherPage/>
      </div><hr/><hr/><br/>
      
      <div className="p-4 mb-4 text-primary rounded-3" style={{ backgroundImage:`url(${course.image})` }}>
        <div className="py-4 container-fluid">
          <h1 className="display-5 fw-bold text-uppercase">{course.title}</h1>
          <div className="col-md-8 fs-4" style={{display:'flex'}}>
            <div className='text-primary align-self-center'><BsPersonCircle/></div>
            <div className=''>&nbsp;{course.nameCreate}</div>
          </div>
          <div className="pt-3 col-md-8 fs-6" style={{display:'flex'}}>
            <div className='text-primary align-self-center'><BsCalendarCheck/></div>
            <div className=''>&nbsp;launch date {course.created_at}</div>
          </div>
          <br/>
          <div className='button-course'style={{display:'flex'}}>
          <Button id="introstart" className="border-primary btn btn-lg" variant="outline-primary" type="button" onClick={()=>introStart()}>Start watching</Button >
            &nbsp;&nbsp;<Button variant='danger' onClick={() => deleteCourse(course.id)}>Delete course</Button>
          </div>
          
        </div>
      </div>
      <div className='video-player' id="video">
        {show && <ReactPlayer url={video} className="react-player" playing width="auto" height="500px" controls={true} />}    
      </div>
      <br/>
      <div class="row align-items-md-stretch">
      <div class="col-md-6">
        <div class="p-5 text-bg-dark border rounded-3">
          <h2>Course Description</h2><hr/>
            <p className="col-md-8 fs-6">{course.body}</p>
            <div className="col-md-8 fs-6" style={{display:'flex'}}>
              <div className='align-self-center'><BsCalendarCheck/></div>
              <div className='text-white'>&nbsp;latest update {course.updated_at}</div>
            </div>
          <br/>
          <h2>Course outline</h2><hr/>
          <ButtonGroup vertical>
          {
            course.videoList && course.videoList.map((data,index)=>{
              return (data),
              <Button key={index} className="videoname" variant='outline-dark' style={{display:'flex'}} onClick={()=>setVideo(data.videolink)}>
                <div className='text-white align-self-center'><BsPlayCircle/></div>
                <div className='text-white'>&nbsp;{data.videoname}</div>
              </Button>
              
            })
          }
          </ButtonGroup>
        </div>
      </div>
      <div class="col-md-6">
        <div class="h-100 p-5 bg-light border rounded-3">
          <h2>Comment</h2>
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
          <CommentEditor setTextComment={setTextComment} onChange={(e) => setTextComment(e.target.value)}/>

          <div className="text-end">
            <Button variant="primary" type='submit' className='mb-3' style={{margin:'0.5rem', marginLeft:'1rem'}} onClick={CreateComment}>
              Comment
            </Button>
          </div>
      </div>
    </div>
    <div className="p-4 mb-4 text-bg-white rounded-3">
        <div className="py-4 container-fluid">
          <h4 className="text-black">All Comments ({countComment})</h4>
          <div className='scroll' style={{overflow:"auto", width:"auto", height:"800px", overflowX:'hidden'}}>
          {initialComments.map((data)=>{
            // return data,
              if(!userLogin){
                return data,
                <div key={data.id} className="mb-3 text-bg-white rounded-3" style={{ border:'1px black solid' }}>
                <div className="ml-5 col-md-8" style={{display:'flex'}}>
                  <div className='align-self-center'><BsPersonCircle/></div>
                  <div className='text-black fs-4'>&nbsp;{data.nameCreate}</div>
                  <div className='text-gray' style={{paddingLeft:'50px'}}>{dayjs(data.created_at).fromNow()}</div>
                </div>
                
                <div className="py-1 container-fluid" style={{marginLeft:'1rem'}}>{parser(data.description)}</div>
                <Box >
                  <StyledRating
                    className='rating-score'
                    value={data.score}
                    precision={1}
                    // edit={false}
                    disabled={true} 
                    count={5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </div>
              }
              if(data.userID != user_id){
                return data,
                <div key={data.id} className="mb-3 text-bg-white rounded-3" style={{ border:'1px black solid' }}>
                <div className="ml-5 col-md-8" style={{display:'flex'}}>
                  <div className='align-self-center'><BsPersonCircle/></div>
                  <div className='text-black fs-4'>&nbsp;{data.nameCreate}</div>
                  <div className='text-gray' style={{paddingLeft:'50px'}}>{dayjs(data.created_at).fromNow()}</div>
                </div>
                
                <div className="py-1 container-fluid" style={{marginLeft:'1rem'}}>{parser(data.description)}</div>
                <Box >
                  <StyledRating
                    className='rating-score'
                    value={data.score}
                    precision={1}
                    // edit={false}
                    disabled={true} 
                    count={5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </div>
              }
              if(data.userID == user_id){
                return data,
                <div className="mb-3 text-bg-white rounded-3" style={{ border:'1px black solid' }}>
                <div className="ml-5 col-md-8" style={{display:'flex'}}>
                  <div className='align-self-center'><BsPersonCircle/></div>
                  <div className='text-black fs-4'>&nbsp;{data.nameCreate}</div>
                  <div className='text-gray' style={{paddingLeft:'50px'}}>{dayjs(data.created_at).fromNow()}</div>
                </div>
                
                <div className="py-1 container-fluid" style={{marginLeft:'1rem'}}>{parser(data.description)}</div>
                <Box >
                  <StyledRating
                    className='rating-score'
                    value={data.score}
                    precision={1}
                    // edit={false}
                    disabled={true} 
                    count={5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
                <div className='m-1 text-end'>
                  <Button variant='danger' onClick={() => deleteComment(data.id)}>Delete</Button>
                </div>
              </div>
              } 
          })}
          <div className="mt-3 mb-5 d-grid">
              {isCompleted ? (
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-dark disabled"
                >
                  No more comments
                </button>
              ) : (
                <button onClick={loadMore} type="button" className="btn btn-dark">
                  Load More Comment
                </button>
              )}
            </div>
          </div>
        </div> 
      </div>
    </div>
  </main>
  )

}
}



export default ShowCourse;