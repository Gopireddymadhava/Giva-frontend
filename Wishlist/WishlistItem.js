import React from 'react'


import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Shopcontext } from '../context/ShopContext';
export const WishlistItem = (props) => {

    const {id,productName,price,productimage}=props.data;
    const {wishlist,adding,deleting,updateCartItemCount1,addToCart} =useContext(Shopcontext);
    const quantity=1;
  return (
   
    <div className="cartItems">
    <img src={props.data.imageUrl}/>
    <div className="description">
    <p>
    <b>{props.data.name}</b></p>
    <p> Price: ₹{price}</p>
    
    <Button color="info" outline="true" onClick={()=>{addToCart(id,quantity)}}>Move to Cart</Button>&nbsp;&nbsp;&nbsp;
    <Button color="info" outline="true" onClick={()=>deleting(id)}>Remove</Button>
    </div>
    </div>
  )
}
