import giveThread from "../Database/returnLocationPool.js"


async function UpdateLocation(bus_name, lat, long) {
  const client = await giveThread();

  try {
    const insert_query = 'UPDATE buslocation SET plat = $1, plong = $2 WHERE bus_name = $3;';
    const result = await client.query(insert_query, [lat, long,bus_name]);

    if (result.rowCount > 0) {
      console.log(`Successfully inserted data into Postgres for ${bus_name}`);
    } else {
      console.log(`No rows were affected when inserting data for ${bus_name}`);
    }
  } catch (error) {
    console.error("Error inserting data into Postgres:", error);
  } finally {
    // Always release the client back to the pool when done
    client.release();
  }
}

export default UpdateLocation;
