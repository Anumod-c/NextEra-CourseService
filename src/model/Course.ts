import mongoose,{Document,Schema} from "mongoose";

import { ICourse } from "../domain/entities/ICourse";

export interface ICourseDocument  extends ICourse,Document{}


const lessonSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
      required: true,
    },
  });

  const sectionSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    lessons: [lessonSchema], // Array of lessons
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
      category: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'], // Limit level to specific values
        required: true,
      },
      demoURL: {
        type: String,
      },
      prerequisites: [{
        type: String, // Array of strings for prerequisites
      }],
      benefits: [{
        type: String, // Array of strings for benefits
      }],
      sections: [sectionSchema], // Array of sections
    }, {
      timestamps: true, // Automatically add createdAt and updatedAt timestamps
    });

export const Course=  mongoose.model<ICourseDocument>('Course',courseSchema);