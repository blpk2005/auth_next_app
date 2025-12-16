"use client";
import axios from "axios"
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from  "next/navigation";
export default function ProfilePage() {

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            
        } catch (error: any) {
            console.log("Logout failed", error.message);
            toast.error(error.message || "Logout failed. Please try again later."); 
            
        }
    }
    return( 
    <div className="profile-page flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <hr />

        <button 
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 mt-4">
            Logout
        </button>
    </div>
    );
}