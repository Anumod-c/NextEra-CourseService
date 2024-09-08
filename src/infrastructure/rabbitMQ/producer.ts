import { Channel } from "amqplib";
export default class Producer{
    constructor(private channel:Channel){}

    async produceMessage(data:any,correlationId:string,replyToQueue:string){
        try{
            this.channel.sendToQueue(replyToQueue,Buffer.from(JSON.stringify(data)),{correlationId:correlationId

            })
            console.log('Message produced back');
            
        }catch(error){
            console.log('Error in producing messsage back to apigateway',error);
            
        }
    }
}