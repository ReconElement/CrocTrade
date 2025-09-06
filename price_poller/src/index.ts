// // import WebSocket from "ws";
// // const binanceStream = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/solusdt@markPrice");
// // const dataCount = [];
// // binanceStream.on("message", function(data){
// //     dataCount.push(data);
// //     console.log(`SOL | USDT: ${data}`);
// //     if(dataCount.length>1){
// //         binanceStream.close();
// //     }
// // });

// // const binanceETHStream = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/ethusdt@markPrice");
// // const dataCountEth = [];
// // binanceETHStream.on("message", function(message){
// //     dataCountEth.push(message);
// //     console.log(`ETH | USDT: ${message}`);
// //     if(dataCountEth.length>1){
// //         binanceETHStream.close();
// //     }
// // });

// // const binanceBTCStream = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/btcusdt@markPrice")
// // const dataCountBtc = [];
// // binanceBTCStream.on("message",function(message){
// //     dataCountBtc.push(message);
// //     console.log(`BTC | USDT: ${message}`);
// //     if(dataCountBtc.length>1){
// //         binanceBTCStream.close();
// //     }
// // });


// //instead of PUB/SUB i have to use websockets since it's apparently a infrastructure thing, lemme just
// //now let us get three asset websockets
// // const streamSOLUSDT = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/solusdt@markPrice");
// // const streamETHUSDT = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/ethusdt@markPrice");
// // const streamBTCUSDT = new WebSocket("wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/btcusdt@markPrice");

// // const streamServer = new WebSocketServer({port: 8080});
// // streamServer.on('connection',function(ws){
// //     ws.on('error',(error)=>{
// //         console.log(error);
// //     });
// //     let data: WebSocket.RawData[] = [];
// //     streamSOLUSDT.on('message',(message)=>{
// //         data.push(message);
// //         console.log(`SOL | USDT: ${message}`);
// //     });
// //     streamETHUSDT.on('message',(message)=>{
// //         data.push(message);
// //         console.log(`ETH | USDT: ${message}`);
// //     });
// //     streamBTCUSDT.on('message',(message)=>{
// //         data.push(message);
// //         console.log(`BTC | USDT: ${message}`);
// //     });
// //     ws.send(data);
// // });

// // const streamServer = new WebSocketServer({port: 8080});
// // streamServer.on('connection',function(ws){
// //     streamSOLUSDT.on('message',(message)=>{
// //         ws.send(`SOL | USDT`);
// //     });
// //     streamBTCUSDT.on('message',(message)=>{
// //         ws.send(`BTC | USDT`);
// //     });
// //     streamETHUSDT.on('message',(message)=>{
// //         ws.send(`ETH | USDT`);
// //     })
// // });


// //have to send the info using a queue instead of a websocket server
// // const StreamServer = new WebSocketServer({port: 8080});
// // StreamServer.on('connection', (ws)=>{
// //     let dataList: any = [];
// //     ws.on('error',(error)=>{
// //         console.log(error);
// //     });
// //     streamSOLUSDT.on('message',(data)=>{
// //         ws.send(data.toString());
// //     });
// //     streamETHUSDT.on('message',(data)=>{
// //         ws.send(data.toString());
// //     });
// //     streamBTCUSDT.on('message',(data)=>{
// //         ws.send(data.toString());
// //     });
// // });
// // import {Queue, Worker} from 'bullmq';
// // const myQueue = new Queue('myqueue', {
// //     connection: {
// //         host: 'myredis.taskforce.run',
// //         port: 32856,
// //     },
// // });

// // const myWorker = new Worker('myqueue',async job =>{},{connection: {
// //     host: 'myredis.taskforce.run',
// //     port: 32856,
// // }});

// //Guess I have to use RabbitMQ for queue messaging 


// //USE THIS 

// // const rabbit = new Connection("amqp://guest:guest@localhost:5672");
// // rabbit.on('error',(error)=>{
// //     console.log(`RabbitMq connection error ${error}`);  
// // });

