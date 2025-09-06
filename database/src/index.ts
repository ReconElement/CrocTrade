import pg from 'pg';
const {Pool, Client} = pg;
import {createTable1, createTable2} from './dbFunctions/createTables.js'
// const client = new Client({
//     user: "postgres",
//     password:"omkarpanda88",
//     host: "localhost",
//     port: 5433
// });

// try{
//     const connection = client.connect();
//     const result = await client.query('SELECT NOW()');
//     console.log(result);
// }catch(e){
//     console.log(`Error occurred: ${e}`);
// }


// try{
//     await createTable1();
//     await createTable2();
// }catch(e){
//     console.log(`Some error occurred ${e}`);
// }

async function createTables() {
  try {
    await createTable1();
  } catch (e) {
    console.log(`Some error occurred ${e}`);
  }

  try {
    await createTable2();
  } catch (e) {
    console.log(`Some error occurred ${e}`);
  }
}

await createTables();
