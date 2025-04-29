import express from 'express';
import { client, database } from '../../connection/connection.mjs';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const loginRouter = express.Router();


loginRouter.get('/login', async (req,res)=>{

    try {
        const haiku = database.collection("2209F3CL");

        let foundUser = await haiku.findOne({email: req.body.email})
        console.log(foundUser)
 
        if(!foundUser)
         {
            res.status(403).send({message: "Invalid Email"}) 
            return;
         }

        let passwordMatch = bcrypt.compare(req.body.password,foundUser.password);

        if(passwordMatch)
            {


            let token = jwt.sign(
            {
                userId: foundUser._id.toString(),
                createdIn: new Date().getTime()
            }, process.env.SECRET_CODE,{ expiresIn: '2m' });

            res.cookie("loginToken",token,{
                maxAge: 172800000
            });


            console.log(token)

            res.send({message: "User Login Successfull"})


            }

         
    } catch (error) {
        console.error(error);
    }    

})



export default loginRouter;








