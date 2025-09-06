import Redis from 'redis';
import WebSocket, {WebSocketServer} from 'ws';
import pg from 'pg';
const {Pool, Client} = pg;
const subscriber = Redis.createClient();
// async function subscribe(){
//     const connection = await subscriber.connect();
//     if(connection){
//         await subscriber.subscribe('stream',async (data)=>{
//             console.log(data);
//         })
//     }
// }
const client = new Client({
    user: "postgres",
    password: "omkarpanda88",
    host:"localhost",
    port: 5433,
});
try{
    const connection = client.connect();
    const result = await client.query('SELECT NOW()');
    console.log(result);
}catch(e){
    console.log(`Error occurred: ${e}`);
};


// async function subscribeWriteBatch(){
//     const connection = await subscriber.connect();
//     if(connection){
//         await subscriber.subscribe('stream',async (data)=>{
//             console.log(JSON.parse(data.toString()));
//         })
//     }
// };

//https://github.com/timescale/timescaledb-parallel-copy
// https://docs.tigerdata.com/use-timescale/latest/write-data/insert/
//placing this in global scope
 let sampleInsert = `INSERT INTO coin_ticks(time, symbol, buy_price, sell_price)  
        VALUES 
    `;
async function WebsocketPipeline(){
    const time = new Date();
    const DB_TABLE = 'coin_ticks';
    const DB_COLUMNS = ['time','symbol','buy_price','sell_price'];
    let batch: object[] = [];
    //batch size to insert data in batches
    const MAX_BATCH_SIZE = 200;
    const connection = await subscriber.connect();

    if(connection){
        await subscriber.subscribe('stream', async (data)=>{
            // console.log(JSON.parse(data.toString()).data);
            batch.push(JSON.parse(data.toString()).data);
            let symbol = JSON.parse(data.toString()).data.s.replace("USDT","");
            let buy_price: number = Number(JSON.parse(data.toString()).data.b);
            let sell_price: number = Number(JSON.parse(data.toString()).data.a);
            sampleInsert.concat(`VALUES (NOW(), '${symbol}', ${buy_price}, ${sell_price})`);
            // console.log(`VALUES (NOW(),'${symbol}, ${buy_price}, ${sell_price})`);
            if(batch.length>=MAX_BATCH_SIZE){
                sampleInsert.concat(';');
                console.log(sampleInsert);
                sampleInsert = `INSERT INTO coin_ticks(time, symbol, buy_price, sell_price)`;
                batch = [];
            }
        });
    }
};

// await WebsocketPipeline();

async function WebsocketPipelineV2(){
    let batch: object[] = [];
    const MAX_BATCH_SIZE = 200;
    let newSampleInsert = `INSERT INTO coin_ticks(time, symbol, buy_price, sell_price) VALUES`; 
    const connection = await subscriber.connect();
    if(connection){
        await subscriber.subscribe('stream', async (data)=>{
            batch.push(JSON.parse(data.toString()).data);
            let symbol = JSON.parse(data.toString()).data.s.replace('USDT','');
            let buy_price: number = Number(JSON.parse(data.toString()).data.b);
            let sell_price: number = Number(JSON.parse(data.toString()).data.a);
            newSampleInsert = newSampleInsert.concat(` (NOW(), '${symbol}', ${buy_price}, ${sell_price}),`);
            sampleInsert = newSampleInsert;
            if(batch.length>=MAX_BATCH_SIZE){
                batch = [];
                sampleInsert = sampleInsert.substring(0, sampleInsert.length-1);
                console.log(sampleInsert+';');
                sampleInsert = sampleInsert + ';';
                // sampleInsert = `INSERT INTO coin_ticks(time, symbol, buy_price, sell_price)`;
                try{
                    const result = client.query(sampleInsert);
                    console.log(result);
                }catch(e){
                    console.log(`Some error occured: ${e}`);
                }
            }
        })
    }
}
await WebsocketPipelineV2();


// SELECT time_bucket('30 seconds', time) AS bucket,
// AVG(buy_price) AS avg_buy_price FROM "coin_ticks" WHERE symbol='BTC'  GROUP BY bucket ORDER BY bucket ASC;
