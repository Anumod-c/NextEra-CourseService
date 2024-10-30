import { response } from 'express';
import  RabbitMQClient from './client';
import { courseController } from '../../interface/controllers/courseController';
export default class MessageHandler{
    static async handle(operations:string,data :any, correlationId:string,replyTo:string){
        let response;
        switch(operations){
            case 'AddCourse':
                console.log('Handling operation',operations,data);
                response = await courseController.addCourse(data);
                console.log("data reached inside message handler.ts",response);
                break;
            case 'fetchAllCourse':
                console.log('reached messagehandller for fetching all course',operations);
                response= await courseController.fetchAllCourse(data)
                break;
            case 'fetchLatestCourses':
                console.log('reached messagehandller for fetching Latest course',operations);
                response= await courseController.fetchLatestCourse();
                break;

            case 'courseList':
                console.log('courselist worked in messagehandler',data,operations);
                response = await courseController.courseList(data)
                console.log('fsdfsdfsdfsdfsdfasdfsdf',response);
               break;
            case 'singleCourse':
                console.log('single course reached courseservice  messagehandler ');
                response = await courseController.singleCourse(data);
                break;
            case 'fetchMyCourses':
                response  = await courseController.fetchMyCourses(data)
                break;
            case 'add_userId_to_course':
                console.log('adduerid to course');
                response = await courseController.addUserIdToCourse(data);
                break;
            case 'courseTable':
                response =await courseController.coursetable();
                break;
            case 'get_courses_count':
                response =await courseController.getCourseCount();
                break;
            case 'getTotalCoursesCount':
                response = await courseController.getTotalCoursesCount(data);
                break;
            case 'getTotalStudentsCount':
                response = await courseController.getTotalStudentsCount(data);
                break;
             case 'fetchCourseChatList':
                response = await courseController.fetchCourseChatList(data);
                break;
            case 'change_course_status':
                response = await courseController.changeCourseStatus(data);
                break;
            case 'add_review_rating':
                response = await courseController.addReviewRating(data);
                break;
            case 'fetch_review':
                response = await courseController.fetchReview(data);
                break;
        }
        await RabbitMQClient.produce(response,correlationId,replyTo)
    }
}


