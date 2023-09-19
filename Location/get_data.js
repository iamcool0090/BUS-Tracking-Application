
import dotenv from 'dotenv';
import giveThread from '../Database/returnPool.js';
dotenv.config();


async function getRowAsJSON(location) {
  // Use environment variables from .env file

  try {
    // Acquire a client from the pool
    const client = await giveThread();

    // Define the SQL query to retrieve a row as JSON
    const query = `
      SELECT * FROM bus_stops WHERE name = $1
    `;

    // Set the value of $1 (assuming you want to retrieve by ID)
    const id = location;
    
    // Execute the query and retrieve the result as JSON
    const result = await client.query(query, [id]);

    // Check if a row was found
    if (result.rows.length === 0) {
      console.log(`Could not find location : ${id}`);
    } else {
      // Extract the JSON data from the result
      const rowDataAsJSON = result.rows[0];

      // Print the row as JSON
    //   console.log(JSON.stringify(rowDataAsJSON, null, 2));

      // Release the client back to the pool
      client.release();

      return rowDataAsJSON;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export default getRowAsJSON;
