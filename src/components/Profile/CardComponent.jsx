import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useParams } from 'react-router-dom';
import ReactReadMoreReadLess from "react-read-more-read-less";


const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 0;
  flex-basis: 33.333%;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

const Photo = styled.div`
  background-position: center center;
  background-image: url(${props => props.bgPhoto});
  background-color: ${props => props.bgColor};
  background-size: cover;
  width: 30%;
  height: 100%;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: ${props => props.color};

  @media screen and (max-width: 600px) {
    font-size: 15px;
  }

`;

const Text = styled.p`
  color: #9ca1ae;
  line-height: 1.5;
  
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
  
`;

const Tag = styled.p`
  color: black;
  line-height: 1.5;
`

const PreTitle = styled.span`
  color: ${props => props.color};
  display: block;
  
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

const CTA = styled.span`
  cursor: pointer;
  color: ${props => props.color};
  font-weight: 500;
  font-size: 16px;
  margin-top: 20px;
  display: block;

  i {
    margin-left: 10px;
  }
`;

const CardComponent = ({
  bgPhoto,
  bgColor = "#DBE0E6",
  title,
  text,
  titleColor = "#1F2126",
  preTitle,
  preTilteColor = "black",
  cta,
  ctaColor = "#056BFD",
  tag,
  id,
  category,
  idItem,
}) => (
  <Container>
    <Photo bgPhoto={bgPhoto} bgColor={bgColor} />
    <Content>
      {preTitle && <PreTitle color={preTilteColor}>{preTitle}</PreTitle>}
      {title && <Title color={titleColor}>{title}</Title>}
      {text && <ReactReadMoreReadLess charLimit={70}readMoreText={""}>{text.replace(/(<([^>]+)>)/ig, '')}</ReactReadMoreReadLess>}
      {tag && <Tag>{tag}</Tag>}
      {cta && (
        <CTA color={ctaColor}>
          {cta}
          <i className="fas fa-arrow-right" />
        </CTA>
      )}
      <Link to={{ pathname:`/Timeline/${tag}/${category}/${id}`}} onClick={() => localStorage.setItem(idItem, id)}>
      <button type="button" class="btn btn-dark btn-sm" >Read More</button>
      </Link>
    </Content>
    
  </Container>
);

CardComponent.propTypes = {
  title: PropTypes.string,
  bgPhoto: PropTypes.string,
  bgColor: PropTypes.string,
  text: PropTypes.string,
  preTitle: PropTypes.string,
  preTilteColor: PropTypes.string,
  cta: PropTypes.string,
  ctaColor: PropTypes.string,
  tag: PropTypes.string,
  id: PropTypes.number,
  category: PropTypes.string,
  idItem: PropTypes.string
};

export default CardComponent;
