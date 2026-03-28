import { razorpay } from "../config/razorpay.config.js";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";

const razorpayInstance=razorpay();

export const createOrder=async(req,res)=>{
    // do not accept the amount from client 

    const {courseId,amount}=req.body;

    const options={
        amount:amount*100,
        currency:"INR",
        receipt:"receipt_order_720"
    }

    try{
        razorpayInstance.orders.create(options,(err,order)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"something went wrong"
                });
            }

            return res.status(200).json({
                success:true,
                order
            })
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
    
}

export const verifyPayment=async(req,res)=>{
    const {order_id,payment_id,signature}=req.body;
    const secret=process.env.RAZORPAY_KEY_SECRET;

    // create hmac object
    const hmac=crypto.createHmac("sha256",secret);

    const body=order_id+"|"+payment_id;

    const expectedSignature=hmac.update(body.toString()).digest("hex");

    if(expectedSignature===razorpay_signature){
        return res.status(200).json({
            success:true,
            message:"payment verified successfully"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"payment verification failed"
        })
    }
}



