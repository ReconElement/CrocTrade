// import WebSocket from "ws";
// const binanceStream = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/solusdt@markPrice");
// const dataCount = [];
// binanceStream.on("message", function(data){
//     dataCount.push(data);
//     console.log(`SOL | USDT: ${data}`);
//     if(dataCount.length>1){
//         binanceStream.close();
//     }
// });

// const binanceETHStream = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/ethusdt@markPrice");
// const dataCountEth = [];
// binanceETHStream.on("message", function(message){
//     dataCountEth.push(message);
//     console.log(`ETH | USDT: ${message}`);
//     if(dataCountEth.length>1){
//         binanceETHStream.close();
//     }
// });

// const binanceBTCStream = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/btcusdt@markPrice")
// const dataCountBtc = [];
// binanceBTCStream.on("message",function(message){
//     dataCountBtc.push(message);
//     console.log(`BTC | USDT: ${message}`);
//     if(dataCountBtc.length>1){
//         binanceBTCStream.close();
//     }
// });


//instead of PUB/SUB i have to use websockets since it's apparently a infrastructure thing, lemme just
//now let us get three asset websockets
// const streamSOLUSDT = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/solusdt@markPrice");
// const streamETHUSDT = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/ethusdt@markPrice");
// const streamBTCUSDT = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/btcusdt@markPrice");

// const streamServer = new WebSocketServer({port: 8080});
// streamServer.on('connection',function(ws){
//     ws.on('error',(error)=>{
//         console.log(error);
//     });
//     let data: WebSocket.RawData[] = [];
//     streamSOLUSDT.on('message',(message)=>{
//         data.push(message);
//         console.log(`SOL | USDT: ${message}`);
//     });
//     streamETHUSDT.on('message',(message)=>{
//         data.push(message);
//         console.log(`ETH | USDT: ${message}`);
//     });
//     streamBTCUSDT.on('message',(message)=>{
//         data.push(message);
//         console.log(`BTC | USDT: ${message}`);
//     });
//     ws.send(data);
// });

// const streamServer = new WebSocketServer({port: 8080});
// streamServer.on('connection',function(ws){
//     streamSOLUSDT.on('message',(message)=>{
//         ws.send(`SOL | USDT`);
//     });
//     streamBTCUSDT.on('message',(message)=>{
//         ws.send(`BTC | USDT`);
//     });
//     streamETHUSDT.on('message',(message)=>{
//         ws.send(`ETH | USDT`);
//     })
// });


//have to send the info using a queue instead of a websocket server
// const StreamServer = new WebSocketServer({port: 8080});
// StreamServer.on('connection', (ws)=>{
//     let dataList: any = [];
//     ws.on('error',(error)=>{
//         console.log(error);
//     });
//     streamSOLUSDT.on('message',(data)=>{
//         ws.send(data.toString());
//     });
//     streamETHUSDT.on('message',(data)=>{
//         ws.send(data.toString());
//     });
//     streamBTCUSDT.on('message',(data)=>{
//         ws.send(data.toString());
//     });
// });
// import {Queue, Worker} from 'bullmq';
// const myQueue = new Queue('myqueue', {
//     connection: {
//         host: 'myredis.taskforce.run',
//         port: 32856,
//     },
// });

// const myWorker = new Worker('myqueue',async job =>{},{connection: {
//     host: 'myredis.taskforce.run',
//     port: 32856,
// }});

//Guess I have to use RabbitMQ for queue messaging 


//USE THIS 

// const rabbit = new Connection("amqp://guest:guest@localhost:5672");
// rabbit.on('error',(error)=>{
//     console.log(`RabbitMq connection error ${error}`);  
// });

// rabbit.on('connection',()=>{
//     console.log(`Connection successfully established`);
// });

// const sub = rabbit.createConsumer({
//     queue: 'user-events',
//     queueOptions: {durable: true},
//     //handle 2 messages at a time 
//     qos: {prefetchCount: 2},
//     exchanges: [{exchange: "my-events",type: "topic"}],
//     queueBindings: [{exchange: "my-events",routingKey: 'users.*'}],    
// }, async (message)=>{
//     console.log(`Recieved message: ${message}`);
// });

// sub.on('error',(error)=>{
//     console.log(`Consumer error: ${error}`);
// });


// const publisher = rabbit.createPublisher({
//     confirm: true,
//     maxAttempts: 2,
//     exchanges: [{exchange: "my-events",type: "topic"}],
// });

// //publishing a message to a custom exhcange 
// await publisher.send({exchange: 'my-events',routingKey: 'users.visit'},
//     {id: 1, name: "Alan Turing"}
// );

// await publisher.send('user-events',{id: 1, name: "Alan Turing"});
// //upon recieving a shutdown signal 
// await publisher.close();
// await sub.close();

// //trying to spin up a queue

// import { Connection } from "rabbitmq-client";
// const rabbit = new Connection('amqp://guest:guest@localhost:5672');
// rabbit.on('connection',()=>{
//     console.log('Rabbit-mq connection error')
// });



// const rabbit = new Connection("amqp://guest:guest@localhost:5672");
// rabbit.on('error',(error)=>{
//     console.log(`error ${error}`);
// });

// rabbit.on('connection',()=>{
//     console.log("Connected successfully");
// });

// const pub = rabbit.createPublisher({
//     confirm: true
// });

// await rabbit.queueDeclare({queue: "my-queue"});


// // await pub.send({},{name: "Alan Turing"});
// const rabbit = new Connection("amqp://guest:guest@localhost:5672");
// rabbit.on('error',(error)=>{
//     console.log(`Rabbitmq connection error: ${error}`);
// });

// rabbit.on('connection',()=>{
//     console.log("Client connected successfully");
// });

// const pub = rabbit.createPublisher({
//     confirm: true,
//     exchanges: [{exchange: 'my-events', type: 'topic'}],
//     //@ts-ignore
//     maxAttempts: true
// });

// await pub.send('user-events',{id: 1, name: 'Alan Turing'});
// setInterval(async ()=>{
//     await pub.send('user-events',{id: 1, name: 'Alan Turing'});
// },2000);
import WebSocket, {WebSocketServer} from "ws";
const streamSOLUSDT = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@bookTicker");
const streamETHUSDT = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@bookTicker");
const streamBTCUSDT = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker");
import {Connection} from 'rabbitmq-client';

const rabbit = new Connection('amqp://guest:guest@localhost:5672');
rabbit.on('error',(error)=>{
    console.log(`Rabbit MQ connection error: ${error}`);
});

rabbit.on('connection',()=>{
    console.log(`Connection with subscribers(pub-sub & batch-uploader) established successfully`);
});

const pub = rabbit.createPublisher({
    confirm: true,
    maxAttempts: 2,
    exchanges: [{exchange: 'CRYPTO', type: 'TRADE'}],
});

streamSOLUSDT.on('message',(message)=>{
    console.log(message.toString());
});

streamETHUSDT.on('message',(message)=>{
    console.log(message.toString());
});

streamBTCUSDT.on('message',(message)=>{
    console.log(message.toString());
});

await pub.send({exchange: "CRYPTO", routingKey: 'price.*'},{
    data: {}
})