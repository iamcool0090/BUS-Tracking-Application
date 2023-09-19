import pg  from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });



async function giveThread(){
      try {
            const client = await pool.connect();
            return client
      }
      catch(error){
        console.log("Error Creating a client from POOL, File : /Database/returnPool.js Line : 19")
      }
      
}


export default giveThread;


