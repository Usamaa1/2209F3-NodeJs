import express from 'express'
import postRouter from './routers/posts.mjs';
import signupRouter from './routers/auth/signup.mjs';
import loginRouter from './routers/auth/login.mjs';
import searchRouter from './routers/search.mjs'
import sortRouter from './routers/sort.mjs'
import postFilterRouter from './routers/postDateFilter.mjs'
import mailRouter from './routers/sendMail.mjs'
import imageRouter from './routers/imageUpload.mjs';
import 'dotenv/config';
import productAndCategoryRouter from './routers/prodAndCategory.mjs';
import cors from 'cors'



const app = express()
const port = process.env.PORT;
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let text = '';
function middleware(req, res, next) {
  console.log('Middleware')
  text = 'First Text'
  next()
}

app.use(middleware);

app.get('/first', (req, res, next) => {
  res.send(text)

})
app.get('/second', (req, res) => {
  res.send('Second')
})

app.use('/api/v1', postRouter);
app.use('/api/v1', signupRouter);
app.use('/api/v1', loginRouter);

app.use('/api/v1',searchRouter)
app.use('/api/v1',sortRouter)
app.use('/api/v1',postFilterRouter)
app.use('/api/v1',mailRouter)
app.use('/api/v1',imageRouter)
app.use('/api/v1',productAndCategoryRouter)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})