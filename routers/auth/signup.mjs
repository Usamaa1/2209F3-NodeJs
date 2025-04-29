import express from 'express';
import { client, database } from '../../connection/connection.mjs';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
const signupRouter = express.Router();


signupRouter.post('/signup', async (req, res) => {

    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password
    ) {
        res.status(401).send({ message: "One feild is empty" });
        return;
    }


    try {
        const haiku = database.collection("2209F3CL");

       let foundEmail = await haiku.findOne({email: req.body.email})
       console.log(foundEmail)

       if(foundEmail)
        {
           res.status(403).send({message: "Email is already exist!"}) 
           return;
        }


        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            // Store hash in your password DB.
            console.log(req.body)
            const result = await haiku.insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            });
            res.send(`A User was created with the _id: ${result.insertedId}`);
        });

        // Insert the defined document into the "haiku" collection
   
        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    }
    catch (e) {
        console.error(e);
    }





})


export default signupRouter;
