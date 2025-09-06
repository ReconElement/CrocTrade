import Redis from 'redis';
import WebSocket, {WebSocketServer} from 'ws';
import {EventEmitter} from 'events';
//set max listeners to 20 
const subscriber = Redis.createClient();
EventEmitter.defaultMaxListeners = 20;
const webSocketServer = new WebSocketServer({port: 8080});

async function Subscribe(){
    const connection = await subscriber.connect();
    if(connection){
        webSocketServer.on('connection',async (ws)=>{
            await subscriber.subscribe('stream',async (data)=>{
                ws.send(data);
                console.log(JSON.parse(data));
            })
        });
    }
};


await Subscribe();
