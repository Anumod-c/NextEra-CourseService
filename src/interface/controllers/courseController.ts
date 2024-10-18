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
    async  fetchLatestCourse(){
        try{
            const result = await this.courseService.fetchLatestCourse();
            console.log('reeslt from fetching  latest course',result);   
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
    async fetchMyCourses(enrolledCourses:string[]){
        try {
            console.log(enrolledCourses,'data from my courses');
            const result = await this.courseService.fetchMyCourses(enrolledCourses);
            return result;
        } catch (error) {
            console.log("Error in fetching my ocurse",error)
        }
    }
    async addUserIdToCourse(data:any){
        try{
            const result = await this.courseService.addUserIdToCourse(data)
            return result
        }catch(error){
            console.log("Error in  adduser to course")
        }
    }
    async coursetable(){
        try{
            const result = await this.courseService.courseTable();
            console.log('course table',result);
            
            return result;
        }catch(error){
            console.log('error in courselist',error);
            
        }
    }
    async getCourseCount(){
        try {
            const result = await this.courseService.getCourseCount();
            
            return result;
        } catch (error) {
            console.log('Error getting course count',error)
        }
    }

    async getTotalCoursesCount(tutorId:string){
        try {
            console.log('tutorId',tutorId)
            const result  = await  this.courseService.getTotalCoursesCount(tutorId);
            return result
        } catch (error) {
            console.log("Error in myTotalCoursesCount",error)
        }
    }
    async getTotalStudentsCount(tutorId:string){
        try {
            console.log('tutorId',tutorId)
            const result  = await  this.courseService.getTotalStudentsCount(tutorId);
            return result
        } catch (error) {
            console.log("Error in getTotalStudentsCount",error)
        }
    }
    async fetchCourseChatList(userId :string){
        try {
            const result =  await this.courseService.fetchCourseChatList(userId);
            return result
        } catch (error) {
            console.log("Error in fetching user course chat list",error)
        }
    }
    
}

export const courseController = new CourseController()