import Redis from 'redis';
import WebSocket, {WebSocketServer} from 'ws';
import {EventEmitter} from 'events';
//set max listeners to 20 
const subscriber = Redis.createClient();
EventEmitter.defaultMaxListeners = 20;
const webSocketServer = new WebSocketServer({port: 8080});

async function Subscribe(){
    // const client = Redis.createClient();
    // const susbcriber = client.duplicate();
    const connection = await subscriber.connect();
    if(connection){
        // await subscriber.subscribe('stream',async (data)=>{
        //     // const webSocketServer = new WebSocketServer({port: 8080});
        //     webSocketServer.on('connection', (ws)=>{
        //         ws.send(data);
        //     });
        //     // webSocketServer.removeAllListeners();
        //     console.log(webSocketServer.eventNames);
        // })
        // const webSocketServer = new WebSocketServer({port: 8080});
    //     webSocketServer.on('connection',(ws)=>{
    //         console.log(webSocketServer.eventNames.toString());
    //         setInterval(()=>{
    //             ws.send("Hello World");
    //         },1000);
    //     });
    // }
        webSocketServer.on('connection',async (ws)=>{
            await subscriber.subscribe('stream',async (data)=>{
                ws.send(data);
            })
        })
    }
};

// const webServer = async ()=>{
//     const webSocketServer = new WebSocketServer({port: 8080});
//     webSocketServer.on('connection',(ws)=>{
//         setInterval(()=>{
//             ws.send("It's working");
//         }, 1000);
//     });
// };

// await Subscribe();
// async function deleteRedisQueue(){
//     try{
//         subscriber.unsubscribe("stream");
//     }
//     catch(e){
//         console.log(e);
//     }
// };
// await deleteRedisQueue();

// await webServer();

await Subscribe();
