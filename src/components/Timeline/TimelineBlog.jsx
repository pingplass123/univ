import React, {useState, useEffect} from 'react'
import '../Timeline/Timeline.css'
import CardBlogTheme from '../Blog/CardBlogTheme';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';



const TimelineBlog = () => {
    const [posts, setPosts] = useState([])
    const [dataisLoaded, setDataisLoaded] = useState(false)
    const [q, setQ] = useState("")
    const [dataFilter, setDataFilter] = useState([])

    const fetchGetBlog = () => {
        const sub_id = localStorage.getItem("subcategory_id")
        fetch("https://univelear.herokuapp.com/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({sub_id})
            }).then(data => data.json())
            .then(data => setPosts(data.data),setDataisLoaded(true));
    }


    useEffect(() => {
       fetchGetBlog()
    }, [])

    useEffect(() => {
        const filtered = posts.filter((item) => 
            item.title.toLowerCase().includes(q.toLowerCase())
        )
        setDataFilter(filtered)
    }, [q, posts])

    return (
        <div className="Post-card">
            <InputArea
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            <br />
            <br />
            {!dataisLoaded ? (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary"/>
                </div>
             ) : (<>
                {dataFilter.length > 0 ? (
                dataFilter&&dataFilter.map((data)=>{
                    return <div key={data.id}/>,{data},
                    <CardBlogTheme  id={data.id} title={data.title} body={data.body} sub_id={data.sub_id} nameCreate={data.nameCreate} user_id={data.userID} image={data.image} hastag={data.hastag} created_at={data.created_at} updated_at={data.updated_at} />
                    }
                )
                ) : (
                    <div className='text-center'>No Post Found</div>
                )}
           
            </>)}
                
                
            </div>

    )

    
}

export default TimelineBlog

const InputArea = styled.input`
    border-radius: 5px;
    width: 30%;

`