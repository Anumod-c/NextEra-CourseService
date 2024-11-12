import { Channel } from "amqplib";
import rabbitMQLogger from "../../../logger/rabbitLogger";


export default class Producer{
    constructor(private channel:Channel){}

    async produceMessage(data:any,correlationId:string,replyToQueue:string){
        try{
            this.channel.sendToQueue(replyToQueue,Buffer.from(JSON.stringify(data)),{correlationId:correlationId

            })
            rabbitMQLogger.emit('messageProduced', { queue: replyToQueue, correlationId });

            console.log('Message produced back');
            
        }catch(error){
            rabbitMQLogger.emit('error', error);
            console.log('Error in producing messsage back to apigateway',error);
            
        }
    }
}