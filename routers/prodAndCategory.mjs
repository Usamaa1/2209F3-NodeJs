import express from 'express';
import { client, database } from '../connection/connection.mjs';
const productAndCategoryRouter = express.Router();


productAndCategoryRouter.get('/productsWithCategory', async (req, res) => {
    try {
      
      const cl = database.collection("product");
      const products = await cl.aggregate([
        {
          $lookup: {
            from: 'category',           
            localField: 'categoryId', 
            foreignField: '_id',      
            as: 'categoryInfo'
          }
        }           
      ]).toArray();
  
      res.send(products);


    } catch (err) {

      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  });
  
  export default productAndCategoryRouter;