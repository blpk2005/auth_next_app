import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}
    :any) => {
        
        try {
            //creating a hashed token from the userid
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)

            if(emailType === "VERIFY") {
                //checkin for an email in db and updating it using verify token which is used in usermodel.js in model folder
                await User.findByIdAndUpdate(userId,{verifyToken: hashedToken,verifyTokenExpiry: Date.now() + 3600000})
            }
            else if(emailType === "RESET"){
                await User.findByIdAndUpdate(userId,{forgetPasswordToken: hashedToken,forgetPasswordTokenExpiry: Date.now() + 3600000})
            }
            
            
           var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            }
            });

            const mailOptions = {
                from: 'auth_next_app<no-reply@yourdomain.com>', // Use a safe, non-gmail address for Mailtrap
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verify?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify" : "reset"} or copy paste link below in browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
            }

            const mailresponse = await transport.sendMail(mailOptions)
            return mailresponse;




        } catch (error: any) {
            throw new Error(error.message)
        }
    }