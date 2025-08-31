import mongoose, { Schema } from "mongoose";
import pkg from "validator";
import { IUser } from "../types/index.js";

const { isEmail } = pkg;

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  phoneNumber: {
    type: String,
  },
  dob: {
    type: Date,
  },
  physicalDetials: {
    type: {
      weight: { type: Number },
      height: { type: Number },
      gender: { type: String },
    },
  },
  dietaryPreferences: {
    type: {
      dietaryRestrictions: { type: String },
      state: { type: String },
      fastingPreference: { type: String },
    },
  },
  exercisePreferences: {
    type: {
      fitnessGoal: { type: String },
      experienceLevel: { type: String },
      schedulePreference: { type: String },
      timeAvailable: { type: String },
      workoutLocation: { type: String },
    },
  },
  timezone: { type: String },
  language: { type: String },
  currency: { type: String },
  equipments: { type: Array },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>(/^find/, function (next) {
  this.find({ isActive: { $ne: false }, isDeleted: { $ne: true } });
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
