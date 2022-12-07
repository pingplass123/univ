import React from 'react'
import NavbarScroll from './Navbar/NavbarScroll'
import Banner from './Banner/Banner'
import Category from './Category/Category'
import Aboutus from './Aboutus/Aboutus'
import Footer from './Footer/Footer'

class LandingPage extends React.Component {
    constructor(props) {
      super(props);
    }
    

  render(){
    console.warn = () => {};
    console.error = () => {};
    return (
            <div className="App">
                <NavbarScroll/>
                <Banner/>
                <Category/>
                <Aboutus/>
                <Footer/>
            </div>
      )
  }
}

export default LandingPage