"use client";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

/*import {axios} from "axios";*/
//import {toast} from "react-hot-toast";

export default function SignupPage() {

  const router = useRouter();

  
  const[user, setUser] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
   
  const [loading, setLoading] = useState(false);

  const onSignup = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup successful", response.data);
      router.push("/login");
    } 
    
    catch (error : any) {
      console.log("Signup failed", error);
      console.log(error.message);
      toast.error("Signup failed. Please try again later.",error.message);
    }
    
    finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }
  ,[user]);

  //main ui in signup page 
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold items-center">
          {loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label className="text-lg font-medium mt-4" htmlFor="username">Username</label>
          <input 
          className="border border-gray-300 rounded-md p-2 w-64"
          type="text" 
          id="username" 
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
          placeholder="Enter your username"
          />
        <label className="text-lg font-medium mt-4" htmlFor="email">Email</label>
          <input 
          className="border border-gray-300 rounded-md p-2 w-64"
          type="email" 
          id="email" 
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="Enter your email"
          />
        <label className="text-lg font-medium mt-4" htmlFor="password">Password</label>
          <input 
          className="border border-gray-300 rounded-md p-2 w-64"
          type="password" 
          id="password" 
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="Enter your password"
          />
        
        <button className="bg-blue-500 text-white rounded-md p-2 mt-4" onClick={onSignup}>
          {buttonDisabled ? "No Signup" : "Signup"}
        </button> 
        <Link className="text-blue-500 mt-4" href={"/login"}>Already have an account? Login</Link>
    </div>
  );
}