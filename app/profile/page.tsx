"use client";
import axios from "axios"
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from  "next/navigation";
import { log } from "console";
import React,{ useState } from "react";
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login"); // Redirect to login after logout
        } catch (error: any) {
            console.log("Logout failed", error.message);
            toast.error(error.message || "Logout failed. Please try again later."); 
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id);
    }



    return( 
    <div className="profile-page flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <h2 className="p-3 rounded bg-green-500 ">
            {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }
        </h2>
        <hr />

        <button 
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 mt-4">
            Logout
        </button>

    <button 
        onClick={getUserDetails}
        className="bg-green-500 hover:bg-green-600 text-white rounded-md p-2 mt-4">
            Get User Details
        </button>

    </div>
    );
}