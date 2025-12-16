import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        // Ensure DB connection for each request
        await connect();
        const reqbody = await request.json();
        const { username, email, password } = reqbody;

        console.log("Signup request body:", reqbody);
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        return NextResponse.json({ message: "User created successfully", success: true, savedUser }, { status: 201 });
    } catch (error: any) {
        console.error("Signup API error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}