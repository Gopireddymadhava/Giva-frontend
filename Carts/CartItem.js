import React, { useContext } from 'react'


import axios from 'axios';
import { Button } from 'reactstrap';
import './Cart.css'

import { Shopcontext } from '../context/ShopContext';
export const CartItem = (props) => {
  const { id, productName, price, productimage } = props.data;
  const { cartItems, addToCart1, removeFromCart, updateCartItemCount, wishlist, addToWishlist } =
    useContext(Shopcontext);
  const cartItemAmount = cartItems[id];


  

  return (


    <div className="cartItems">

      <img src={props.data.imageUrl} />
      <div className="description">
        <p>
          <b>{props.data.name}</b></p>
        <p> Price: ₹{props.data.price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)} />
          <button onClick={() => addToCart1(id)}>+</button>
        </div>
        <br />
        <div>
          <Button color="info" outline onClick={() => { addToWishlist(id) }}>Move to Wishlist</Button>&nbsp;&nbsp;
          <Button color="info" outline onClick={() => removeFromCart(id)}>Remove</Button>
        </div>

      </div></div>
  )
}
