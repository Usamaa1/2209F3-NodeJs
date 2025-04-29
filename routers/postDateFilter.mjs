import express from 'express';
import { client, database } from '../connection/connection.mjs';
const postFilterRouter = express.Router();


export default postFilterRouter.get('/products/postDateFilter', async (req, res) => {
   
        try {
             
          const Posts = database.collection("posts");

          const { start, end } = req.query;

          const startDate = new Date(start);
          const endDate = new Date(end);
          endDate.setHours(23, 59, 59, 999); // Include the full end day
        
          const posts = await Posts.find({
            createdAt: { $gte: startDate, $lte: endDate }
          }).toArray();

          res.send(posts);
        } catch (err) {
          res.status(500).send({ error: "Server error" });
        }

})






