import React from 'react'
import { useContext } from 'react';


import axios from 'axios';
import { Shopcontext } from '../context/ShopContext';
import "./Shop.css"
export const Product = (props) => {
    const {id,productName,price,productimage}=props.data;
const {addToCart,cartItems}=useContext(Shopcontext);
 const cartItemAmount=  cartItems[id];



 
return (
    <div className="product2">
    <img src={props.data.imageUrl}/>
    <div className="description2">
    <p><b>{props.data.name}</b></p>
    <p>Price :₹{props.data.price}</p>
    </div>
    <button className='addToCartBttn' onClick={()=>addToCart(id,cartItemAmount)} > Add To Cart { cartItemAmount >0 && <>({cartItemAmount}) </> }
    </button> </div>
  )
}
