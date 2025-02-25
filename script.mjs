import exp from 'constants';
import express from 'express';
import path from 'path';
// import cors from 'cors';
const app = express()
const port = process.env.PORT || 3000

const __dirname = path.resolve();

app.use(express.json());

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/profile',(req,res)=>{
  res.send({
    userName: 'Arif',
    phone: 982387847,
    city: 'Karachi'
  })
})

app.get('/post',(req,res)=>{
  res.send('This is my post')
})



app.get('/weather/:cityName',(req,res)=>{

  const weatherData = {
    karachi: {
      cityName: "Karachi",
      tempInC: 23,
      tempInF: 32,
      windDir: 'NS',
      humidity: '41%',
      precipitation: '1%',
      condition: "Haze"
    },
    lahore: {
      cityName: "Lahore",
      tempInC: 34,
      tempInF: 65,
      windDir: 'EN',
      humidity: '67%',
      precipitation: '12%',
      condition: "Rainy"
    },
    islamabad: {
      cityName: "Islamabad",
      tempInC: 45,
      tempInF: 23,
      windDir: 'ES',
      humidity: '25%',
      precipitation: '5%',
      condition: "Cloudy"
    },
    multan: {
      cityName: "Multan",
      tempInC: 40,
      tempInF: 30,
      windDir: 'WN',
      humidity: '56%',
      precipitation: '18%',
      condition: "Sunny"
    },
  };


  let cityName = req.params.cityName.toLowerCase();


  const citySpecificData = weatherData[cityName];

  console.log(citySpecificData);

  console.log(cityName)

  res.send(citySpecificData)
});


app.use('/', express.static(path.join(__dirname, 'public')))



app.get('/users', (req, res) => {
  res.send('Arif, Akmal, Zahid, Faris, Hamza, Haris')
})


app.use('/employee',express.static(path.join(__dirname,'public/post.html')));



const employeeArray = [];
app.post('/employeeAdd',(req,res)=>{

  let data =  req.body;
  employeeArray.push(data);

  console.log(employeeArray)

  res.send({message:'Added Successfully'})
})


app.get('/employeeGet',(req,res)=>{
  res.send(employeeArray);
});

app.get('/vsCode',(req,res)=>{
  res.download(path.join(__dirname,"public/softwares/VSCode.exe"))
})

console.log(__dirname)
app.get('/myImage',(req,res)=>{
  res.sendFile(path.join(__dirname,"public/image/1.jpg"));
});





// comments

// get-> /comments
// get-> /comment
// post-> /comment
// put-> /comment/:id
// delete-> /comment/:id


// posts

// users

// likes

























app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
