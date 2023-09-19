import pg  from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const location_pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });



async function giveLocationThread(){
      try {
            // Acquire a client from the pool
            const client = await location_pool.connect();
            return client
      }
      catch(error){
        console.log(error)
      }
      
}

let a = giveLocationThread();


export default giveLocationThread;


