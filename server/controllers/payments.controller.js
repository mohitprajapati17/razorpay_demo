import { razorpay } from "../config/razorpay.config.js";

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



