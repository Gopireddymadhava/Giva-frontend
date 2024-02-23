import React, { useContext } from 'react'
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Shopcontext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const Order = () => {
    
    const navigate=useNavigate()
    const location = useLocation();
    const selectedAddress = location.state?.selectedAddress;
    const updatedTotalAmount=location.state?.updatedTotalAmount;
    const selectedpayment=location.state?.selectedpayment;
  
const [address,setaddress]=useState([]);
const [payment,setpayment]=useState([])
const {cartItems,products,clearItems}=useContext(Shopcontext);
console.log(selectedAddress)
console.log('updatedtotalamount',updatedTotalAmount)
useEffect(() => {

    const fetchAddress = async () => {
      try {
        const response = await 
          fetch(`http://localhost:8080/getaddress/${selectedAddress}`
          );
        

        if (response.ok) {
          const address1 = await response.json();
          setaddress(address1);
          console.log(address1)
        } else {
          console.error('Failed to fetch  address');
        }
      } catch (error) {
        console.error('Error fetching user addresses:', error);
      }
    };

    fetchAddress();
  }, [selectedAddress]);
  useEffect(() => {

    const fetchpayment = async () => {
      try {
        const response = await 
          fetch(`http://localhost:8080/getpayment/${selectedpayment}`
          );
        

        if (response.ok) {
          const payment = await response.json();
          setpayment(payment);
          console.log(payment)
        } else {
          console.error('Failed to fetch  payment');
        }
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };

    fetchpayment();
  }, [selectedpayment]);

  console.log(payment);

  const button=()=>{
clearItems();
    navigate("/OrderSummary");
  }
  return (
    <div>
    <Container>
    <Row>
    <Col md={7} style={{borderRight:"1px solid black"}}>
    <img src="/Giva_logo-removebg-preview.png" style={{width:"100px",height:"40px",marginTop:"100px", marginRight:"500px"}}/>
     
   
    <Card style={{textAlign:"left",marginTop:"20px"}}>
    
    <CardBody>
    <CardSubtitle>Your Order is Confirmed</CardSubtitle>
    <CardText>You’ll receive a confirmation email with your order number shortly.</CardText>
    </CardBody>
    </Card>


        
            <Card style={{marginTop:"20px",textAlign:"left"}}>
            <Row>
            <Col md={6}>
            <CardBody>
            <CardTitle>Order Details</CardTitle></CardBody>
            <CardBody><CardSubtitle>Contact Information</CardSubtitle>
            <CardText>{window.localStorage.getItem('email')}</CardText></CardBody>
           <CardBody> <CardSubtitle>Shipping Address</CardSubtitle>
           
                <CardText>{address.firstname} {address.lastname}</CardText>
                <CardText>{address.street}</CardText>
                <CardText>{address.zipcode} ,{address.city} ,{address.state}</CardText>
                <CardText>{address.country}</CardText>
                <CardText>{address.phnumber}</CardText>
                </CardBody>
                <CardBody>
            <CardSubtitle>Shipping Method</CardSubtitle>
            <CardText>Standard shipping (Free)</CardText>
        
            
            </CardBody>
            
            </Col>
            <Col md={6}>
            
            
            <CardBody>
            <CardSubtitle>
            Payment Method</CardSubtitle>
            <CardText>{payment.payment_type}</CardText></CardBody><br/>
            <CardBody>
            <CardSubtitle>Billing Address</CardSubtitle>
           
                <CardText>{address.firstname} {address.lastname}</CardText>
                <CardText>{address.street}</CardText>
                <CardText>{address.zipcode}, {address.city} ,{address.state}</CardText>
                <CardText>{address.country}</CardText>
                <CardText>{address.phnumber}</CardText>
            </CardBody>
            </Col></Row>
        
            </Card>
       
           
    </Col>
<Col md={5}>
<Row>
    {products.map((product) => {


        if (cartItems[product.id] !== 0) {
          return (
            <Col md={12} key={product.id}>
             <Row style={{marginTop:"150px"}}> <Col md={4} ><img src={product.imageUrl} style={{ width: '100px', height: '70px', borderRadius: '4px' }} alt={product.name} /></Col>
              <Col md={4} style={{marginTop:"0px"}}><p>{product.name}</p></Col>
              <Col md={4} style={{marginTop:"20px"}}><p>₹{product.price}</p></Col></Row>
              </Col>
              );
            }
            return null;
          })}
          </Row>
              <hr/>
              <Row style={{textAlign:"left"}}>
              <Col md={10} > <p>SubTotal : </p></Col ><Col md={2}><p>₹{updatedTotalAmount}</p>
              </Col>
            </Row>
            
            <Row style={{textAlign:"left"}}>
              <Col md={10} > <p>Shipping : </p></Col ><Col md={2}><p>Free</p>
              </Col>
            </Row>
            <hr/>
            <Row style={{textAlign:"left"}}>
              <Col md={10} ><h5>Total :</h5></Col ><Col md={2}><p>₹{updatedTotalAmount}</p>
              </Col>
            </Row>
            <Row style={{textAlign:"left"}}>
              <Col md={12} > <p>including 41.42 in taxes</p></Col >
            </Row>
            </Col>
         
    
    </Row><Container className='flex'>
    <Button onClick={()=>{clearItems()
      navigate("/")}} style={{marginRight:"5px",marginTop:"10px",backgroundColor:"brown"}}>Continue Shopping</Button>
    <Button  color="primary" outline onClick={button} style={{marginTop:"10px",backgroundColor:"blue"}}>Order History</Button>
    </Container></Container>
    </div>
  )
}
