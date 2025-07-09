import express from 'express';
import { client, database } from '../connection/connection.mjs';
const sortRouter = express.Router();


export default sortRouter.get('/products/sort', async (req, res) => {
   
        try {
             
          const Product = database.collection("products");
          
          const { sort, order } = req.query;
          const sortOptions = {
            price: { price: order === 'asc' ? 1 : -1 },
            // date: { createdAt: order === 'asc' ? 1 : -1 },
            // rating: { averageRating: order === 'asc' ? 1 : -1 }
          };
          // const sortOptions = {
          //   price: { price: req.query.order === 'asc' ? 1 : -1 },
          //   date: { createdAt: req.query.order === 'asc' ? 1 : -1 },
          //   rating: { averageRating: req.query.order === 'asc' ? 1 : -1 }
          // };
      
          const products = await Product.find().sort(sortOptions[sort]).toArray();
      
          res.send(products);
        } catch (err) {
          console.log(err)
          res.status(500).send({ error: "Server error" });
        }

})






