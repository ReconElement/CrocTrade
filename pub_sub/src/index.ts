// import WebSocket from "ws";
// import { Kafka } from "kafkajs";
// // const stream = new WebSocket("ws://localhost:8080");
// // stream.on('message',(message)=>{
// //     console.log(message.toString());
// // })
// const kafka = new Kafka({
//     clientId: "my-app",
//     brokers: ["kafka1:9092",'kafka2:9092'],
// });
// const producer = kafka.producer();
// await producer.connect();
// await producer.send({
//     topic: "test-topic",
//     messages: [
//         { value: "Hello Kafkajs user!"},
//     ],
// });
// await producer.disconnect();
// const consumer = kafka.consumer({ groupId: "test-group"});
// await consumer.connect();
// await consumer.subscribe({ topic: "test-topic", fromBeginning: true});
// await consumer.run({
//     eachMessage: async ({topic, partition, message})=>{
//         console.log(message.value?.toString());
//     }
// });
// import {createClient} from 'redis';
// const client = createClient();
// client.on('error',(err)=>{
//     console.log(err);
// });
// await client.connect();
// await client.set('name','Omkar');
// const name = await client.get('name');
// console.log(name);
// async function quit(){
//     await client.quit();
// };
// await quit();
// import redis from 'redis';
// const publisher = redis.createClient();
// async function Publish(){
//     const article = {
//         id: "240",
//         name: "Trying pubsub with redis db on a nodejs script",
//         topic: "Programming"
//     };
//     const connection = await publisher.connect();
//     // if(connection){
//     //     await publisher.publish('article', JSON.stringify(article));
//     // }
//     let n = 0;
//     while(connection){
//         await publisher.publish('article', JSON.stringify(article));
//         n++;
//         if(n>4){
//             break;
//         }
//     }
// };
// await Publish();
// import redis from 'redis';
// import WebSocket from 'ws';
// const stream = new WebSocket("ws://localhost:8080");
// const publisher = redis.createClient();
// async function Publish(){
//     const connection = await publisher.connect();
//     // if(connection){
//     //     await publisher.publish('stream',JSON.stringify(stream.on('message',(message)=>message.toString())));
//     // }
//     if(connection){
//         stream.on('message',(message)=>{
//             publisher.publish('stream',message.toString());
//         })
//     }
// };
//await Publish();
// import {Connection} from 'rabbitmq-client';
// //This pub sub will recieve the stream from price_poller 
// const rabbit = new Connection('amqp://guest:guest@localhost:5672');
// rabbit.on('error',(error)=>{
//     console.log('Rabbit MQ connection error: ',error);
// });
// rabbit.on('connection',()=>{
//     console.log("Connection successfully established");
// });
// const sub = rabbit.createConsumer({
//     queue: "price_event",
//     queueOptions: {durable: true},
//     exchanges: [{exchange: 'CRYPTO', type: 'TRADE'}],
//     queueBindings: [{exchange: 'CRYPTO', routingKey: 'users.*'}],
// },async (data)=>{
//     console.log(`Recieved message: ${JSON.stringify(data)}`);
// });
// sub.on('error',(error)=>{
//     console.log(`Consumer error: ${error}`);
// });
// import Queue from 'bull';
// const redisConfig = {
//     host: "127.0.0.1",
//     port: 6379
// };
// const myQueue = new Queue('myQueue',{redis: redisConfig});
// setInterval(()=>{
//     myQueue.add({"foo":"bar"});
// },2000);
import Queue from 'bull';
import Redis from 'redis';
const publisher = Redis.createClient();
// async function Publish(){
//     const connection = await publisher.connect();
//     if(connection){
//         await publisher.publish('stream',JSON.stringify("Hello World"));
//     }
// }
const redisConfig = {
    host: "127.0.0.1",
    port: 6379
};
const queue = new Queue('dataQueue', { redis: redisConfig });
//reception and publishing is happening in the same func
queue.process(async (job) => {
    const connection = await publisher.connect();
    if (connection) {
        const sent = await publisher.publish('stream', JSON.stringify(job.data));
        // const sent = await publisher.publish('stream',"Hello World");
        if(sent){
            console.log("message sent");
        }
    };
});



