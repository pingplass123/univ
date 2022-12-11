import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LetteredAvatar from 'react-lettered-avatar';
import NavbarScroll from '../Navbar/NavbarScroll';
import CardComponent from './CardComponent';
import { Link, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Profile = () => {

    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    const [reload, setReload] = useState(true);
    const [post, setPost] = useState();
    const [course, setCourse] = useState();


    const getPost = () => {
        return fetch("https://univelear.herokuapp.com/api/get/post/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ "userID": userID })
            }).then(data => data.json()).then(response => setPost(response.data));
    }

    const getCourse = () => {
        return fetch("https://univelear.herokuapp.com/api/get/course/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ "userID": userID })
            }).then(data => data.json()).then(response => setCourse(response.data));
    }

     useEffect(() => {
        // TODO call api for get course and post for show 
        if(reload){
            getPost()
            getCourse()
            setReload(false)
        }
    }, [reload])
    return (
        <Container>
            <NavbarScroll />
            <br />
            <br />
            <br />
            <br />    
            <ContainnerAvatar>
                <LetteredAvatar
                    name={userName}
                    size={170}
                    radius={100}
                    color="#fff"
                    backgroundColor="rgb(55,55,22)"
                />
            </ContainnerAvatar>
            <br />
            <Title>{userName}</Title>
            <br />
            <SubTitle>Your Blog</SubTitle>
            {!post ? (
                <div class="col-md-8 offset-md-5">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-info" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-light" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : ( <></>) }
            <ContainnerCard>
            {post && post.map((item,idx) => 
                <CardComponent 
                    bgPhoto={item.image}
                    tag={item.hastag[0]}
                    title={item.title}
                    text={item.body}
                    preTitle={item.created_at}
                    id={item.id}
                    category={'Post'}
                    idItem={'post_id'}
                />
            )}
            </ContainnerCard>
            <br />
            <SubTitle>Your course</SubTitle>
            {!course ? (
                <div class="col-md-8 offset-md-5">
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                </div>
            ) : (<></>) }
            <ContainnerCard>
            {course && course.map((item,idx) => 
                <CardComponent 
                    bgPhoto={item.image}
                    tag={item.hastag[0]}
                    title={item.title}
                    text={item.body}
                    preTitle={item.created_at}
                    id={item.id}
                    category={'Course'}
                    idItem={'course_id'}
                />
            )}
            </ContainnerCard>

        </Container>
    )
}

export default Profile

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    padding: 0px 30px 0px 30px;
    overflow: hidden;
`
const ContainnerAvatar = styled.div`
    display: flex;
    flex-direction: row;
    align-content: space-around;
    justify-content: center;
`

const ContainnerCard = styled.div`
  overflow: hidden;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

}
`

const Title = styled.h1`
    text-align: center;
    text-transform: uppercase;
    color: white;
`

const SubTitle = styled.h5`
    text-transform: uppercase;
    color: white;
`