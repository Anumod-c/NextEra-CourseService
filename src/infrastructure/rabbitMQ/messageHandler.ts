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
        }
        await RabbitMQClient.produce(response,correlationId,replyTo)
    }
}


