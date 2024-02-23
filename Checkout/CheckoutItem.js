import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import { Card, CardBody, CardText, CardTitle, Col, Container, DropdownItem, DropdownToggle } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import './Checkout.css';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import { Container, Navbar } from 'react-bootstrap'
import { RadioGroup, Radio, Form } from 'rsuite';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Input } from 'reactstrap';
import { Shopcontext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Order } from './Order';


export const CheckoutItem = () => {
  const [orderDetails, setOrderDetails] = useState({

  });
  const { getTotalAmount, couponCode, clearItems, setDiscount, products, setCouponCode, discount, cartItems, handleapplycoupon } = useContext(Shopcontext);
  const totalamount1 = getTotalAmount();
  const [customerEmail, setCustomerEmail] = useState('');

  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [payments, setpayments] = useState([]);

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [updatedTotalAmount, setUpdatedTotalAmount] = useState(getTotalAmount());
  const [selectedpayment, setpayment] = useState(null);
  const navigate = useNavigate();


  const [address, setAddress] = useState({
    country: '',
    firstname: '',
    lastname: '',
    city: '',
    state: '',
    street: '',
    phnumber: '',
    zipcode: ''

  });

  const handleAddressChange = (field, value) => {
    setAddress({
      ...address,
      [field]: value,
    });
  };

  const handleAddressSubmit = async () => {

    try {
      const response = await fetch(`http://localhost:8080/saveaddress/` + window.localStorage.getItem('userId'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(address),
      });
      console.log(window.localStorage.getItem("userId"));
      if (response.ok) {
        console.log('Address saved successfully');
        toast.success("Address saved successfully")
fetchUserAddresses();
handleAddressChange('country','')
handleAddressChange('street','')
      } else {
        console.error('Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }

  };




  const fetchUserAddresses = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getaddresses/${window.localStorage.getItem('userId')}`
      );

      if (response.ok) {
        const addresses = await response.json();
        setUserAddresses(addresses);
      } else {
        console.error('Failed to fetch user addresses');
      }
    } catch (error) {
      console.error('Error fetching user addresses:', error);
    }

  };

  useEffect(() => {
    fetchUserAddresses();
  }, [])


  useEffect(() => {

    const fetchpayments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getpayments`
        );

        if (response.ok) {
          const payments = await response.json();
          setpayments(payments);
          console.log(payments);
        } else {
          console.error('Failed to fetch payments');
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchpayments();
  }, [selectedpayment]);

  const handleAddressRadioChange = (addressId) => {
    setSelectedAddress(addressId);
  };
  const handlePaymentRadioChange = (paymentId) => {
    setpayment(paymentId);
  }

  const handleDiscountItemClick = (discountCode) => {
    setSelectedCoupon(discountCode);
  };
  const updateDiscountedPrice = (appliedCoupon) => {
    const discountAmount = getDiscountAmount(appliedCoupon);
    handleapplycoupon(appliedCoupon);
  };
  //
  const getDiscountAmount = (appliedCoupon) => {
    const discountMappings = {
      SUPER300: 300,
      MEGA500: 500,
      NEWUSER: 250,

    };


    if (discountMappings.hasOwnProperty(appliedCoupon)) {
      return discountMappings[appliedCoupon];
    }


    return 0;
  };
  console.log(selectedAddress)
  const applyDiscount = () => {
    const discountAmount = getDiscountAmount(selectedCoupon || couponCode);
    const originalPrice = getTotalAmount();


    setDiscount(discountAmount);


    const discountedPrice = originalPrice - discountAmount;


    setUpdatedTotalAmount(discountedPrice);
    setSelectedCoupon("");


    const priceDifference = originalPrice - discountedPrice;
    console.log(`Discount Applied: -$${discountAmount}`);
    console.log(`Price Difference: $${priceDifference}`);
  };
  useEffect(() => {
    setUpdatedTotalAmount(getTotalAmount() - discount);
  }, [getTotalAmount, discount]);


  // const makePayment = async () => {
  //   const response3 = await axios.post(`http://localhost:8080/create_order/${updatedTotalAmount}`)
  //   if (response3.status == "created") {
  //     let options = {
  //       key: 'rzp_test_4Gezio5U8ANmRO',
  //       amount: updatedTotalAmount,
  //       currency: "INR",
  //       name: "Giva Manager",
  //       description: "Giva Jewellery",
  //       image: 'https://th.bing.com/th?id=OIP.aeHvnFKyesLUoES72tc1owHaEc&w=322&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
  //       order_id: response3.id,
  //       handler: function (response3) {
  //         console.log(response3.razorpay_payment_id)
  //         console.log(response3.razorpay_order_id)
  //         console.log(response3.razorpay_signature)
  //       },
  //       prefill: {
  //         "name": "Madhava Gopireddy",
  //         "email": "gopireddym2001@gmail.com",
  //         "contact": "6303299877"
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Lmt"
  //       },
  //       theme: {
  //         color: "#3399cc"
  //       },
  //     };
  //     let rzp = new Razorpay(options);
  //     rzp.on('payment.failed', function (response3) {
  //       console.log(response3.error.code);
  //       console.log(response3.error.description);
  //       console.log(response3.error.source);
  //       console.log(response3.error.step);
  //       console.log(response3.error.reason);
  //       console.log(response3.error.metadata.order_id);
  //       console.log(response3.error.metadata.payment_id);
  //       alert("oops payment failed")
  //     });
  //     rzp.open();

  //   } else {
  //     console.log("error")
  //   }

  // }
  // function loadScript(src) {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // }

  //   const makePayment=()=>{
  //     const response3 =  axios.post(`http://localhost:8080/create_order/${updatedTotalAmount}`)
  //      if (response3.status == 200){
  // console.log(response3);
  // alert("successfully")
  //   }else{
  //     console.log("error ")
  //   }
  //   }
  // async function makePayment() {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   const result = await axios.post(`http://localhost:8080/create_order/${updatedTotalAmount}`);

  //   if (!result) {
  //     alert("Server error. Are you online?");
  //     return;
  //   }

  //   const { amount, id: order_id, currency } = result.data;

  //   const options = {
  //     key: "rzp_test_4Gezio5U8ANmRO", // Enter the Key ID generated from the Dashboard
  //     amount: updatedTotalAmount.toString(),
  //     currency: "INR",
  //     name: "Soumya Corp.",
  //     description: "Test Transaction",
  //     // image: { logo },
  //     order_id: result.id,
  //     handler: async function (response) {
  //       const data = {
  //         orderCreationId: result.id,
  //         razorpayPaymentId: response.razorpay_payment_id,
  //         razorpayOrderId: response.razorpay_order_id,
  //         razorpaySignature: response.razorpay_signature,
  //       };

  //       // const result = await axios.post("http://localhost:5000/payment/success", data);

  //       alert(result.data.msg);
  //     },
  //     prefill: {
  //       name: "Soumya Dey",
  //       email: "SoumyaDey@example.com",
  //       contact: "9999999999",
  //     },
  //     notes: {
  //       address: "Soumya Dey Corporate Office",
  //     },
  //     theme: {
  //       color: "#61dafb",
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }




  const handlePlaceOrder = async () => {
    try {
      const response1 = await axios.get(`http://localhost:8080/carts/getcartbyuser/` + window.localStorage.getItem('userId'));
      const cartId = response1.data;

      const orderItems1 = products
        .filter(product => cartItems[product.id] !== 0)
        .map(product => ({
          productId: product.id,
          quantity: cartItems[product.id],
          name: product.name,
          imageUrl: product.imageUrl,
          productprice: product.price,


        }));


      const orderItems = products
        .filter(product => cartItems[product.id] !== 0)
        .map(product => ({
          productId: product.id,
          quantity: cartItems[product.id],



        }));




      const userId = window.localStorage.getItem('userId')
      const response2 = await axios.post(`http://localhost:8080/placeOrder/${userId}/${selectedAddress}/${cartId}/${updatedTotalAmount}/${selectedpayment}`, orderItems1

      );

      console.log('selectedpayment', selectedpayment);
      console.log(customerEmail)


      if (response2.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });


        const email = window.localStorage.getItem('email')
        axios.post(`http://localhost:8080/send-email/${email}/${updatedTotalAmount}`, orderItems1)
          .then(response => {
            alert('Email sent successfully.');
            console.log("email sent successfully")
          })
          .catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
          });


        orderItems.map((item) => {
          axios.delete(`http://localhost:8080/carts/remove/${item.productId}`)
          console.log('item', item.productId)
        })



        setTimeout(() => {
          navigate("/Order", { state: { selectedAddress, updatedTotalAmount, selectedpayment } });
        }, 1500);
      } else {
        console.error('Failed to place the order');

      }
    } catch (error) {
      console.error('Error placing the order:', error);
      console.log(customerEmail)

    }
  };





  return (
    <div>
      <header className="header" style={{
        height: "100px",
        justifyContent: "space-between",
        borderBottom: "1px solid black"
      }} >
        <div style={{ alignItems: "left", paddingLeft: "150px" }}  >
          <Link to="/">
            <img src="Giva_logo-removebg-preview.png" style={{ width: '100px', height: "50px" }} /></Link>
        </div>
        <div style={{ paddingRight: "100px" }}>
          <Link to="/shop"><MdOutlineShoppingBag style={{ fontSize: "1.5em" }} /></Link>
        </div>
      </header><br />
      <Container style={{ textAlign: "left" }} className='container'>
        <Row >
          <Col md={7}>
            <div>
              <p style={{ fontSize: "20px", textAlign: "left" }}>Apply Discount Code</p>
            </div>
            <div className='flex' style={{ display: "inline-flex" }}>
              <Input type="text" placeholder="Discount code" value={selectedCoupon || couponCode} style={{ width: "500px", height: "50px" }} />&nbsp;&nbsp;&nbsp;
              <button onClick={applyDiscount} style={{ backgroundColor: "pink", height: "50px", width: "80px", borderRadius: "4px" }}>Apply</button>
            </div>
            <br /><br />
            <div>
              <Dropdown>
                <Dropdown.Toggle>All coupons</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDiscountItemClick('SUPER300')}>SUPER300</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDiscountItemClick('MEGA500')}>MEGA500</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDiscountItemClick('NEWUSER')}>NEWUSER</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown></div><br />
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: '30px' }}>Contact </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <p style={{ textAlign: "center" }}>Have an account? <Link to="/login">Log in</Link></p></div>
            <div>
              <Input type="text" placeholder="Email" style={{ width: "600px", height: "50px" }} value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)} />
            </div>
            <br />
            <div style={{ display: "inline-flex" }}>
              <Input type="checkbox" style={{ width: "20px", height: "20px" }} />&nbsp;&nbsp;&nbsp;&nbsp;<p>Notify  me  for  orders , updates  and  offers.</p>
            </div>
            <div>
              <p style={{ fontSize: "30px" }}>Delivery</p>
            </div>
            <div >
              <Input type="text" placeholder="Country/Region" style={{ width: "600px", height: "50px" }} value={address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
              />
            </div>
            <br />
            <div style={{ display: "inline-flex" }}>
              <Input type="text" placeholder="Firstname" style={{ width: "290px", height: "50px" }} value={address.firstname}
                onChange={(e) => handleAddressChange('firstname', e.target.value)}></Input>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Input type="text" placeholder="Lastname" style={{ width: "290px", height: "50px" }} value={address.lastname}
                onChange={(e) => handleAddressChange('lastname', e.target.value)}></Input></div><br /><br />
            <div >
              <Input type="text" placeholder="Street" style={{ width: "600px", height: "50px" }} value={address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)} />
            </div>
            <br />
            <div style={{ display: "inline-flex" }}>
              <Input type="text" placeholder="City" style={{ width: "190px", height: "50px" }} value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}></Input>&nbsp;&nbsp;&nbsp;<Input type="text" placeholder="State" style={{ width: "190px", height: "50px" }} value={address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}></Input>&nbsp;&nbsp;&nbsp;
              <Input type="text" placeholder="pincode" style={{ width: "190px", height: "50px" }} value={address.zipcode}
                onChange={(e) => handleAddressChange('zipcode', e.target.value)}></Input></div><br /><br />
            <div >
              <Input type="text" placeholder="Phone" style={{ width: "600px", height: "50px" }} value={address.phnumber} onChange={(e) => handleAddressChange('phnumber', e.target.value)} /></div><br />
            <div style={{ display: "inline-flex" }}>
              <button type="reset" onClick={handleAddressSubmit} style={{ backgroundColor: "cyan", borderRadius: "7px" }} >Save Address</button>&nbsp;&nbsp;&nbsp;&nbsp;
              <p>save  this  information  for  next time </p>
            </div>
            <br />
            <div>
              <p style={{ fontSize: "30px" }}>Shipping method</p>
            </div>
            <div >
              <Form.Group controlId="addressRadioList">
                <RadioGroup
                  name="addressRadioList"
                  value={selectedAddress}
                  onChange={handleAddressRadioChange}
                >
                  {userAddresses.map((address) => (
                    <div key={address.id} className='radio'>
                      <Radio value={address.id} style={{ marginLeft: "10px", marginTop: "12px" }}></Radio>
                      <p style={{ textAlign: 'left', marginLeft: '20px', marginTop: '2px' }}>
                        {address.firstname}  {address.lastname}, {address.street}, {address.city}, {address.state}, {address.zipcode},{address.country},{address.phnumber}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
              </Form.Group></div><br />
            <div><p style={{ fontSize: "30px" }}>Payment</p></div>
            <p>All transactions are secure and encrypted</p><br />

            <div>
              <Form.Group controlId="radioList">
                <RadioGroup name="radioList" value={selectedpayment} onChange={handlePaymentRadioChange}>
                  {payments.map((address) => (
                    <div key={address.id} className='radio'>
                      <Radio value={address.id} style={{ marginLeft: "10px", marginTop: "12px" }}></Radio>
                      <p style={{ textAlign: 'left', marginLeft: '20px', marginTop: '10px' }}>
                        {address.payment_type}
                      </p>
                    </div>
                  ))}
                </RadioGroup>
              </Form.Group>
              <br />

              <Button className='button1' outline onClick={handlePlaceOrder}>Complete Order</Button>
            </div>
          </Col>
          <Col md={5}>


            <Row>

              {products.map((product) => {


                if (cartItems[product.id] !== 0) {
                  return (
                    <Col md={12} key={product.id}>
                      <Row style={{ marginTop: "80px" }}> <Col md={4} ><img src={product.imageUrl} style={{ width: '100px', height: '70px', borderRadius: '4px' }} alt={product.name} /></Col>
                        <Col md={4} style={{ marginTop: "0px" }}><p>{product.name}</p></Col>
                        <Col md={4} style={{ marginTop: "20px" }}><p>₹{product.price}</p></Col></Row>
                    </Col>
                  );
                }
                return null;
              })}
            </Row>
            <br />

            <Row>
              <Col md={10} ><input type="text" placeholder="Enter the Coupon Code" value={couponCode} id="couponCode" onChange={(e) => setCouponCode(e.target.value)} style={{ height: "50px", width: "380px" }}></input></Col >
              <Col md={2}><button onClick={handleapplycoupon} style={{ height: "50px", backgroundColor: "pink", borderRadius: "4px" }}>Apply</button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={10} > <p>SubTotal : </p></Col ><Col md={2}><p>₹{updatedTotalAmount}</p>
              </Col>
            </Row>
            <Row>
              <Col md={7} > <p>Shipping : </p></Col ><Col md={5}><p>Enter Shipping address</p>
              </Col>
            </Row>
            <Row>
              <Col md={7} ><h5>Total :</h5></Col ><Col md={5}><p>${updatedTotalAmount}</p>
              </Col>
            </Row>
            <Row>
              <Col md={12} > <p>including 112.81 in taxes</p></Col >
            </Row>


          </Col>
        </Row>

      </Container>


    </div>
  )
}
