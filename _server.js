const express = require('express')
const app = express()
const mongoose = require('mongoose')
//const products = require('./productmock')
var mongo_uri = "mongodb+srv://admin:blue805090@cluster0.iygdk.mongodb.net/node-api-101?retryWrites=true&w=majority";

mongoose.connect(mongo_uri,{useNewUrlParser:true})

/*
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);
*/

app.use(express.json())

//create database schema
const Cat = mongoose.model('Cat',{name: String})

//create instance from model
const kitty = new Cat({ name: 'JavaScript'})

//save into database return Promise
kitty.save().then(()=> console.log('meow'))

const products = [
    {
      id: '1001',
      name: 'Node.js for Beginners',
      category: 'Node',
      price: 990
    },
    {
      id: '1002',
      name: 'React 101',
      category: 'React',
      price: 3990
    },
    {
      id: '1003',
      name: 'Getting started with MongoDB',
      category: 'MongoDB',
      price: 1990
    }
  ]

app.get('/',(req, res)=>{
    res.json({message:'Hello Blue'})
})

//get parameter from url
app.get('/hello/:message',(req, res)=>{
    const {params} = req
    res.json({message:'Hello!', params})
})

app.get('/products',(req, res)=>{
    res.json(products)
})

app.get('/products/:id',(req, res)=>{
    const {id} = req.params
    const result = products.find(product => product.id === id)
    res.json(result)
})

app.post('/products', (req, res) => {
    const payload = req.body
    res.json(payload)
  })

app.put('/products/:id', (req, res)=>{
    const {id} = req.params
    res.json({id})
})

app.delete('/products/:id', (req, res)=>{
    const {id} = req.params
    res.json({id})
})

app.listen(9000,()=>{
    console.log('application runing on port 9000')
})