import React from 'react'
import '../Timeline/Timeline.css'
import CardCourseTheme from '../Course/CourseComponents/CardCourseTheme';
import Spinner from 'react-bootstrap/Spinner';

class TimelineCourse extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            courses:[],
            DataisLoaded: false,
        };
    }

    componentDidMount(){
    const sub_id = localStorage.getItem("subcategory_id")
    fetch("https://univelear.herokuapp.com/api/course", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({sub_id})
        }).then(data => data.json()).then(data => {this.setState({courses:data, DataisLoaded: true})});
    }

    
    
    render(){
        const { DataisLoaded } = this.state;
        if (!DataisLoaded) 
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary"/>
            </div>
        )
        
        const { courses } = this.state;
        return(
            <div className="Post-card">
            {courses.data.length > 0 ? (
                courses.data&&courses.data.map((data)=>{
                    return <div key={data.id}/>,{data},
                    <CardCourseTheme  id={data.id} title={data.title} body={data.body} sub_id={data.sub_id} nameCreate={data.nameCreate} user_id={data.userID} image={data.image} hastag={data.hastag} created_at={data.created_at} updated_at={data.updated_at} />
                    }
                )
                ) : (
                    <div className='text-center'>No Course Found</div>
                )}
            </div>
        )
    }
}

export default TimelineCourse;