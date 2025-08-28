import Redis from 'redis';
import WebSocket, {WebSocketServer} from 'ws';
import {EventEmitter} from 'events';
//set max listeners to 20 
EventEmitter.defaultMaxListeners = 20;
const webSocketServer = new WebSocketServer({port: 8080});
async function Subscribe(){
    const client = Redis.createClient();
    const susbcriber = client.duplicate();
    const connection = await susbcriber.connect();
    if(connection){
        await susbcriber.subscribe('stream',async (data)=>{
            // const webSocketServer = new WebSocketServer({port: 8080});
            webSocketServer.on('connection',async (ws)=>{
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

await Subscribe();
// await webServer();

