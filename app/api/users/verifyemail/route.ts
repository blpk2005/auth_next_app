import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import { log } from "console";
import { verify } from "crypto";


connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("token from request body",token);

        const user =await User.findOne({verifyToken: token, verifyTokenExpires: {$gt: Date.now()}});

        if(!user){
            NextResponse.json({message:"Invalid or exired token"}, {status: 400})
        }
        console.log("Useer details",user);


        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpires = undefined;

        await user.save();

        return NextResponse.json({message:"email verified successfully", success:true}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({error: error.message, success: true});
    }
}