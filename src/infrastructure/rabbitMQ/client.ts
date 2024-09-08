import { Channel,connect,Connection } from "amqplib";

import RabbitMQconfig from "../config/rabbitMQ";

import Consumer from "./consumer";
import Producer from "./producer";

class RabbitMQClient{
    private static instance: RabbitMQClient;
    private connection : Connection |undefined;
    private produceChannel : Channel |undefined;
    private consumerChannel : Channel | undefined;
    private consumer : Consumer |undefined;
    private producer : Producer |undefined;
    private isInitialized =false;

    private constructor(){}

    public static getInstance(){
        if(!this.instance){
            this.instance = new RabbitMQClient();
        }
        return this.instance;
    }



    async initialize(){
        if(this.isInitialized){
            return
        }
        try{
            console.log('Connecting to rabbitmq...');
            this.connection = await connect(RabbitMQconfig.rabbitMQ.url);
            console.log('line under connecting to rabbitmq');
            [this.produceChannel, this.consumerChannel] = await Promise.all([this.connection.createChannel(),this.connection.createChannel()]) ;
            await this.produceChannel.assertQueue(RabbitMQconfig.rabbitMQ.queues.courseQueue,{durable:true});
            await this.consumerChannel.assertQueue(RabbitMQconfig.rabbitMQ.queues.courseQueue,{durable:true})


            this.producer = new Producer(this.produceChannel);
            this.consumer = new Consumer(this.consumerChannel);
            this.consumer.consumeMessage();

            this.isInitialized = true
        }catch(error){
            console.log("Rabbit error",error)
        }
        
    }

    async produce(data:any,correlationId:string,replyToQueue:string){
        if(!this.isInitialized){
            await this.initialize();
        }
        return this.producer?.produceMessage(data,correlationId,replyToQueue)
    }
}

export default RabbitMQClient.getInstance();