// // rabbit.on('connection',()=>{
// //     console.log(`Connection successfully established`);
// // });

// // const sub = rabbit.createConsumer({
// //     queue: 'user-events',
// //     queueOptions: {durable: true},
// //     //handle 2 messages at a time 
// //     qos: {prefetchCount: 2},
// //     exchanges: [{exchange: "my-events",type: "topic"}],
// //     queueBindings: [{exchange: "my-events",routingKey: 'users.*'}],    
// // }, async (message)=>{
// //     console.log(`Recieved message: ${message}`);
// // });

// // sub.on('error',(error)=>{
// //     console.log(`Consumer error: ${error}`);
// // });


// // const publisher = rabbit.createPublisher({
// //     confirm: true,
// //     maxAttempts: 2,
// //     exchanges: [{exchange: "my-events",type: "topic"}],
// // });

// // //publishing a message to a custom exhcange 
// // await publisher.send({exchange: 'my-events',routingKey: 'users.visit'},
// //     {id: 1, name: "Alan Turing"}
// // );

// // await publisher.send('user-events',{id: 1, name: "Alan Turing"});
// // //upon recieving a shutdown signal 
// // await publisher.close();
// // await sub.close();

// // //trying to spin up a queue

// // import { Connection } from "rabbitmq-client";
// // const rabbit = new Connection('amqp://guest:guest@localhost:5672');
// // rabbit.on('connection',()=>{
// //     console.log('Rabbit-mq connection error')
// // });



// // const rabbit = new Connection("amqp://guest:guest@localhost:5672");
// // rabbit.on('error',(error)=>{
// //     console.log(`error ${error}`);
// // });

// // rabbit.on('connection',()=>{
// //     console.log("Connected successfully");
// // });

// // const pub = rabbit.createPublisher({
// //     confirm: true
// // });

// // await rabbit.queueDeclare({queue: "my-queue"});


// // // await pub.send({},{name: "Alan Turing"});
// // const rabbit = new Connection("amqp://guest:guest@localhost:5672");
// // rabbit.on('error',(error)=>{
// //     console.log(`Rabbitmq connection error: ${error}`);
// // });

// // rabbit.on('connection',()=>{
// //     console.log("Client connected successfully");
// // });

// // const pub = rabbit.createPublisher({
// //     confirm: true,
// //     exchanges: [{exchange: 'my-events', type: 'topic'}],
// //     //@ts-ignore
// //     maxAttempts: true
// // });

// // await pub.send('user-events',{id: 1, name: 'Alan Turing'});
// // setInterval(async ()=>{
// //     await pub.send('user-events',{id: 1, name: 'Alan Turing'});
// // },2000);
// // import {Connection} from 'rabbitmq-client';

// // const rabbit = new Connection('amqp://guest:guest@localhost:5672');
// // rabbit.on('error',(error)=>{
// //     console.log(`Rabbit MQ connection error: ${error}`);
// // });

// // rabbit.on('connection',()=>{
// //     console.log(`Connection with subscribers(pub-sub & batch-uploader) established successfully`);
// // });

// // const pub = rabbit.createPublisher({
// //     confirm: true,
// //     maxAttempts: 2,
// //     exchanges: [{exchange: 'CRYPTO', type: 'TRADE'}],
// // });

// // streamSOLUSDT.on('message',(message)=>{
// //     console.log(message.toString());
// // });

// // streamETHUSDT.on('message',(message)=>{
// //     console.log(message.toString());
// // });

// // streamBTCUSDT.on('message',(message)=>{
// //     console.log(message.toString());
// // });

// // await pub.send({exchange: "CRYPTO", routingKey: 'price.*'},{
    
// // });


// // // async function SendData(){
// // //     streamSOLUSDT.on('message',(data1)=>{
// // //         streamETHUSDT.on('message',(data2)=>{
// // //             streamBTCUSDT.on('message',(data3)=>{
// // //                 pub.send({exchange: "CRYPTO",routingKey: `price.*`},{
// // //                     data: {data1, data2, data3}
// // //                 })
// // //             })
// // //         })
// // //     })
// // // }
// // // SendData();


