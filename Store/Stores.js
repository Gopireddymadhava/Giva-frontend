import React from 'react'
import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle, Col, Dropdown, Row } from 'react-bootstrap'
import { Container, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useState } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { Input, Button } from 'reactstrap'
import './Stores.css';
import axios from 'axios'
import { FaLocationDot } from "react-icons/fa6";
import { MainHeader } from '../Home/MainHeader'
import { Link } from 'react-router-dom'

export const Stores = () => {



  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [storeItems, setStoreItems] = useState([]);
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  const handleStoreSelect = async (storeId, isPincodeSearch = false) => {
    try {
        setLoading(true);

        let response;

        if (isPincodeSearch) {
            response = await axios.get(`http://localhost:8080/bypincode/${pincode}`);
        } else {
            response = await axios.get(`http://localhost:8080/by-store/${storeId}`);
        }

        setStoreItems(response.data);
        setSelectedStoreId(storeId);
        setError('');
        setPincode("");
    } catch (error) {
        console.error('Error fetching store items:', error);
        setStoreItems([]);
        setSelectedStoreId('');
        setError('Error fetching store items. Please try again.');
    } finally {
        setLoading(false);
    }
};


  const handleDropdownSelect = (eventKey) => {
    setSelectedStoreId(eventKey);
    handleStoreSelect(eventKey);
  };
  

  // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4435572581565!2d77.54317037377393!3d12.879175287427765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae4196e1621f5f%3A0x9ed3199942c20229!2sGIVA%20Jewellery!5e0!3m2!1sen!2sin!4v1706003809241!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></>
 
  return (
    <>
      <MainHeader />
      <div >
        <Container className='mt-5 flex '>
          <div><center><h1>Find a store</h1></center></div><br />
          <div > <center><Dropdown data-bs-theme="light" onSelect={handleDropdownSelect}  id="dropdown-custom-components" >
            <Dropdown.Toggle style={{ width: "250px", backgroundColor: "#fff", color: "black" }}   id="dropdown-custom-components">{selectedStoreId ? `City ${selectedStoreId}` : 'Select Store'} </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item value='2' onClick={() => handleDropdownSelect('2')}  >Bengaluru</Dropdown.Item>
              <Dropdown.Item value='3' onClick={() => handleDropdownSelect('3')}>Chandigarh</Dropdown.Item>
              <Dropdown.Item value='4' onClick={() => handleDropdownSelect('4')}>Chennai</Dropdown.Item>
              <Dropdown.Item value='5' onClick={() => handleDropdownSelect('5')}>Delhi</Dropdown.Item>
              <Dropdown.Item value='6' onClick={() => handleDropdownSelect('6')}>Durgapur</Dropdown.Item>
              <Dropdown.Item value='7' onClick={() => handleDropdownSelect('7')}>Greater Noida</Dropdown.Item>
              <Dropdown.Item value='8' onClick={() => handleDropdownSelect('8')}>Gurugram</Dropdown.Item>
              <Dropdown.Item value='9' onClick={() => handleDropdownSelect('9')}>Hyderabad</Dropdown.Item>
              <Dropdown.Item value='10' onClick={() => handleDropdownSelect('10')}>Indore</Dropdown.Item>
              <Dropdown.Item value='11' onClick={() => handleDropdownSelect('11')}>Jaipur</Dropdown.Item>
              <Dropdown.Item value='12' onClick={() => handleDropdownSelect('12')}>Kolkata</Dropdown.Item>
              <Dropdown.Item value='13' onClick={() => handleDropdownSelect('13')}>Lukhnow</Dropdown.Item>
              <Dropdown.Item value='14' onClick={() => handleDropdownSelect('14')}>Ludiana</Dropdown.Item>
              <Dropdown.Item value='15' onClick={() => handleDropdownSelect('15')}>Mumbai</Dropdown.Item>
              <Dropdown.Item value='16' onClick={() => handleDropdownSelect('16')}>Noida</Dropdown.Item>
              <Dropdown.Item value='17' onClick={() => handleDropdownSelect('17')}>Pune</Dropdown.Item>
              <Dropdown.Item value='18' onClick={() => handleDropdownSelect('18')}>Secundrabad</Dropdown.Item>
              <Dropdown.Item value='19' onClick={() => handleDropdownSelect('19')}>Siliguri</Dropdown.Item>
              <Dropdown.Item value='20' onClick={() => handleDropdownSelect('20')}>Thane</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown></center></div><br />
           
          <div ><center><h5>OR</h5></center><br />
            <center><Input type="text" placeholder="Enter pincode" style={{ alignItems: "center", width: "250px" }}  value={pincode}
           onChange={(e) => setPincode(e.target.value)} /></center></div><br />
          <div>
            <Button color="warning" outline style={{ borderRadius: "4px" }}  onClick={() => handleStoreSelect('', true)}>check</Button>
          </div>

          <div style={{marginTop:"60px"}}>
            <Row>
            <Col md={5}>
           {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          
              {storeItems.map((item) => (
                <p key={item.id} >
                <Card style={{textAlign:"left"}}><CardBody>
                <CardTitle>{item.name}</CardTitle>
                
                <CardText style={{color:"pink",marginTop:"5px"}}><FaLocationDot />{item.distance}KM from Location</CardText>
                <CardSubtitle>{item.address}</CardSubtitle>
                <CardText style={{marginTop:"8px"}}>Open until 10:00PM*</CardText>
                
                <Link to={item.location}>
                <Button color="warning" outline style={{ borderRadius: '4px', marginTop: '10px',marginLeft:"50px",width:"150px" }}>
                  Navigate
                </Button>
              </Link>
              <Button color="danger" outline style={{ borderRadius: '4px', marginTop: '10px',marginLeft:"20px",width:"150px" }}>
                  Share
                </Button>
                </CardBody></Card></p>
                ))}
            
            </Col>
            <Col md={7}>
            <iframe src="https://www.google.com/maps/d/embed?mid=1BhkBcRJGWU-6cUM7ylGjVt5JGw0fu4g&ehbc=2E312F" style={{width:"100%",height:"100%"}} allowFullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </Col>
            </Row>
          </div>
          
        </Container>
        </div>
        </>
  )
}


