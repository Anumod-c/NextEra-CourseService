import { CourseService } from "../../application/use-case/course";
import { ICourse } from "../../domain/entities/ICourse";

class CourseController{
    private courseService:CourseService;
    constructor(){
        this.courseService = new CourseService();
    }

    async addCourse(courseData:ICourse){
        try{
            console.log(courseData,'in controlerrr');
            const result = await this.courseService.addCourse(courseData);
            console.log('got result from course.ts for addocourse');
            
            return result
        }catch(error){
            console.log('error in addcourse',error);
            
        }
    }
    async fetchAllCourse() {
        try{
            const result = await this.courseService.fetchAllCourse();
            console.log('reeslt from fetching course',result);
            
            return result
        }catch(error){
            console.log('error in addcourse',error);
            
        }
    }
    async courseList(tutorId:string){
        try{
            const result = await this.courseService.courseList(tutorId);
            console.log('gggggggggggggggggggggggggg',result);
            
            return result;
        }catch(error){
            console.log('error in courselist',error);
            
        }
    }
    async singleCourse(courseId:string){
        try {
            const result = await this.courseService.singleCourse(courseId);
            return result
        } catch (error) {
            console.log(error,"Error in single COursepage");
            
        }
    }
    

    
}

export const courseController = new CourseController()