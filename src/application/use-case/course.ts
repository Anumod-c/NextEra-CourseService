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
    
}