"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);


    const verifyUser = async () =>{
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }


    useEffect(()=>{
        const token = window.location.search.split("=")[1];
        setToken(token || "") ;
    },[]);

    useEffect(() => {
        if(token.length > 0 ){
            verifyUser();
        }
    },[token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-200 text-black">{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div className="p-4 bg-green-200 text-black rounded-md mt-4">
                    <h2 className="text-2xl font-bold">Email Verified Successfully!</h2>
                    <Link href="/login" className="text-blue-500 underline mt-2">Go to Login</Link>
                    </div> 
            )}
            {error && (
                <div className="p-4 bg-red-200 text-black rounded-md mt-4">
                    <h2 className="text-2xl font-bold">Error Verifying Email!</h2>
                    </div> 
            )}
        </div>
    )

}