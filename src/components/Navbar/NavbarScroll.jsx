import React,{useEffect,useState,useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ModalSignin from '../Modal/ModalSignin'
import ModalSignup from '../Modal/ModalSignup'
import '../Navbar/NavbarScroll.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CreateIcon from './icon/CreateIcon';
import logo from './icon/logo.png'
import Swal from 'sweetalert2'

function NavbarScroll() {
  const [modalShowSignin, setModalShowSignin] = React.useState(false);
  const [modalShowSignup, setModalShowSignup] = React.useState(false);

  
  const [navBackground, setNavBackground] = useState(false)
    const navRef = useRef()
    navRef.current = navBackground
    useEffect(() => {
      const handleScroll = () => {
        const show = window.scrollY > 50
        if (navRef.current !== show) {
          setNavBackground(show)
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
    }, [])

    const [userLogin, setUserlogin] = useState();
    useEffect(() => {
      {
        const userString = localStorage.getItem("user");
        setUserlogin(userString);
      }
    } );

    const createWarning =()=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Join us or Sign in before',
      })
    }
  
    /////////// setting Logout //////////
    const logout = () => {
       localStorage.removeItem("user");
       localStorage.removeItem("token");
       localStorage.removeItem("user_id");
       localStorage.removeItem("userID");
       window.location.reload(false);
    };
  
    const create = () =>{
      window.location.href ="/create";
    }

  if(!userLogin){
  return (
    <>
      {['sm'].map((expand) => (
        <Navbar expand="sm" fixed="top" style={{ transition: '1s ease',backgroundColor: navBackground ? 'black' : 'transparent'}}>
          <Container fluid>
            <Navbar.Brand href="/" className="text-white"><img src={logo} style={{height:'46px',paddingLeft:'4rem'}}/></Navbar.Brand>
            <Navbar.Toggle className="bg-light" style={{opacity:'0.5'}} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas className="bg-dark"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="text-white">
                  Univ E-learning
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='offcanvas-border-color-202020'>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link className="text-white" href="#home">Home</Nav.Link>
                  <Nav.Link className="text-white" href="#category">Category</Nav.Link>
                  <Nav.Link className="text-white" href="#aboutus">About us</Nav.Link>
                </Nav>
                <Button className="me-2" variant="outline-light" onClick={() => setModalShowSignup(true)}>
                  Join us
                </Button>
                <ModalSignup show={modalShowSignup} onHide={() => setModalShowSignup(false)}/>

                <Button variant="outline-light" onClick={() => setModalShowSignin(true)}>
                  Sign in
                </Button>
                <ModalSignin show={modalShowSignin} onHide={() => setModalShowSignin(false)}/>
                <Nav.Link className="p-2 text-white" href="#action2" onClick={createWarning}><CreateIcon/></Nav.Link>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            
          </Container>
        </Navbar>
      ))}
    </>
  );}


  if(userLogin){
    return (
      <>
        {['sm'].map((expand) => (
          <Navbar expand="sm" fixed="top" style={{ transition: '1s ease',backgroundColor: navBackground ? 'black' : 'transparent'}}>
            <Container fluid>
              <Navbar.Brand  href="/" className="text-white"><img src={logo} style={{height:'46px',paddingLeft:'4rem'}}/></Navbar.Brand>
              <Navbar.Toggle className="bg-light" style={{opacity:'0.5'}} aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas className="bg-dark"
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="text-white">
                    Univ E-learning
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='offcanvas-border-color-202020'>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link className="text-white" href="#home">Home</Nav.Link>
                    <Nav.Link className="text-white" href="#category">Category</Nav.Link>
                    <Nav.Link className="text-white" href="#aboutus">About us</Nav.Link>
                    <DropdownButton
                      variant="outline-light"
                      title={userLogin}
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item href="/profile" to='/profile'>Profile</Dropdown.Item>
                      <Dropdown.Item href="#" to='/' onClick={logout}>Logout</Dropdown.Item>
                    </DropdownButton>
                    <Nav.Link className="text-white" href="#action2" onClick={create}>

                        <CreateIcon/>

                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
              
            </Container>
          </Navbar>
        ))}
      </>
    );}
}

export default NavbarScroll;