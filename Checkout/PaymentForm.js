import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const PaymentForm = () => {
  const [paymentId,setPaymentId]=useState()
  const [referenceId,setReferenceId]=useState();
  const {orderId}=useParams();
  
  const dispatch=useDispatch();
const {order}=useSelector(store=>store);


useEffect(()=>{
  const urlParam=new URLSearchParams(window.location.search);
setPaymentId(urlParam.get("razorpay_payment_link_id"))
},[])

useEffect(()=>{
  dispatch(findById(orderId));
  dispatch(updatePayment(data))
},[orderId,paymentId])
  return (
    <div>
    <div className='px-2 lg:px-36'>
    <Alert variant="filled" severity="success" sx={{mb:6,width:"fit-content"}}>
    <AlertTitle>Payment Success</AlertTitle>
    Congratulation Your Order Get Placed
    </Alert>
    
    
    </div>
    <OrderTraker activeStep={1}/>
    </div>

    )
}
