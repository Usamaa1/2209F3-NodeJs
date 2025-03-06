import express from 'express';
import { client, database } from '../connection/connection.mjs';
import { ObjectId } from 'mongodb';
const postRouter = express.Router();


postRouter.post('/post',async (req,res)=>{

    try{
        const haiku = database.collection("haiku");


      
          // Insert the defined document into the "haiku" collection

          console.log(req.body)
          const result = await haiku.insertOne({
            title: req.body.title,
            description: req.body.description,
            likes: req.body.likes
          });
          // Print the ID of the inserted document
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
          res.send(`A document was inserted with the _id: ${result.insertedId}`);
    
    }
    catch(e)
    {
        console.error(e);
    }
    // finally {
    //     // Close the MongoDB client connection
    //    await client.close();
    //  }
  



});



postRouter.get('/post',async (req,res)=>{
    try {
        const haiku = database.collection("haiku");

        const cursor = await haiku.find({}).toArray();


        console.log(cursor);


        res.send(cursor)



        
    } catch (error) {
        console.log(error)
    }
})

postRouter.get('/post/:search',async (req,res)=>{
    try {
        const haiku = database.collection("haiku");


        const data = await haiku.findOne({title: {$regex:  new RegExp(req.params.search)}});


        console.log(data);


        res.send(data)



        
    } catch (error) {
        console.log(error)
    }
})
// postRouter.get('/post/:id',async (req,res)=>{
//     try {
//         const haiku = database.collection("haiku");

//         const data = await haiku.findOne({_id: new ObjectId(req.params.id)});


//         console.log(data);


//         res.send(data)



        
//     } catch (error) {
//         console.log(error)
//     }
// })

postRouter.delete('/post/:id',async (req,res)=>{
    try {
        const haiku = database.collection("haiku");


        const result = await haiku.deleteOne({_id : new ObjectId(req.params.id)});


        console.log(result);
        


        res.send({result: result, message: "Item Deleted"}).status(200);



        
    } catch (error) {
        res.send({result: error, message: "Item not Deleted"}).status(403);
        console.log(error)
    }
})

postRouter.put('/post/:id',async (req,res)=>{
    try {
        const haiku = database.collection("haiku");


        const result = await haiku.updateOne({_id : new ObjectId(req.params.id)},  {
            $set: {
                title: req.body.title,
                description: req.body.description,
                likes: req.body.likes
            },
          },/*{ upsert: true }*/);

        console.log(req.body)


        console.log(result);
        


        res.send({ message: "Item Updated"}).status(200);



        
    } catch (error) {
        res.send({result: error, message: "Item not Updated"}).status(403);
        console.log(error)
    }
})



export default postRouter;