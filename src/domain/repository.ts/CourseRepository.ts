import { Course } from "../../model/Course";
import { ICourse } from "../entities/ICourse";
import { ICourseRepository } from "./ICourseRepository";



export class CourseRepository implements ICourseRepository{
    async saveCourse(courseData:ICourse){
        try{
            console.log('course repository',courseData);
            const newCourse = new Course(courseData);
            await newCourse.save();
            console.log('course saved successfully')
            return
             
        }catch(error){
            console.log('saveCourse error',error);
            
        }
    }
}