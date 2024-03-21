const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'my_travel_app')));
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'my_travel_app', 'index.html'));
});

app.listen(3001, () => {
    require('child_process').exec('start http://localhost:3001/');
  });
 
module.exports=app;
// // ---------------------------------------
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://testuser1:testuser1pass@cluster0.ooatmgc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connecDatabase() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      const database = client.db('TravelApp');
      const dests = database.collection('Destinations');
      const query = { _id: 1 };
    const options = {
      sort: { "name": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, name: 1, description: 1 },
    };
    // Execute query
    const dest001 = await dests.findOne(query, options);
    // Print the document returned by findOne()
    console.log(dest001);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
connecDatabase().catch(console.dir);