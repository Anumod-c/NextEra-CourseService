import express from 'express';
import RabbitMQClient from '../rabbitMQ/client'
import { databaseConnection } from '../database/mongodb';
import config from '../config/config';
const app = express();

app.use(express.json());

const startServer=async()=>{
    try{
        console.log('hy');
        
        // database connection
        await databaseConnection();

        //rabbitmq initalization
        RabbitMQClient.initialize();

        const port = config.port;
        
        app.listen(5004,()=>{
            console.log('Course service running on port ',port)
        })
    }catch(error){
        console.log("Error in stareting user service")
    }
}

startServer()