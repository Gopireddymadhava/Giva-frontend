import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Input } from 'rsuite';
export const Register = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function save(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/users/signup", {
          name: name,
          email: email,
          password: password,
          });
          toast.success("Registation Successfully");
          setname("");
          setEmail("");
          setPassword("");
          navigate("/login")
        } catch ( err) {
          toast.error("Fill the fields with Data");
        }
      }
  return (
    <div>
    <div className="container mt-4">
    <div className="card" style={{backgroundColor:"lightorange"}}>
            <h1 style={{marginTop:"15px"}}>Registration</h1>
    <hr/>
    <form>
        <div className="form-group" >
          <label> <h5>UserName</h5></label>
          <Input type="text"  className="form-control" id="name" placeholder="Enter Username"
          
          value={name}
          onChange={(value) => {
            setname(value);
          }}
          style={{width:"500px",height:"45px",borderRadius:"7px",textAlign:"center",marginLeft:"310px"}}
          />
        </div>
        <div className="form-group" style={{marginTop:"10px"}}>
          <label><h5>Email</h5></label>
          <Input type="email"  className="form-control" id="email" placeholder="Enter Email"
          
          value={email}
          onChange={(value) => {
            setEmail(value);
          }}
          style={{width:"500px",height:"45px",borderRadius:"7px",textAlign:"center",marginLeft:"310px"}}
          />
 
        </div>
        <div className="form-group"  style={{marginTop:"10px"}}>
            <label><h5>Password</h5></label>
            <Input type="password"  className="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(value) => {
              setPassword(value);
            }}
            style={{width:"500px",height:"45px",borderRadius:"7px",textAlign:"center",marginLeft:"310px"}}
            />
          </div>
        <button type="submit" className="btn btn-primary mt-4" onClick={save} style={{marginBottom:"5px",backgroundColor:"lightgreen",color:"black"}}>Save</button>
       
      </form>
    </div>
    </div>
    </div>
  )
}
