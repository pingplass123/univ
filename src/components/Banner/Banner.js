import Carousel from 'react-bootstrap/Carousel';
import Banner1 from './univbanner4.webp'
import Banner2 from './univbanner2.webp'
import Banner3 from './univbanner3.webp'
import './Banner.css';
function Banner() {
  return (
    <Carousel variant="dark" id="home">
      <Carousel.Item>
        <img
          className="d-block"
          src={Banner1}
          alt="First slide"
          style={{height:'600px' ,width:'100%'}}
        />
        <Carousel.Caption>
          <h2 className="text-6xl text-left text-primary">New</h2>
          <h2 className="text-6xl text-left text-primary">E-learning</h2>
          <h2 className="text-6xl text-left text-primary">Experience</h2>
          <p className="text-3xl text-left text-white">Hi There! we're univ e-learning,</p>
          <p className="text-3xl text-left text-white">A website that allows you to</p>
          <p className="text-3xl text-left text-white">study anywhere, share anything</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src={Banner2}
          alt="Second slide"
          style={{height:'600px' ,width:'100%'}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src={Banner3}
          alt="Third slide"
          style={{height:'600px' ,width:'100%'}}
        />
        <Carousel.Caption>
          <h2 className="text-right text-8xl text-info">Lets</h2>
          <h2 className="text-right text-8xl text-info">Study</h2>
          <h2 className="text-right text-8xl text-info">Together</h2>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>

  );
}

export default Banner;