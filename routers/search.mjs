import express from 'express';
import { client, database } from '../connection/connection.mjs';
const searchRouter = express.Router();


 searchRouter.get('/products/search', async (req, res) => {
   
        try {
             
          const Product =  database.collection("products");

          // const { q } = req.query;
    
          const products = await Product.find({
            $or: [
              { name: { $regex: req.query.q, $options: 'i' } },
              { description: { $regex:  req.query.q, $options: 'i' } }
            ]
          }).toArray();
          // const products = await Product.find({}).toArray();

          console.log(products)
          res.send(products);
        } catch (err) {
          console.log(err)
          res.status(500).send({ error: "Server error" });
        }

})


export default searchRouter;



