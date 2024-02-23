import React, { useContext } from 'react'

import { Product } from './Product'
import './Shop.css';

import { MainHeader } from '../Home/MainHeader';
import { Shopcontext } from '../context/ShopContext';


export const Shop = () => {
  const {products}=useContext(Shopcontext)
  return (
    <>
    <MainHeader/>
    <div>
    <div className='shopTitle'>Products</div>
<div className='products2'>{products.map((product)=>(<Product  key={product.id} data={product}/>))}</div>
    </div>
    </>
  )
}
