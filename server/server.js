import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import paymentRoutes from "./routes/payments.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

