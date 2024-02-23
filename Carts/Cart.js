import React, { useContext } from 'react'


import './Cart.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { CartItem } from './CartItem';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Shopcontext } from '../context/ShopContext';
import { MainHeader } from '../Home/MainHeader';

export const Cart = () => {
    const {cartItems,getTotalAmount,products,checkout} =useContext(Shopcontext);
    const totalamount=getTotalAmount();
    const navigate=useNavigate();
  
  
  return (

    <div>
    <MainHeader/>
    <div className="cart">
    
    <div>
    <h1>Your Cart Items</h1>
    </div>
    <div className="cart">{products.map((product)=>{
        if(cartItems[product.id]!==0){
return (<CartItem key={product.id} data={product} />);
        }
    })}
    </div> 
    {totalamount >0 ?(
    <div className="checkout">
   
    
    <p>Subtotal:${totalamount}</p>
    <button onClick={()=>navigate("/")}>Continue Shopping</button>
    <button onClick={()=>{
    
        navigate("/checkout", { cartItems, products })}}
    >
    {" "}Checkout{" "}</button>
    </div>
    ):(
<h1>Your Shopping Cart is Empty</h1>
    )}
    </div></div>
  )
}
