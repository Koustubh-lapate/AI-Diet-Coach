import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import Razorpay from 'razorpay';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//middleware
app.use(cors());
app.use(express.json());

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    isPremium: { type: Boolean, default: false },
    razorpayCustomerId: String,
    preferences: {
        dietaryRestrictions: [String],
        fitnessGoals: String,
        allergies: [String],
        lifestyle: String,
        mealPreferences: [String],
        calorieTarget: Number
    },
    onboardingCompleted: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

//chat schema