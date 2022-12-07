import React from 'react'
import { Link, useParams } from 'react-router-dom';
import ReactReadMoreReadLess from "react-read-more-read-less";
import styled from "styled-components";


const CardBlogTheme = ({id,title,body,sub_id,user_id,nameCreate,image,hastag,created_at,updated_at})=> {
    const { sub_name } = useParams(); //subcategory.info = id,subcategorys
  
    const arrayHashtag = typeof(hastag) === 'object' ? hastag : hastag.split(',')
  
    const delBodytag = body.replace(/(<([^>]+)>)/ig, '');

    return (
    <div className='cardblog'>
        <div className="mb-2 row">
            <div className="col">
            <div className="mb-4 overflow-hidden border rounded shadow-sm row g-0 flex-md-row h-md-250 position-relative">
                <div className="p-4 col d-flex flex-column position-static">
                <strong className="mb-2 d-inline-block text-primary">{sub_name}</strong>
                <h3 className="mb-0">
                    {title}
                </h3>
                <div className="mb-1 text-muted" style={{textDecoration:"none"}}>{created_at} {" "} by {nameCreate}</div>
                <p className="mb-auto card-text">
                    <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={""}>
                        {delBodytag}
                    </ReactReadMoreReadLess>
                </p>
                    <div className="sub-link">
                        <Link to={{ pathname:`/Timeline/${sub_name}/Post/${id}`}} onClick={() => localStorage.setItem('post_id', id)}>
                            Continue reading
                        </Link>
                    </div>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <img style={{height:'215px',width:'200px'}} src={image} alt="" />
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export const cardblog = styled.div`
.img {
  position: relative;
}

`;

export default CardBlogTheme;