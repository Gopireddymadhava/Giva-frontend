import React from 'react'
import { Form,Row,InputGroup,Navbar,Col,Button, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'

import {Container} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Dropdown, NavDropdown } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import './Header.css'
export const Header1 = () => {
  return (
    
    <div className='flex ' style={{position:"relative"}}>
    <Navbar   >
    <div className='flex'><NavDropdown title="Shop by Category" >
    
    <NavDropdown.Item href="">All</NavDropdown.Item>
    <NavDropdown.Item href=""><Link to={`/1/products` } style={{color:"brown"}}>Rings</Link></NavDropdown.Item>
    <NavDropdown.Item href=""><Link to={`/2/products` } style={{color:"blue"}}>Earrings</Link></NavDropdown.Item>
    <NavDropdown.Item href=""><Link to={`/3/products` } style={{color:"cyan"}}>Neclaces&Pendants</Link></NavDropdown.Item>
    <NavDropdown.Item href=""><Link to={`/4/products` } style={{color:"red"}}>Braclets</Link></NavDropdown.Item>
    <NavDropdown.Item href="">Others Categories</NavDropdown.Item>
   
    </NavDropdown>
    </div>
    <div className='flex' ><NavDropdown title="Gift Store" >
    
    <NavDropdown.Item href="">Shop by Occasion</NavDropdown.Item>
    <NavDropdown.Item href="">Shop by Theme</NavDropdown.Item>
    <NavDropdown.Item href="">Shop by Receipt</NavDropdown.Item>
    <NavDropdown.Item href="">Shop by Price</NavDropdown.Item>
    </NavDropdown></div>
    <div className='flex'><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Best Of Giva</Nav.Link></Nav.Item></div>
    <div className='flex'><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">New Arrivals</Nav.Link></Nav.Item></div>
    <div className='flex'><NavDropdown title="Latest Collections" >
    
    <NavDropdown.Item href="/shop"><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Vivah Da Swag</Nav.Link></Nav.Item></NavDropdown.Item>
    <NavDropdown.Item href="/shop"><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">The Bhumi Collection</Nav.Link></Nav.Item></NavDropdown.Item>
    <NavDropdown.Item href="/shop"><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Love in Paris</Nav.Link></Nav.Item></NavDropdown.Item>
    <NavDropdown.Item href="/shop"><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Unisex Collection</Nav.Link></Nav.Item></NavDropdown.Item>
    <NavDropdown.Item href="/shop"><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Giva Signature Collection</Nav.Link></Nav.Item></NavDropdown.Item>
    <NavDropdown.Item href="/shop"><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Colour of Life Collection</Nav.Link></Nav.Item></NavDropdown.Item>
   




    </NavDropdown></div>
    <div className='flex'><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Customized Jewellery</Nav.Link></Nav.Item></div>
    <div className='flex' ><Nav.Item><Nav.Link className="NavLinkWithUnderline" href="/shop">Gold Jewellery</Nav.Link></Nav.Item></div>
    <div className='flex'><NavDropdown title="More at Giva" >
    
    <NavDropdown.Item href="">Media Mentions</NavDropdown.Item>
    <NavDropdown.Item href="">Corporate Partnerships</NavDropdown.Item>
    <NavDropdown.Item href="">Jewellery Care</NavDropdown.Item>
    <NavDropdown.Item href="">GIVA Care</NavDropdown.Item>
    <NavDropdown.Item href="">GIVA Blogs</NavDropdown.Item>
    <NavDropdown.Item href="">Support & FAQs</NavDropdown.Item>
   
    </NavDropdown></div></Navbar>
    </div>


   
  )
}
