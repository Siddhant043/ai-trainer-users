import {
  DIETARY_RESTRICTIONS,
  FASTING_PREFERENCE,
  FITNESS_GOAL,
  EXPERIENCE_LEVEL,
  SCHEDULE_PREFERENCE,
  TIME_AVAILABLE,
  WORKOUT_LOCATION,
  STATE,
  GENDER,
} from "./userDetails.js";
import { Document, Query, QueryWithHelpers } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  dob?: Date;
  physicalDetials?: {
    weight?: number;
    height?: number;
    gender?: GENDER;
  };
  dietaryPreferences?: {
    dietaryRestrictions?: DIETARY_RESTRICTIONS;
    state?: STATE;
    fastingPreference?: FASTING_PREFERENCE;
  };
  exercisePreferences?: {
    fitnessGoal?: FITNESS_GOAL;
    experienceLevel?: EXPERIENCE_LEVEL;
    schedulePreference?: SCHEDULE_PREFERENCE;
    timeAvailable?: TIME_AVAILABLE;
    workoutLocation?: WORKOUT_LOCATION;
  };
  timezone?: string;
  language?: string;
  currency?: string;
  equipments?: string[];
  isOnboarded?: boolean;
  updatedAt?: Date;
  createdAt?: Date;

  isActive?: boolean;
  isDeleted?: boolean;

  find: Function;
  select: Function;
}
