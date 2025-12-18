import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqbody = await request.json();
        const { email, password } = reqbody;
        console.log("Login request body:", reqbody);
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }
        //create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        //creating token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({ 
            message: "Login successful", 
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
        });
        return response;
    } catch (error: any) {
        console.error("Login API error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}