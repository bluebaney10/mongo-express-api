const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./medels/product')

const mongo_uri = require('./config/mongo')

mongoose.connect(mongo_uri,{
    useNewUrlParser:true
})

mongoose.connection.on('error',err => {
    console.error('MongoDe error', err)
})

app.use(express.json())

//mock data
//const products=[{}]

// Query product name = 'item 1'
//Product.find({name:'item 1'})

// Query product name = 'item 1' and price = 0
//Product.find({name:'item 2', price:0})

//Query by id
//Product.findById('5d556f0dce881660923ed0aa')
//Product.findOne({ _id: '5d556f0dce881660923ed0aa' })

app.get('/products',async(req, res) =>{
    const products = await Product.find({})
    res.json(products)
})

app.get('/products/:id', async(req, res) =>{
    const {id} = req.params
    const product = await Product.findById(id)
    res.json(product)
})


app.post('/products',async(req, res)=>{
    const payload = req.body
    const product = new Product(payload)
    await product.save()
    res.status(201).end()
})

app.put('/products/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params

    const product = await Product.findByIdAndUpdate(id, {$set: payload})
    res.json(product)
})

app.delete('/products/:id', async(req, res) =>{
    const {id} = req.params

    await Product.findByIdAndDelete(id)
    res.status(204).end()
})

app.listen(9000,()=>{
    console.log('application runing on port 9000')
})