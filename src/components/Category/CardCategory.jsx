import React from 'react'
import '../Category/CardCategory.css'
import { Link } from 'react-router-dom';
import ReactReadMoreReadLess from "react-read-more-read-less";

const CardCategory = ({id,urlPhoto,sub_name,description}) => {
    return (
        <div className="card-frame">
            <div className="card-temp">
                <div className="frame">
                    <img alt={sub_name} src={urlPhoto}  width="500" height="500" className="image"/>
                </div>
                <div className="overlay scroll">
                    <div className="name" style={{color:'white'}}>
                        <Link className="sub-link" to={{ pathname:`/Timeline/${sub_name}`}} onClick={() => localStorage.setItem('subcategory_id', id)}>
                            {sub_name}
                        </Link>
                    </div>
                    <div className='description'>
                        <ReactReadMoreReadLess
                            charLimit={90}
                            readMoreText={"..hide"}>
                            {description}
                        </ReactReadMoreReadLess>
                    </div>
                </div>
                <div className="name">
                    {sub_name}
                </div>
            </div>
        </div>
    )
}

export default CardCategory


