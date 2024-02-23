import React from 'react'
import { useContext } from 'react';



import { WishlistItem } from './WishlistItem';
import { MainHeader } from '../Home/MainHeader';
import { Shopcontext } from '../context/ShopContext';


export const Wishlist = () => {
    const {wishlist,products} =useContext(Shopcontext);
  return (
    <>
    <MainHeader/>
    <div className='cart'>
    <div>
    <h1>Your WishList Items</h1>
    </div>
    <div className="cart">{products.map((product)=>{
        if(wishlist[product.id]!==0){
return (<WishlistItem key={product.id} data={product} />);
        }
    })}
    </div> </div>
    </>
  )
}
