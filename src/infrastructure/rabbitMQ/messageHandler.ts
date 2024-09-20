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
                response= await courseController.fetchAllCourse()
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
                
        }
        await RabbitMQClient.produce(response,correlationId,replyTo)
    }
}


