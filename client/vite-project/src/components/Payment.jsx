import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        console.log("Razorpay Key ID:", import.meta.env.VITE_RAZORPAY_KEY_ID);
        setLoading(true);
        try {
            // 1. Create order on server
            const { data: { order } } = await axios.post('http://localhost:3000/api/payments/create-order', {
                amount: 500, // Amount in INR
                courseId: 'course_123'
            });

            // 2. Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Razorpay Demo",
                description: "Purchase Course",
                order_id: order.id,
                handler: async (response) => {
                    console.log("Razorpay Response:", response);
                    try {
                        const verifyRes = await axios.post('http://localhost:3000/api/payments/verify-payment', {
                            order_id: response.razorpay_order_id,
                            payment_id: response.razorpay_payment_id,
                            signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            alert("Payment Successful & Verified!");
                        }
                    } catch (error) {
                        console.error("Verification failed", error);
                        alert("Payment Verification Failed!");
                    }
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment failed", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-card">
            <div className="course-info">
                <h2>React Mastery Course</h2>
                <p>Learn React from scratch to advanced level with real-world projects.</p>
                <div className="price">₹500.00</div>
            </div>
            <button
                className="buy-btn"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Buy Now'}
            </button>
        </div>
    );
};

export default Payment;
