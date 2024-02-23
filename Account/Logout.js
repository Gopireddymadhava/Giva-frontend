import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container } from 'reactstrap'

import { MainHeader } from '../Home/MainHeader'
import { Shopcontext } from '../context/ShopContext'


export const Logout = () => {
    const navigate=useNavigate();
const {handleLogout}=useContext(Shopcontext);

    
      
    
  return (
    

    <div>
    <MainHeader/>
    <Container style={{textAlign:"left"}}>
    <br/>
    <div className='mt-6' style={{alignItems:"left"}}><h3>Account</h3></div><br/>
    <div className='mt-6'><h3>Order History</h3></div>
    <div className='mt-6'><p>you haven't placed any orders yet.</p></div><br/>
    <div className='mt-6'><p onClick={()=>handleLogout()}><Link to="login" >Logout</Link></p></div>
    </Container>

    
    </div>
  )
}
