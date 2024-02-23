import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Image, Table } from 'react-bootstrap';
 import { MainHeader } from '../Home/MainHeader';
export const OrderHistory = () => {

    const [orderItems, setOrderItems] = useState([]);

  const fetchOrderItems = async (userId) => {
    try {
        
      const response = await axios.get(`http://localhost:8080/getOrders/${userId}`);
      setOrderItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  useEffect(() => {
    
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      fetchOrderItems(userId);
    }
  }, []);
  return (
    <>
    <MainHeader/>
    <div>
    
    <h2 style={{marginTop:"20px"}}>Order History</h2>
    
    <Table striped bordered hover variant="dark" style={{width:"50%",height:"300px",textAlign:"center",marginLeft:"300px"}}>
    <thead><tr><th>Product</th>
    <th>Name</th>
    <th>Quantity</th></tr>
    </thead>
    {orderItems && orderItems.length > 0 ? (
      orderItems.map((orderItem) => (
        
       <tbody key={orderItem.id}>
        <tr><td>
          <Image src={orderItem.imageUrl} style={{width:"100px",height:"60px"}}/></td>
          <td ><p style={{marginTop:"20px"}}> {orderItem.name}</p></td>
          <td><p style={{marginTop:"20px"}}> {orderItem.quantity}</p></td></tr>
       </tbody>
       
      ))
    ) : (
      <p>No order items available.</p>
    )}</Table>
  
    </div>
    </>
  )
}