// // (async ()=>{
// //     const queue = 'tasks';
// //     const conn = await amqplib.connect('amqp://localhost');//if it does not work, use the default one
// //     const ch1 = await conn.createChannel();
// //     await ch1.assertQueue(queue);
// //     ch1.consume(queue, (message)=>{
// //         if(message!=null){
// //             console.log(message.content.toString());
// //         }
// //         else{
// //             console.log('Consumer cancelled by server');
// //         }
// //     })
// // })

// // async function main(){
// //        const queue = 'tasks';
// //     const conn = await amqplib.connect('amqp://localhost');//if it does not work, use the default one
// //     const ch1 = await conn.createChannel();
// //     await ch1.assertQueue(queue);
// //     ch1.consume(queue, (message)=>{
// //         if(message!=null){
// //             console.log(message.content.toString());
// //         }
// //         else{
// //             console.log('Consumer cancelled by server');
// //         }
// //     })
// // };

// // await main();

// // import Queue from "bull";
// // const redisConfig = {
// //     host: "127.0.0.1",
// //     port: 6379,
// // };

// // const myQueue = new Queue('myQueue',{redis: redisConfig});

// // const main = async ()=>{
// //     await myQueue.add({Name: "Omkar", age: 23});
// //     myQueue.process((job, done)=>{
// //         console.log(job.data);
// //         done();
// //     })
// // }
// // main();

// // const sendDataPubSubRedis = async ()=>{
// //     // const publisher = Redis.createClient();
// //     // const connection = await publisher.connect();
// //     // if(connection){
// //     //     await publisher.publish('stream',JSON.stringify({"name":"Omkar"}));
// //     // }
// //     const publisher = Redis.createClient();
// //     const connection = await publisher.connect();
// //     if(connection){
// //         // streamBTCUSDT.on('message',async (data)=>{
// //         //     await publisher.publish('stream',JSON.stringify("Hello"));
// //         // });
// //         // streamETHUSDT.on('message',async (data)=>{
// //         //     await publisher.publish('stream', JSON.stringify("Hello"));
// //         // });
// //         // streamSOLUSDT.on('message',async (data)=>{
// //         //     await publisher.publish('stream',JSON.stringify("Hello"));
// //         // });
// //     //     const dataStream: WebSocket.RawData[] = [];
// //     //     streamBTCUSDT.on('message',async (data)=>{
// //     //         dataStream.push(data);
// //     //         streamETHUSDT.on('message',async (data)=>{
// //     //             dataStream.push(data);
// //     //             streamSOLUSDT.on('message', async (data)=>{
// //     //                 dataStream.push(data);
// //     //                 await publisher.publish('stream', JSON.stringify(dataStream.toString()))
// //     //             })
// //     //         })
// //     //     })
// //     // };
// //     streamBTCUSDT.on('message',async (data)=>{
// //         await publisher.publish('stream',JSON.stringify(data.toString()));
// //     })
// //     streamETHUSDT.on('message',async (data)=>{
// //         await publisher.publish('stream', JSON.stringify(data.toString()));
// //     })
// //     streamSOLUSDT.on('message',async (data)=>{
// //         await publisher.publish('stream', JSON.stringify(data.toString()));
// //     });
// // }
// // }
// // await sendDataPubSubRedis();
// //The publisher part of the websocket apparently resides inside the price-poller it is not a seperate component 
// // streamSOLUSDT.on('message',(data1)=>{
// //     // console.log(JSON.parse(data.toString()));
// //     streamETHUSDT.on('message',(data2)=>{
// //         streamBTCUSDT.on('message',(data3)=>{
// //             const object = {
// //                 price_updates: [{
// //                     symbol: "BTC",
// //                     buyPrice: JSON.parse(data3.toString()).b,
// //                     sellPrice: JSON.parse(data3.toString()).a,
// //                     decimals: 8
// //                 },{
// //                     symbol: "SOL",
// //                     buyPrice: JSON.parse(data1.toString()).b,
// //                     sellPrice: JSON.parse(data1.toString()).a,
// //                     decimals: 8
// //                 },{
// //                     symbol: "ETH",
// //                     buyPrice: JSON.parse(data2.toString()).b,
// //                     sellPrice: JSON.parse(data2.toString()).a,
// //                     decimals: 8
// //                 }]
// //             }
// //         })
// //     });
// // });
// import Queue from "bull";
// import WebSocket, {WebSocketServer} from "ws";
// import Redis from 'redis';
// const streamSOLUSDT = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@bookTicker",);
// const streamETHUSDT = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@bookTicker");
// const streamBTCUSDT = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker");
// const redisConfig = {
//     host: "127.0.0.1",
//     port: 6379
// };

