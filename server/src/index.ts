import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes';
import salaryRoutes from './routes/salaryRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';



const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/expenses', expenseRoutes);
app.use('/salaries', salaryRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});