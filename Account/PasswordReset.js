import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { Input } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const navigate=useNavigate();

const passwordUpdate = async () => {
    try {

        if (newPassword.length < 8 || confirmPassword.length<8) {
            toast.error("Password must be at least 8 characters long");
            return;
          }
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }else{

      

      const email = window.localStorage.getItem('email1');
      await axios.put(`http://localhost:8080/users/updatepassword/${email}/${newPassword}`);
      toast.success("Password updated successfully");
      localStorage.removeItem("email1")
      navigate("/")
      console.log(newPassword);
    }} catch (error) {
      toast.error("Password reset failed");
    }
  };
  return (
    <div>
    <Container style={{marginTop:"80px"}}>
    <div>
    <h1>Password Reset</h1></div>
          <div className="form-group" style={{marginLeft:"300px",textAlign:"left",marginTop:"30px"}}>
            <label htmlFor="newPassword" style={{fontSize:"25px"}}>New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}

              style={{width:"500px",height:"45px",marginTop:"10px"}}
            />
          </div>
          <div className="form-group" style={{marginLeft:"300px",textAlign:"left"}}>
            <label htmlFor="confirmPassword" style={{fontSize:"25px",marginTop:"10px"}}>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{width:"500px",height:"45px",marginTop:"10px"}}
            />
          </div>
          <div style={{marginTop:"15px"}}>
          <Button color="warning" outline  onClick={passwordUpdate}>Submit</Button>
          </div>
    </Container>
    </div>
  )
}