// // const dataQueue = new Queue('dataQueue',{redis: redisConfig});
// const sendDataWebsocket = async ()=>{
//     let dataStream: WebSocket.RawData[] = [];
//     //trying through websocket server stream
//     const wss = new WebSocketServer();
//     wss.on('connection',function(ws){
//         ws.on('error',(err)=>{
//             console.log(`Error occurred in websocket server: ${err}`);
//         })
//         streamBTCUSDT.on('message',(data)=>{
//             ws.send(data);
//         });
//         streamETHUSDT.on('message',(data)=>{
//             ws.send(data);
//         });
//         streamSOLUSDT.on('message',(data)=>{
//             ws.send(data);
//         })
//     })
// };
// const sendDataQueueRedis = async ()=>{
//     const dataQueue = new Queue('dataQueue',{redis: redisConfig});
//     streamBTCUSDT.on('message',(data)=>{
//         dataQueue.add(data);
//     });
//     streamETHUSDT.on('message',(data)=>{
//         dataQueue.add(data);
//     });
//     streamSOLUSDT.on('message',(data)=>{
//         dataQueue.add(data);
//     });
// };

// function throttle(func: ()=>{}, timeFrame: number){
//     var lastTime = 0;
//     return function(){
//         var now = Date.now();
//         if(now-lastTime>=timeFrame){
//             func();
//             lastTime = now;
//         }
//     }
// }
// const sendDataPubSubRedis = async ()=>{
//     const publisher = Redis.createClient();
//     const connection = await publisher.connect();
//     if(connection){
//         streamBTCUSDT.on('message',async (data1)=>{
//             streamSOLUSDT.on('message', async (data2)=>{
//                 streamETHUSDT.on('message', async (data3)=>{
//                     const obj = {
//                         price_updates: [{
//                             symbol: "BTC",
//                             buyPrice: JSON.parse(data1.toString()).b,
//                             sellPrice: JSON.parse(data1.toString()).a,
//                             decimals: 8
//                         },{
//                             symbol: "SOL",
//                             buyPrice: JSON.parse(data2.toString()).b,
//                             sellPrice: JSON.parse(data2.toString()).a,
//                             decimals: 8
//                         },{
//                             symbol: "ETH",
//                             buyPrice: JSON.parse(data3.toString()).b,
//                             sellPrice: JSON.parse(data3.toString()).a,
//                             decimals: 8
//                         }]
//                     };
//                     // streamBTCUSDT.removeAllListeners();
//                     // streamETHUSDT.removeAllListeners();
//                     // streamSOLUSDT.removeAllListeners();
//                     await publisher.publish('stream',JSON.stringify(obj));
//                 })
//             })
//         })
//     }
//     // if(connection){
//     //     const obj = {
//     //         price_updates: [{}],
//     //     }
//         // streamBTCUSDT.on('message',async (data)=>{
//         //     obj.price_updates.push({
//         //         symbol: "BTC",
//         //         buyPrice: JSON.parse(data.toString()).b,
//         //         sellPrice: JSON.parse(data.toString()).a,
//         //         decimals: 8
//         //     });
//         // });
//     //     streamSOLUSDT.on('message',async (data)=>{
//     //         obj.price_updates.push({
//     //             symbol: "SOL",
//     //             buyPrice: JSON.parse(data.toString()).b,
//     //             sellPrice: JSON.parse(data.toString()).a,
//     //             decimals: 8
//     //         });
//     //     });
//     //     streamETHUSDT.on('message',async (data)=>{
//     //         obj.price_updates.push({
//     //             symbol: "ETH",
//     //             buyPrice: JSON.parse(data.toString()).b,
//     //             sellPrice: JSON.parse(data.toString()).a,
//     //             decimals: 8
//     //         });
//     //     });

