import React, { useContext } from 'react'
import { Shopcontext } from '../context/ShopContext';
import "./Product.css"
import { Input } from 'reactstrap';
import { Col, Row } from 'react-bootstrap';


import { MainHeader } from '../Home/MainHeader';
import { useNavigate } from 'react-router-dom';
export const Product = ({prod}) => {
    const {addToCart,cartItems,products,checkout}=useContext(Shopcontext);
 const cartItemAmount=  cartItems[prod.id];
 const navigate=useNavigate("");
  return (<>
    <MainHeader/>
    <div className="prod">
    

    <img src={prod.imageUrl}/>

    <div className="desc">
    <p><b>{prod.name}</b></p>
    <p>Price : ₹{prod.price}</p>
    <p className='text1'>Estimated Delivery Time</p>

    <Input type="text" placeholder="Enter pincode" style={{height:"50px",width:"500px"}}></Input>
    <br/>
<Row >
   <Col xs={1}><Input type="checkbox" className='checkbox' ></Input></Col> 
   <Col  style={{textAlign:'left'}}><span><h6>Add gift wrap to your order($50)</h6></span></Col> 
    </Row>
    <button className='addToCartBttn1' onClick={()=>addToCart(prod.id,cartItemAmount)} > Add To Cart { cartItemAmount >0 && <>({cartItemAmount}) </> }
    </button> 
    <button   onClick={()=>{
      addToCart(prod.id,cartItemAmount)
        navigate("/checkout", { cartItems, products })}} className="buynow" >Buy Now</button><br/>
    
    </div></div></>

  )
}
