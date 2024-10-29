import { ICourse } from "../../domain/entities/ICourse";
import { CourseRepository } from "../../domain/repository.ts/CourseRepository";

export class CourseService {
    private courseRepo: CourseRepository;
    constructor() {
        this.courseRepo = new CourseRepository();
    }

    async addCourse(courseData: ICourse) {
        try {
            console.log("try");
            const result = await this.courseRepo.saveCourse(courseData);
            return result;
        } catch (error) {
            console.log("catch");
        }
    }
    async fetchAllCourse() {
        try {
            const result = await this.courseRepo.fetchAllCourse();
            return result;
        } catch (error) {
            console.log("error in fetching course in course.ts");
        }
    }
    async fetchLatestCourse() {
        try {
            const result = await this.courseRepo.fetchLatestCourse();
            return result;
        } catch (error) {
            console.log("error in fetching latest course in course.ts");
        }
    }
    async courseList(tutorId: string) {
        try {
            console.log("tutor id from usecase", tutorId);
            const result = await this.courseRepo.getCoursesByTutorId(tutorId);
            return result;
        } catch (error) { }
    }
    async singleCourse(courseId: string) {
        try {
            console.log("reached usecase for singlecourse");
            const result = await this.courseRepo.getSingleCourse(courseId);
            return result;
        } catch (error) {
            console.log("Error in single course in messagehandler");
        }
    }
    async fetchMyCourses(enrolledCourses: string[]) {
        try {
            const result = await this.courseRepo.fetchMyCourses(enrolledCourses);
            return result;
        } catch (error) {
            console.log("Error in fetchmy course in usecase");
        }
    }
    async addUserIdToCourse(data: any) {
        try {
            const result = await this.courseRepo.addUserIdToCourse(data);
            return result;
        } catch (error) {
            console.log("Error in  addUserid to course", error);
        }
    }
    async courseTable() {
        try {
            console.log("Course table");
            const result = await this.courseRepo.getFullCourses();
            return result;
        } catch (error) { }
    }
    async getCourseCount(){
        try{
            const result = await this.courseRepo.getCourseCount();
            return result
        }catch(error){
            console.log('Errror in getting course countt in course.ts')
        }
    }

    async getTotalCoursesCount(tutorId:string){
        try {
            const result = await this.courseRepo.getTotalCoursesCount(tutorId);
            return result
        } catch (error) {
            console.log("Error in myTotalCoursesCount course.ts",error)
        }
    }
    async getTotalStudentsCount(tutorId:string){
        try {
            const result = await this.courseRepo.getTotalStudentsCount(tutorId);
            return result
        } catch (error) {
            console.log("Error in myTotalCoursesCount course.ts",error)
        }
    }
    async fetchCourseChatList(userId:string){
        try {
            const result = await this.courseRepo.fetchCourseChatList(userId);
            return result;
        } catch (error) {
            console.log("Error  in fetchCourseChatList in course.ts",error)
        }
    }
    async changeCourseStatus(data:{courseId:string;status:boolean}){
        try{
            const result :any= await this.courseRepo.changeCourseStatus(data);
            return result
         }
         catch(error){
             console.log('error in changing status',error);
             
         }
    }
}

