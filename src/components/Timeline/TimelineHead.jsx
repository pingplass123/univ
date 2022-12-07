import React from 'react'
import TabFilter from '../Tab/TabFilter'
import NavbarScrollAnotherPage from '../Navbar/AnotherPage/NavbarScrollAnotherPage'
import Carousel from 'react-bootstrap/Carousel';


function TimelineHead() {
    
  return (
    <main className="container">
      <div className='navbar-timeline'>
        <NavbarScrollAnotherPage/>
      </div>
      <hr/><hr/>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block"
              src="https://s3-alpha.figma.com/hub/file/1340864761/804360b2-16c9-4496-b7a0-061935b2ca3f-cover.png"
              alt="First slide"
              style={{height:'350px' ,width:'100%'}}
            />
            <Carousel.Caption>
              <h3 className='text-white'>Trending Now</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src="https://s3-alpha.figma.com/hub/file/1553027207/00a8e451-58ca-475e-9e23-4e6646e6adbc-cover.png"
              alt="Second slide"
              style={{height:'350px' ,width:'100%'}}
            />
            <Carousel.Caption>
              <h3 className='text-white'>Trending Now</h3>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src="https://uxmisfit.com/wp-content/uploads/2021/05/prime3_quick_start_guide_figma.jpg"
              alt="Third slide"
              style={{height:'350px' ,width:'100%'}}
            />
            <Carousel.Caption>
              <h3 className='text-white'>Trending Now</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
 
        <div className='tab-fliter'>
            <TabFilter/>
        </div>
    </main>
  )
}

export default TimelineHead