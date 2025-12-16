"use client";
import Link from "next/link";
import React, { use,useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import { set } from "mongoose";

export default function LoginPage() {

  const router = useRouter();

  const[user, setUser] = React.useState({
    email: "",
    password: ""
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user)
      console.log("Login successful", response.data);
      toast.success("Login successful");
      router.push("/profile");

    } catch (error:any) {
      console.log("Login failed", error.message);
      toast.error(error.message || "Login failed. Please try again later.");
      
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }
  ,[user]);

  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold items-center">{loading ? "Logging in..." : "Login Page"}</h1> 
        <hr />
        
        <label className="text-lg font-medium mt-4 " htmlFor="email">Email</label>
          <input 
          className="border border-gray-300 rounded-md p-2 w-64"
          type="email" 
          id="email" 
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="Enter your email"
          />
        <label className="text-lg font-medium mt-4 text-black" htmlFor="password">Password</label>
          <input 
          className="border border-gray-300 rounded-md p-2 w-64"
          type="password" 
          id="password" 
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="Enter your password"
          />
        <button className="bg-blue-500 text-white rounded-md p-2 mt-4 disabled:opacity-50" onClick={onLogin} disabled={buttonDisabled}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link className="text-blue-500 mt-4" href={"/signup"}>Don't have an account? Signup</Link>
    </div>
  );
}