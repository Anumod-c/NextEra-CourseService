import { Channel,ConsumeMessage } from "amqplib";

import rabbitMQLogger from "../../../logger/rabbitLogger";

import RabbitMqconfig from "../config/rabbitMQ";

import MessageHandler from "./messageHandler";

export default class Consumer{

    constructor (private channel:Channel){}
    async consumeMessage(){
        try{
            console.log('ready to consue message from gateway');
            await this.channel.assertQueue(RabbitMqconfig.rabbitMQ.queues.courseQueue,{durable:true});

            this.channel.consume(RabbitMqconfig.rabbitMQ.queues.courseQueue,async(message:ConsumeMessage|null)=>{
                if(message){
                    const {correlationId,replyTo}= message.properties;
                    const operation =message.properties.headers?.function;
                    rabbitMQLogger.emit('messageReceived', {
                        queue: RabbitMqconfig.rabbitMQ.queues.courseQueue,
                        correlationId,
                        operation,
                    });

                    console.log('Message properties',{correlationId,replyTo,operation});
                    if(message.content){
                        const data = JSON.parse(message.content.toString());
                        try{
                            await MessageHandler.handle(operation,data,correlationId,replyTo);
                            rabbitMQLogger.emit('messageProcessed', { operation, result: "Success" });

                        }catch(handlererror){
                            console.error('Error in message handler',handlererror)
                        }
                    }
                    
                }
            },{noAck:true})
            
        }catch(error){
            rabbitMQLogger.emit('error', error);

            console.error("error in consume message in userService",error)
        }
    }
}