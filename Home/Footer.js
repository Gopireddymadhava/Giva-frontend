import React from 'react'
import { CardBody, CardSubtitle, CardText,Card, CardTitle, Col, Container } from 'react-bootstrap'
import {CardGroup, Row} from 'reactstrap'
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import {Input} from 'reactstrap'
import { FaFacebook,FaYoutube,FaLinkedin,FaApple ,FaAmazon} from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiFlipkart } from "react-icons/si";
import { SiNike } from "react-icons/si";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
export const Footer = () => {

  return (
    <div>
    <br/>
    <div className='flex' style={{backgroundColor:"pink",height:"40px",padding:"10px"}}><center><h6>Know More About Giva</h6></center></div><br/>
<div >
<CardGroup >
<Card>
<CardBody style={{textAlign:"left"}} >
<CardTitle><b>Quick lines</b></CardTitle><br/>
<CardSubtitle>Customer Reviews</CardSubtitle><br/>
<CardSubtitle>Our Blogs</CardSubtitle><br/>
<CardSubtitle>Store Locator</CardSubtitle><br/>
<CardSubtitle>Jewellery Care</CardSubtitle><br/>
<CardSubtitle>Offers & Promotions</CardSubtitle>

</CardBody></Card>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Card>
<CardBody style={{textAlign:"left"}} >
<CardTitle><b>Info</b></CardTitle><br/>
<CardSubtitle>Shipping & Returns</CardSubtitle><br/>
<CardSubtitle>Privacy Policy</CardSubtitle><br/>
<CardSubtitle>International Shipping</CardSubtitle><br/>
<CardSubtitle>FAQs & Support</CardSubtitle><br/>
<CardSubtitle> Terms of Service</CardSubtitle>

</CardBody>
</Card><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Card>
<CardBody style={{textAlign:"left"}}>
<CardTitle><b>Contact us</b></CardTitle><br/>
<CardSubtitle>BIS :HM/C -6290031216</CardSubtitle><br/>
<CardSubtitle>For any suggestions,any quiries contact us</CardSubtitle><br/>
<CardSubtitle>Indiejewel fashions Privated Lmt</CardSubtitle><br/>
<CardSubtitle>Thrid Floor,magnum vista,Raguvanahalli bengalore 560062</CardSubtitle><br/>
<CardSubtitle> -care@giva.com</CardSubtitle><br/>
<CardSubtitle> -7829556734 (10.00 AM to 6.30 PM)</CardSubtitle>

</CardBody></Card></CardGroup><br/>

</div>
<div>
<Container><p style={{textAlign:"left",fontSize:"20px"}}>Subscribe for exclusive offers and updates!</p>
<Input type="text" placeholder="Email" style={{width:"350px"}}/><br/>
<div style={{textAlign:"left"}}><Link to=""><FaFacebook style={{fontSize:"2em"}}/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to=""><IoLogoInstagram style={{fontSize:"2em"}}/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to=""><FaYoutube style={{fontSize:"2em"}}/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to=""><FaLinkedin  style={{fontSize:"2em"}}/></Link></div><br/><br/><br/>
<p style={{fontSize:"1.5em",textAlign:"left"}}>Download the Giva App</p>
<div style={{textAlign:"left"}}><Link to=""><IoLogoGooglePlaystore  style={{fontSize:"2em",textAlign:"left"}}/></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<Link to=""><FaApple  style={{fontSize:"2em",textAlign:"left"}}/></Link></div><br/>
<div style={{textAlign:"left"}}>
<p style={{fontSize:"1.5em",textAlign:"left"}}>Channel Partners</p>
<FaAmazon style={{fontSize:"2em",textAlign:"left"}} />&nbsp;&nbsp;&nbsp;&nbsp;
<SiFlipkart style={{fontSize:"1.5em",textAlign:"left"}} />&nbsp;&nbsp;&nbsp;&nbsp;
<SiNike style={{fontSize:"2em",textAlign:"left"}} />
</div><br/>


</Container>
<hr/>
<Container style={{textAlign:"left",padding:"40px"}}>
<div style={{textAlign:"left"}}><p><AiOutlineCopyrightCircle />  <small>2023,GIVA Jewellery</small></p></div>

</Container>
</div>



    </div>
  )
}