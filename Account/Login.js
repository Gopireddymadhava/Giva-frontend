import React, { useContext } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Modal } from 'react-bootstrap';
import { Row, Button, Col } from 'react-bootstrap';
import { Input } from 'reactstrap';

import { Logout } from './Logout';
import { MainHeader } from '../Home/MainHeader';
import { Shopcontext } from '../context/ShopContext';



export const Login = () => {
  const { login, password, setPassword, email, setEmail } = useContext(Shopcontext);
  const navigate = useNavigate();
  const [Email, setemail] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleForgotPassword = async () => {
    try {
      await axios.post(`http://localhost:8080/api/reset-password/${Email}`);
      
      window.localStorage.setItem('email1',Email)
      toast.success("email reset sent successfully")
      handleClose();
    } catch (error) {
      toast.error("email not sent")
    }
  };


  return (<>
    <MainHeader />
    <div className='justify-content-center align-items-center'>

      <Container className='w-full h-screen flex flex-col  mt-5 '  >

        <Row style={{ marginLeft: "370px" }} >
          <h3 style={{ textAlign: "left", fontFamily: "sans-serif", color: "black" }}  >Login</h3>

        </Row>

        <Row style={{ marginLeft: "370px", marginTop: "40px" }} >

          <Col sm={6}>

            <form>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label style={{ marginLeft: "0px" }}><h5>Email</h5></label>
                <Input type="email" class="form-control" id="email" placeholder="Enter Email"

                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}

                  style={{ height: "45px", width: "400px" }} />
              </div>
              <div class="form-group" style={{ textAlign: "left", marginTop: "10px" }}>
                <label style={{ textAlign: "left" }}><h5>Password</h5></label>
                <input type="password" class="form-control" id="password" placeholder="Enter password"

                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  style={{ height: "45px", width: "400px" }}
                />
              </div>
              <br />
              <div style={{textAlign:"left"}}><Button onClick={handleShow} style={{ alignItems: "left" ,backgroundColor:"cyan",color:"Black"}}>Forget Password ?</Button></div>
              <Modal show={show} onHide={handleClose}>
        
        <Modal.Body><input   placeholder="Enter Email"  type="email"
       
        value={Email}
        onChange={(e) => setemail(e.target.value)} style={{width:"450px",height:"45px"}}></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleForgotPassword} style={{textAlign:"center"}}>
            Submit
          </Button>
          
        </Modal.Footer>
      </Modal>
              <Container>

                <Button type="submit" color="info"  onClick={login} style={{ marginLeft: "80px" ,backgroundColor:"brown"}}>Login</Button>
                <br /><br />

                <div><Link to="/register" ><h3 style={{ color: "voilet", font: "icon", marginLeft: "80px" }}>Create a new account</h3></Link></div>
              </Container>
            </form>
          </Col>
        </Row>

      </Container>

    </div>
  </>
  )
}
