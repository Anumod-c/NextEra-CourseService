import  config  from "./config"
interface RabbitMqconfig{
    rabbitMQ:{
        url:string;
        queues:{
            courseQueue:string
        };
    };
}
const RabbitMqconfig:RabbitMqconfig={
    rabbitMQ:{
        url:config.RABBITMQ_URL,
        queues:{
            courseQueue:'course_queue'
        }
    }
}


export default RabbitMqconfig