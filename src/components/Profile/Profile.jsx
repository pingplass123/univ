import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LetteredAvatar from 'react-lettered-avatar';
import NavbarScroll from '../Navbar/NavbarScroll';
import CardComponent from './CardComponent';
import { Link, useParams } from 'react-router-dom';

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

    
    
    console.log('post', post)
    console.log('course', course)
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
    height: 100vh;
    background-color: black;
`
const ContainnerAvatar = styled.div`
    display: flex;
    flex-direction: row;
    align-content: space-around;
    justify-content: center;
`

const ContainnerCard = styled.div`
    display: flex;
    gap: 20px;
    background: transparent;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    padding-left: 15px;
    padding-right: 15px;
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