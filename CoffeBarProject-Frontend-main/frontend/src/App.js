import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from "react";

import CoffeesList from './components/CoffeesList';
import Login from "./components/Login";
import Logout from "./components/Logout";
import LandingPage from './components/LandingPage';
import Order from './components/Order';
import NewOrder from './components/NewOrder';
import Coffee from "./components/Coffee";
import AddReview from "./components/AddReview";

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Navbar bg='dark' expand='lg' sticky='top' variant='dark'>
        <Container className='container-fluid'>
          <Navbar.Brand className='brand' href='/'>
            <img src='/images/logo.png' alt='movies logo' className='moviesLogo' />
            Coffee Bar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to={'/coffees'}>
                Menu
              </Nav.Link>
            </Nav>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to={'/orders'}>
                Create New Order
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          { user ? (
                  <Logout setUser={setUser}/>
                ) : (
                  <Login setUser={setUser}/>
                )
          }
        </Container>
      </Navbar>

        <Routes>
          <Route exact path={'/'} element={
          <LandingPage 
            user={ user }
            />
          } />
          <Route path={'/coffees'} element={<CoffeesList />} />
          <Route path={'/coffees/:id/'} element={<Coffee user={user} />} />
          <Route path={'/coffees/:id/review'} element={<AddReview user={user} />} />
          <Route path={'/orders'} element={<Order
            user={ user }
            />
          } />
          <Route path={'/neworders'} element={<NewOrder
            user={ user }
            />
          } />
          
        </Routes>
    </div >
    </GoogleOAuthProvider>
  );
}

 export default App;

