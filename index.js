import express from 'express';
import getRowAsJSON from './Location/get_data.js';
import dotenv from 'dotenv';
import UpdateLocation from './Location/update_location.js';
import getLocationRowAsJSON from './Location/get_location.js';

dotenv.config();

const app = express();

app.use(express.json());

// app.get('/location/:locationValue', async (req, res) => {
//     const locationValue = req.params.locationValue;

//     try {
//         // Use await to wait for the promise to resolve
//         const data = await getRowAsJSON(locationValue);


//         // Send the JSON response
//         res.json(data);
//     } catch (error) {
//         console.error('Error:', error);
//         // Handle errors and send an appropriate response if needed
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.get('/info/:locationValue', async (req, res) => {
  const locationValue = req.params.locationValue;

  try {
      // Use await to wait for the promise to resolve
      const data = await getRowAsJSON(locationValue);


      // Send the JSON response
      res.json(data);
  } catch (error) {
      console.error('Error:', error);
      // Handle errors and send an appropriate response if needed
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/location/:bus_name' ,async (req,res) => {
    const bus_name = req.params.bus_name;


    try{
      const data = await getLocationRowAsJSON(bus_name);

      res.json(data);
    }catch(error){
      console.error('Error:', error);
      res.status(500).json({error : 'Internal Server Error'});
    }
});




app.put('/updateLocation', async (req, res) => {
    const { bus_name, lat, long } = req.body;
  
    try {
      await UpdateLocation(bus_name, lat, long);
      res.status(200).json({ message: `Location for ${bus_name} updated successfully.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
