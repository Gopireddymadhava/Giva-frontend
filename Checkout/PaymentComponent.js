// PaymentComponent.js
import React, { useState } from 'react';
import Razorpay from 'razorpay';

export const PaymentComponent = () => {
  const [paymentLink, setPaymentLink] = useState(null);
  const orderId = 1; // Replace with the actual order ID
  const jwt = 'YOUR_JWT_TOKEN';
  const createPaymentLink = async () => {
    try {
      // Make a POST request to your backend to create a payment link
      const response = await fetch(`http://localhost:8080/payments/${orderId}`, {
        method: 'POST',
        headers: {
          'Authorization': jwt,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setPaymentLink(data);
    } catch (error) {
      console.error('Error creating payment link:', error);
    }
  };

  const handlePayment = () => {
    
    const razorpay = new Razorpay({
      key: 'rzp_test_4Gezio5U8ANmRO',
      amount: 100, 
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Order #123',
      order_id: paymentLink.payment_link_id, 
      handler: (response) => {
        // Handle the response after successful payment
        console.log('Payment successful:', response);
        // You may want to redirect the user or perform other actions here
      },
    });

    razorpay.open();
  };

  return (
    <div>
      {paymentLink ? (
        <button onClick={handlePayment}>Proceed to Payment</button>
      ) : (
        <button onClick={createPaymentLink}>Generate Payment Link</button>
      )}
    </div>
  );
};


