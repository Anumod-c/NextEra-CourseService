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
   
}