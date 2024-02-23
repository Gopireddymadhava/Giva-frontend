import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Shopcontext } from '../context/ShopContext';
import axios from 'axios';
import './Category.css'
import { Link, useParams } from 'react-router-dom';

import { FaHeart } from "react-icons/fa";
import { Button } from 'reactstrap';
import { MainHeader } from '../Home/MainHeader';
export const Rings = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();
    const {addToWishlist,wishlist,addToCart,cartItems}= useContext(Shopcontext);
    
    
    const cartItemAmount2= 0;

    useEffect(() => {
        
        axios.get(`http://localhost:8080/${categoryId}/products`)
            .then(response => {
                setProducts(response.data)
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [categoryId]);
    console.log(categoryId)

    
    


    return (
        <>
<MainHeader/>
            <div className='shopTitle1'>Product List</div>
            <div className='products1'>


                {Array.isArray(products) && products.map(product => (

                    <div key={product.id} className='product1' style={{ border: "1px solid black" }}>
                    <Button  style={{backgroundColor: 'transparent', border: 'none'}} onClick={()=>addToWishlist(product.id)}><FaHeart fontSize={'1.5rem'} color="lightpink" className='heart' /></Button>
                        <Link to={`/products/getproduct/${product.id}`}>
                        
                            <img src={product.imageUrl} alt={product.name} ></img>
                            <div className='description1'>
                                <p style={{color:"brown"}}><b>{product.name}</b></p>
                                <p style={{color:"brown"}}>Price: ₹{product.price}</p>
                            </div>

                            </Link>

                            <button className='addToCartBttn' onClick={()=>addToCart(product.id,cartItemAmount2)} > Add To Cart { cartItemAmount2 >0 && <>({cartItemAmount2}) </> }
    </button> 

                           
                            
                    </div> 
                ))}

            </div>
        </>
    )
}
