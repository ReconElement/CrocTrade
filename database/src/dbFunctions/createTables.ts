import pg from 'pg';
const {Pool, Client} = pg;
const client1 = new Client({
    user: "postgres",
    password: "omkarpanda88",
    host: "localhost",
    port: 5433
});
async function createTable1(){
    try{
        await client1.connect();
        const create = await client1.query(`
            CREATE TABLE coin_ticks (
                "time" TIMESTAMPTZ,
                symbol TEXT,
                buy_price DOUBLE PRECISION,
                sell_price DOUBLE PRECISION
            ) WITH (
                tsdb.hypertable,
                tsdb.partition_column='time',
                tsdb.segmentby = 'symbol',
                tsdb.orderby = 'time DESC'
            );
        `);
    }catch(e){
        console.log(`Some error occured ${e}`);
    }
};

async function createTable2(){
    try{
        const create = await client1.query(`
            CREATE TABLE coin_assets (
                symbol TEXT UNIQUE,
                "name" TEXT
            );
        `);
    }catch(e){
        console.log(`Some error occured ${e}`);
    }
};

export {createTable1, createTable2};
