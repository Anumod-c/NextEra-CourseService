import { Course } from "../../model/Course";
import { ICourse } from "../entities/ICourse";
import { ICourseRepository } from "./ICourseRepository";



export class CourseRepository implements ICourseRepository{
    async saveCourse(courseData:ICourse){
        try{        
            
                const newCourse = new Course(courseData);
                await newCourse.save();
                console.log('Course saved successfully');
            return { success: true, message: "Course saved sucessfully" };
             
        }catch(error){
            console.log('saveCourse error',error);
            return { success: false, message: "Course couldnt save. Please try again" };
            
        }
    }
    async fetchAllCourse(){
        try{
            const allCourse=await Course.find({});
            
            console.log('allcourse',allCourse

            )
            if(allCourse){
                return {courses:allCourse,message:'Fetching course  went successfult',success:true}
            }
        }catch(error){
            console.log('fetch all course error',error);
            return { success: false, message: "Course fetch courses. Please try again" };
            
        }
    }
    async getCoursesByTutorId (tutorId:string){
        try {
            const courses = await  Course.find({tutorId:tutorId});
            console.log('lllllllllllllll',courses);;
            if(!courses){
                return {success:false,message:"Course not found"} 
            }
            return {success:true,message:"Course fetched successfully",courses}
            
        } catch (error) {
            console.log("Error in fetching coursesBy tutorId");
            
        }
    }
    async getSingleCourse(courseId:string){
        try {
            const course= await Course.findById(courseId);
            if(!course){
                return {success:false,message:"Couldnt view single course page"}
            }
            return {success:true,message:"Single Course fetched successfully",course}
        } catch (error) {
            console.log('Error in finding singlecourse in db');
            
        }
    }
   
}