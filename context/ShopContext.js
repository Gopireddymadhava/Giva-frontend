import React from 'react'
import { createContext, useState } from 'react';

import { Await, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';

export const Shopcontext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let i = 0; i < products.length; i++) {
    cart[products[i].id] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [wishlist, setWishlistItems] = useState({});
  const [searchResults, setSearchResults] = useState([])
  const [userId, setUserId] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [productLength, setProductLength] = useState(0);
  //code for coupons

  const [couponCode,setCouponCode]=useState('');
  const [discount,setDiscount]=useState(null);
  const [errormessage,setErrorMessage]=useState('');
  
  useEffect(() => {

    axios.get(`http://localhost:8080/products/al`)
      .then(response => {
        setProducts(response.data)
        setProductLength(response.data.length)
        setCartItems(getDefaultCart(response.data))
        setWishlistItems(getDefaultCart(response.data))
        console.log(response.data)
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);







  const getTotalAmount = () => {
    let totalamount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = products.find((product) => product.id === Number(item));
        totalamount += cartItems[item] * iteminfo.price;
      }
    }
    return totalamount;
  }


  //code for coupons

  const handleapplycoupon=async()=>{
    try{
      console.log('Coupon Code:', couponCode);
      const response=await fetch(`http://localhost:8080/applycoupon/${couponCode}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({code:couponCode}),
      });
      console.log('Response:', response)
      const coupon=await response.json();
      console.log('coupon:',coupon)
      setDiscount(coupon.discount);
      setErrorMessage("coupon applied successfully")
    }catch(error){
      setErrorMessage('Invalid Coupon code')
    }
  }

//code for add to wishlist
  const addToWishlist = async (productId) => {
    setWishlistItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    // try {

    //   const userId = window.localStorage.getItem('userId');

      
    //  const somet= await axios.post(`http://localhost:8080/createwish/${userId}`);
      
    //  const wishid=somet.data.id;
    //  const response = await axios.get(`http://localhost:8080/user/${wishid}`);
    //   const wishlistId = response.data.id;
    //   await axios.post(`http://localhost:8080/${wishlistId}/add-to-wishlist/${productId}`);
    //   console.log('Product added to the wishlist');
    //   toast.success("product added to wishlist  successfully")
    // } catch (error) {
    //   toast.error('Error adding product to the wishlist:', error);
    // }

    try {
      const userId = window.localStorage.getItem('userId');
      let wishlistId;
  
      // Check if user already has a wishlist
      const existingWishlistResponse = await axios.get(`http://localhost:8080/getwishlistbyuser/${userId}`);
      if (existingWishlistResponse.data) {
        wishlistId = existingWishlistResponse.data;
        console.log("error")
      } else {
        // If user doesn't have a wishlist, create a new one
        const newWishlistResponse = await axios.post(`http://localhost:8080/createwish/${userId}`);
        wishlistId = newWishlistResponse.data.id;
      }
  
      // Add item to the wishlist
      await axios.post(`http://localhost:8080/${wishlistId}/add-to-wishlist/${productId}`);
      
      console.log('Product added to the wishlist');
      toast.success("Product added to wishlist successfully");
    } catch (error) {
      toast.error('Error adding product to the wishlist:', error);
    }

  };
  
  const addToCart1 = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }))
  }

  const adding = (id) => {
    setWishlistItems((prev) => ({ ...prev, [id]: prev[id] + 1 }))
  }
  const deleting = async (productId) => {
    setWishlistItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }))
    try {
      await axios.delete(`http://localhost:8080/wish/remove/${productId}`)
      console.log('Item removed from the wishlist');
      toast.success("item removed successfully");


    } catch (error) {
      toast.error('Error removing item from the cart:', error);
    }

  }
  const updateCartItemCount1 = (newAmount, itemId) => {
    setWishlistItems((prev) => ({ ...prev, [itemId]: newAmount }))
  }








  const addToCart = async (productId, quantity) => {


    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }))

   
      try {
        const userId = window.localStorage.getItem('userId');
        let cartId;
    
        // Check if user already has a cart
        const existingCartResponse = await axios.get(`http://localhost:8080/carts/getcartbyuser/${userId}`);
        if (existingCartResponse.data) {
          cartId = existingCartResponse.data;
        } else {
          // If user doesn't have a cart, create a new one
          const newCartResponse = await axios.post(`http://localhost:8080/carts/createcart/${userId}`);
          cartId = newCartResponse.data.id;
        }
    
        // Add item to the cart
        await axios.post(`http://localhost:8080/carts/${cartId}/add-to-cart/${productId}/${quantity}`);
        
        console.log('Product added to the cart');
        toast.success("Product added to cart successfully");
      } catch (error) {
        toast.error('Error adding product to the cart:', error);
      }
    }
    
  const removeFromCart = (productId) => {
    setCartItems((x) => ({ ...x, [productId]: x[productId] - 1 }))




    try {
      axios.delete(`http://localhost:8080/carts/remove/${productId}`)
      console.log('Item removed from the cart');
      toast.success("item removed successfully");


    } catch (error) {
      toast.error('Error removing item from the cart:', error);
    }

  }
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
  }

  const checkout = (productId,quantity) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
  }




  const userDetails = {
    email: email,
    password: password,
  }
  const   login=async(event) =>{
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/login", {

        email: email,
        password: password,
      }).then((res) => {
        console.log(res.data);


        if (res.data.message == "Email not exits") {

          toast.error("Email not exists");
        }
        else if (res.data.message == "Login Success") {
          setUserId(res.data.userId);
          console.log(res.data)
          window.localStorage.setItem('userId', res.data.userId)

          window.localStorage.setItem('user_data', JSON.stringify(userDetails))
window.localStorage.setItem('email',userDetails.email)
          toast.success("login successfully")
          console.log("login successfully")
          window.location.href = '/logout'

        }
        else {
          toast.error("Incorrect Email and Password not match");
        }
      }, fail => {
        console.error(fail); 
      });
    }

    catch (err) {
      alert(err);
    }

  }

  const handleLogout = () => {

    localStorage.removeItem('user_data');
    localStorage.removeItem('userId');
    localStorage.removeItem("email");
localStorage.removeItem("email1");

    window.location.href = '/';
  };

 const clearItems=()=>{
  setCartItems(getDefaultCart(products))
 }

  


        

          
    








  const contextValue = { cartItems,clearItems,discount,cartItems,setDiscount,handleapplycoupon,couponCode,setCouponCode, userDetails, handleLogout, email, setEmail, password, setPassword, login, products, userId, setUserId, adding, deleting, updateCartItemCount1, addToCart, addToCart1, removeFromCart, updateCartItemCount, getTotalAmount, checkout, wishlist, addToWishlist, searchResults, setSearchResults }
  console.log(cartItems);
  return (
    <Shopcontext.Provider value={contextValue} >
      {props.children}
    </Shopcontext.Provider>

  )
  
}


