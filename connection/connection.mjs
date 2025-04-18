import { MongoClient, ServerApiVersion } from 'mongodb';


// Replace the uri string with your connection string.
const uri = "mongodb+srv://dbuser:dbpassword@mycluster.u99q8.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";

export const client = new MongoClient(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// export const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
    // Ensures that the client will close when you finish/error
    await client.close();
    process.exit(1);
  }
}
run()

process.on('SIGINT', async () => {
  await client.close();
  console.log('🛑 MongoDB connection closed');
  process.exit(1);
});
export const database = client.db("ordinaryDB");