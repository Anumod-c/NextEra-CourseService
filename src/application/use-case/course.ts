import { ICourse } from "../../domain/entities/ICourse";
import { CourseRepository } from "../../domain/repository.ts/CourseRepository";


export class CourseService{
    private courseRepo:CourseRepository;
    constructor(){
        this.courseRepo= new CourseRepository();

    }


     async addCourse(courseData:ICourse){
        try{
            console.log('try');
            const result =await this.courseRepo.saveCourse(courseData)
            return result
            
        }catch(error){
            console.log('catch');
            
        }
    }
    async fetchAllCourse(){
        try{
            const result  = await this.courseRepo.fetchAllCourse();
            return result;
        }catch(error){
            console.log('error in fetching course in course.ts');
            
        }
    }
    async courseList(tutorId:string){
        try {
            console.log('tutor id from usecase',tutorId);
            const result  = await this.courseRepo.getCoursesByTutorId(tutorId)
            return result
        } catch (error) {
            
        }
       
    }
    async singleCourse(courseId:string){
        try {
            console.log('reached usecase for singlecourse');
            const result = await this.courseRepo.getSingleCourse(courseId);
            return result;
            
        } catch (error) {
            console.log("Error in single course in messagehandler")
        }
    }
    
}