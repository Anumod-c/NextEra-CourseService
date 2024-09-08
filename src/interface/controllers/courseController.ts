import { CourseService } from "../../application/use-case/course";
import { ICourse } from "../../domain/entities/ICourse";
import { Course } from "../../model/Course";

class CourseController{
    private courseService:CourseService;
    constructor(){
        this.courseService = new CourseService();
    }

    async addCourse(courseData:ICourse){
        try{
            console.log(courseData,'in controlerrr');
            const result = await this.courseService.addCourse(courseData);
            return result
        }catch(error){
            console.log('error in addcourse',error);
            
        }
    }
}

export const courseController = new CourseController()