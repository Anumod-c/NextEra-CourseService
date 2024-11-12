import mongoose,{Document,Schema} from "mongoose";
import { IReview } from "../domain/entities/IReview";
 export  interface IReviewDocument extends IReview,Document{}
const ReviewSchema= new mongoose.Schema({
    rating:{
        type:Number
    },
    review:{
        type:String,
    },
    userId:{
        type:String,
    },
    courseId: {
        type: Schema.Types.ObjectId,  
        ref: 'Course' 
    }

})

export const Review = mongoose.model<IReview>('Review',ReviewSchema)