//     //     await publisher.publish('stream',JSON.stringify(obj));
//     // }
// };

// const sendDataPubSubRedisWithThrottle = async ()=>{
//     const publisher = Redis.createClient();
//     const connection = await publisher.connect();
//     let dataContent: string[] = []
//     // if(connection){
//     //     setInterval(()=>{
//     //         streamBTCUSDT.on('message', async (data)=>{
//     //             dataContent.push(data.toString());
//     //             if(dataContent.length>10){
//     //                 await publisher.publish('stream',JSON.stringify(dataContent));
//     //                 streamBTCUSDT.on('close',()=>{})
//     //             }
//     //         }
//     //     )
//     //     dataContent.forEach((value)=>console.log(value));
//     //     dataContent = [];
//     //     },2000)
//     // }
//     // while(connection){
//     //     streamBTCUSDT.on('message',async (data)=>{
//     //         dataContent.push(data.toString());
//     //         if(dataContent.length>10){
//     //             await publisher.publish('stream',JSON.stringify(dataContent));
//     //             streamBTCUSDT.on('close',()=>{});
//     //         }
//     //     })
//     // }
//     // if(connection){
//     //     console.log("Reached 1");
//     //     while(connection){
//     //         // console.log("Reached 2");
//     //         streamBTCUSDT.on('message',async (data)=>{
//     //             console.log("Reached 3")
//     //             dataContent.push(data.toString());
//     //             if(dataContent.length>0){
//     //                 console.log("It has something")
//     //             }
//     //             if(dataContent.length>10){
                  
//     //                 // await publisher.publish('stream',JSON.stringify(dataContent));
//     //                 streamBTCUSDT.on('close',()=>{
//     //                     dataContent.forEach((value)=>console.log(value.toString()));
//     //                     // dataContent = [];
//     //                 });
//     //             }
//     //         })
//     //         streamBTCUSDT.close();
//     //     }
//     //     dataContent = [];
//     // }
//     // if(connection){
//     //     const dataList: WebSocket.RawData[] = [];
//     //     streamBTCUSDT.on('message',async (data)=>{
//     //         dataList.push(data);
//     //         if(dataList.length>10){
//     //             await publisher.publish('stream',JSON.stringify(dataContent));
//     //             streamBTCUSDT.close();
//     //         }
//     //     });
//     // }
//     // if(connection){
//     //     streamBTCUSDT.on('message',async (data)=>{
//     //         try{
//     //             await publisher.publish('stream',JSON.stringify(data));
//     //         }
//     //         catch(e){
//     //             console.log(e);
//     //         }
//     //     });
//     // }
// }

// // await sendDataPubSubRedis();

