import express from 'express'
import postRouter from './routers/posts.mjs';
const app = express()
const port = 3000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})