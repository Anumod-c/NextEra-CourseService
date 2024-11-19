import mongoose,{Document,Schema} from "mongoose";

import { ICourse } from "../domain/entities/ICourse";

export interface ICourseDocument  extends ICourse,Document{}

// Option Schema
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema], // Array of options
});


// Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String, 
    required: true,
  },
  quizzes: [quizSchema],
});

  const sectionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    lessons: [lessonSchema], 
  });
const courseSchema:Schema=new Schema({
    tutorId: { type: String, required: true },
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discountPrice: {
        type: Number,
      },
      status:{
        type:Boolean,
        default:true
      },
      category: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'], 
        required: true,
      },
      demoURL: {
        type: String,
        required: true,
      },
      prerequisites: [{
        type: String,
        required: true,
      }],
      benefits: [{
        type: String,
        required: true, 
      }],
      enrolledUsers: [{  
        type: Schema.Types.ObjectId,
        ref: 'User', 
    }],
      sections: [sectionSchema], 
    }, {
      timestamps: true, 
    });

export const Course=  mongoose.model<ICourseDocument>('Course',courseSchema);