// async function sendDataPubSubRedisWebSocketInsidePublish(){
//     const publisher = Redis.createClient();
//     const connection = await publisher.connect();
//     if(connection){
//         // await publisher.publish('stream','hello world');
//          streamBTCUSDT.on('message',async (data1)=>{
//             // streamBTCUSDT.terminate();
//             streamSOLUSDT.on('message', async (data2)=>{
//                 // streamSOLUSDT.terminate();
//                 streamETHUSDT.on('message', async (data3)=>{
//                     // streamETHUSDT.terminate();
//                     const obj = {
//                         price_updates: [{
//                             symbol: "BTC",
//                             buyPrice: JSON.parse(data1.toString()).b,
//                             sellPrice: JSON.parse(data1.toString()).a,
//                             decimals: 8
//                         },{
//                             symbol: "SOL",
//                             buyPrice: JSON.parse(data2.toString()).b,
//                             sellPrice: JSON.parse(data2.toString()).a,
//                             decimals: 8
//                         },{
//                             symbol: "ETH",
//                             buyPrice: JSON.parse(data3.toString()).b,
//                             sellPrice: JSON.parse(data3.toString()).a,
//                             decimals: 8
//                         }]
//                     };
//                     // streamBTCUSDT.removeAllListeners();
//                     // streamETHUSDT.removeAllListeners();
//                     // streamSOLUSDT.removeAllListeners();
//                     await publisher.publish('stream',JSON.stringify(obj));
                    
//                 })
//             })
//     }
// )}};
// // await sendDataPubSubRedisWebSocketInsidePublish();
// type dataStream = {
//     u: number,
//     s: string,
//     b: string,
//     B: string, 
//     a: string,
//     A: string
// };
// async function aggregrate(data: WebSocket.RawData){
//     const publisher = Redis.createClient();
//     const connection = await publisher.connect();
//     let content: dataStream;
//     const obj = {
//         price_updates: [{}]
//     };
//     content = JSON.parse(data.toString());
//     while(obj?.price_updates.length!>3){
//         if(content?.s==='BTCUSDT'){
//             obj.price_updates.push({
//                 symbol: "BTC",
//                 buyPrice: content?.b,
//                 sellPrice: content?.a,
//                 decimals: 8
//             });
//             if(obj?.price_updates.length>3){
//                 await publisher.publish("stream",JSON.stringify(obj));
//                 obj.price_updates = [{}];
//             }
//         };
//         if(content?.s==='ETHUSDT'){
//              obj.price_updates.push({
//                 symbol: "ETH",
//                 buyPrice: content?.b,
//                 sellPrice: content?.a,
//                 decimals: 8
//             });
//             if(obj?.price_updates.length>3){
//                 await publisher.publish("stream",JSON.stringify(obj));
//                 obj.price_updates = [{}];
//             };
//         };
//           if(content?.s==='SOLUSDT'){
//              obj.price_updates.push({
//                 symbol: "SOL",
//                 buyPrice: content?.b,
//                 sellPrice: content?.a,
//                 decimals: 8
//             });
//             if(obj?.price_updates.length>3){
//                 await publisher.publish("stream",JSON.stringify(obj));
//                 obj.price_updates = [{}]
//             };
//         };

//     }
// }
// // async function sendData(){
// //     const publisher = Redis.createClient();
// //     const connection = await publisher.connect();
// //     if(connection){
// //         streamBTCUSDT.on('message',(data)=>{
// //             aggregrate(data);
// //         });
// //         streamSOLUSDT.on('message',(data)=>{
// //             aggregrate(data);
// //         });
// //         streamETHUSDT.on('message', (data)=>{
// //             aggregrate(data);
// //         })
// //     }
// // };
// // await sendData();
// // async function getData(){
// //     let value: WebSocket.RawData[]=[];
// //     streamBTCUSDT.on('message',async (data)=>{
// //         value.push(data);
// //     });
// //     streamETHUSDT.on("message",async (data)=>{
// //         value.push(data);
// //     });
// //     streamSOLUSDT.on("message",async (data)=>{
// //         value.push(data);
// //     });
// //     return value[value.length-1];
// // }
// // console.log(await getData());

// //getData function using WebSocketStream API 


// import { webSocket } from "rxjs/webSocket";
// const btc = webSocket("wss://stream.binance.com:9443/ws/solusdt@bookTicker");
// // function getData(){
// //     btc.subscribe({
// //         //@ts-ignore
// //         // next: data => console.log(JSON.stringify(data)),
// //         next: data => {return data}

