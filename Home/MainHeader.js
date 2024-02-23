import React, { useState } from 'react'

import './Header.css';
import { FaSearch, FaStore } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Badge, Col, Nav, Row } from 'reactstrap';

import axios from 'axios';

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { Card } from 'react-bootstrap';
import { Header1 } from './Header1';
import { Shopcontext } from '../context/ShopContext';

export const MainHeader = () => {
    const [query, setQuery] = useState('');
  const navigate = useNavigate()
  const { searchResults, setSearchResults } = useContext(Shopcontext)
  const [showDropdown, setShowDropdown] = useState(false)

  // const {searchResults, setSearchResults} = useContext(Shopcontext)
  const handleSearch =async () => {
    try {
       await axios.get(`http://localhost:8080/products/search/${query}`)
     
        .then((response) => {
          setSearchResults(response.data);
          setShowDropdown(true)
          console.log(searchResults)
        
        }
        )

    } catch (error) {
      console.error('Error fetching search results:', error)
      
    }
  };
  const handleItemClick = (product) => {
    navigate(`/products/getproduct/${product.id}`);
    setShowDropdown(false); 
  };




  return (
    <div >
    <header className="header" style={{backgroundColor:"lightpink"}}>
      <div className="logo" >
<Link to="/">
        <img src="/Giva_logo-removebg-preview.png" alt="Logo" /></Link>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search..." value={query}
          onChange={(e) => {
            
            const inputValue = e.target.value;
            setQuery(inputValue);

            if (inputValue !== '') {
              handleSearch();
            }

            }}
          onFocus={() => setShowDropdown(true)
          } />
        <button className='button'>
          <FaSearch />
        </button>

      </div>




      <div className="icons" style={{ display: 'flex' }}>
        <div className='ml-5'><Link to="/stores"><FaStore /></Link>
          <br />
          <small>Stores</small></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className='mr-5'><Link to="/login"><RiAccountCircleLine /></Link><br />
          <small>Account</small>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div ><Link to="/wishlist"><FaHeart /></Link>
          <br />
          <small>Wishlist</small>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div><Link to="/cart"><FaShoppingCart /><Badge></Badge>
        </Link>
          <br />
          <small>Cart</small>
        </div>
      </div>
    </header>
    
  
  {showDropdown && (
    <div className="search-result">
      {searchResults.length === 0 ? (
        <p>No products found</p>
      ) : (
        <p>
        {searchResults.map((product) => (
          <p key={product.id} onClick={() => handleItemClick(product)}>
          
            <Card>
            <Row>
            <Col md={4}>
              <Card.Img src={product.imageUrl} alt={product.name} style={{ width: "200px", height: "80px" }}></Card.Img></Col>

              <Col md={5}>   <Card.Text>
                <p style={{ fontSize: "17px",marginTop:"25px",color:"brown" }}>{product.name}</p></Card.Text></Col>
                <Col md={3}> <Card.Text> <p style={{ fontSize: "15px" ,marginTop:"30px",color:"black"}}>Price: ${product.price}</p>
              </Card.Text></Col>
              </Row>
            </Card>
           
          </p>
        ))}
        </p>
      )}
    </div>
  )}
  <Header1 />
  
</div>
          
    
  )
}
