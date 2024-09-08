import mongoose,{Document,Schema} from "mongoose";

import { ICourse } from "../domain/entities/ICourse";

export interface ICourseDocument  extends ICourse,Document{}

const courseSchema:Schema=new Schema({
    courseTitle: { type: String, required: true },
    courseDesc: { type: String, required: true },
    coursePrice: { type: Number, required: true },  
    courseDiscountPrice: { type: Number, required: true },  
    courseCategory: { type: String, required: true },
    courseLevel: { type: String, required: true },
    demoURL: { type: String,required:true},
    thumbnail: { type: String,required:true},
    prerequisite: { type: [String] },  
    benifits: { type: [String] }  
})

export const Course=  mongoose.model<ICourseDocument>('Course',courseSchema);