// //     });
// // }
// function getData(){
//     return new Promise(function (resolve, reject){
//         btc.subscribe({
//             //@ts-ignore
//             next: data=> resolve(data),
//             error: e => reject(e)
//         })
//     })
// };

// getData().then(d=>console.log(d));


// function getDataWS(){
//     return new Promise(function (resolve, reject){
//         streamBTCUSDT.on('message',(data)=>{
//             resolve(JSON.parse(data.toString()));
//         }) 
//     })
// };
// getDataWS().then(d=>console.log(d));
import WebSocket, {WebSocketServer} from 'ws';
import Redis from 'redis';
const streamBTCUSDT = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker");
const streamETHUSDT = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@bookTicker");
const streamSOLUSDT = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@bookTicker");
const universal = new WebSocket("wss://stream.binance.com:9443/stream?streams=btcusdt@bookTicker/ethusdt@bookTicker/solusdt@bookTicker");
function getDataWS(ws: WebSocket){
    // let r = Math.random(); 
    return new Promise(function(resolve){
        ws.on('message',(data)=>{
            // console.log("hi there " + r);
            resolve(JSON.parse(data.toString()));
        });
    })
};
const publisher = Redis.createClient();
const connection = await publisher.connect();
const sendDataPubSubRedis = async ()=>{
    
    let obj = {};
    const price_updates: object[] = [];
    if(connection){
        const btc = getDataWS(streamBTCUSDT).then(d=>{
            price_updates.push({
                symbol:"BTC",
                //@ts-ignore
                buyPrice: d?.b,
                //@ts-ignore
                sellPrice: d?.a,
                decimals: 8
            });
            obj = {...price_updates};
            return(JSON.stringify(obj));
        });
        const eth = getDataWS(streamETHUSDT).then(d=>{
            price_updates.push({
                symbol: "ETH",
                //@ts-ignore
                buyPrice: d?.b,
                //@ts-ignore
                sellPrice: d?.a,
                decimals: 8
            });
            obj = {...price_updates};
            return(JSON.stringify(obj))
        });
        const sol = getDataWS(streamSOLUSDT).then(d=>{
            price_updates.push({
                symbol: "SOL",
                //@ts-ignore
                buyPrice: d?.b,
                //@ts-ignore
                sellPrice: d?.a,
                decimals: 8
            });
            obj = {...price_updates};
            return(JSON.stringify(obj));
        });
        
        if(await sol && await btc && await eth){
            console.log(JSON.stringify(obj));
            await publisher.publish("stream",JSON.stringify(obj));
        }
    }
};

// // await sendDataPubSubRedis();
// universal.on('message',(data)=>{
//     //@ts-ignore
//     console.log(data.toString());
// });

// 
// do(await sendDataPubSubRedis)
//  while (connection);
// do(await sendDataPubSubRedis())
// while(connection);

const sendDataWS = async ()=>{
    streamBTCUSDT.on('message',async (data1)=>{
        streamETHUSDT.on('message', async(data2)=>{
            streamSOLUSDT.on('message', async (data3)=>{
                 const obj = {
                        price_updates: [{
                            symbol: "BTC",
                            buyPrice: JSON.parse(data1.toString()).b,
                            sellPrice: JSON.parse(data1.toString()).a,
                            decimals: 8
                        },{
                            symbol: "SOL",
                            buyPrice: JSON.parse(data3.toString()).b,
                            sellPrice: JSON.parse(data3.toString()).a,
                            decimals: 8
                        },{
                            symbol: "ETH",
                            buyPrice: JSON.parse(data2.toString()).b,
                            sellPrice: JSON.parse(data2.toString()).a,
                            decimals: 8
                        }]
                    };
                    await publisher.publish("stream",JSON.stringify(obj));
            })
        })
    })
};

// await sendDataWS();

const sendCombinedDataWS = async ()=>{
    if(connection){
        universal.on('message',async (data)=>{
            await publisher.publish("stream", data.toString());
        })
    }
};

await sendCombinedDataWS();
