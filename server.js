const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const School = require('./models/formModel');
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes



app.get('/school', async(req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        const school = await School.find({});
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/school/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const school = await School.findById(id);
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/school', async(req, res) => {
    try {
        console.log("req.body:",req.body);
        const school = await School.create(req.body)
        res.status(200).json(school);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/school/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const school = await School.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!school){
            return res.status(404).json({message: `cannot find any form with ID ${id}`})
        }
        const updatedForm = await Form.findById(id);
        res.status(200).json(updatedForm);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/school/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const school = await School.findByIdAndDelete(id);
        if(!school){
            return res.status(404).json({message: `cannot find any form with ID ${id}`})
        }
        res.status(200).json(school);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://patil:0987654321@cluster0.ellsl9j.mongodb.net/School_info?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})