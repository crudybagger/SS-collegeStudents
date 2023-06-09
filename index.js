const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Roll = require('./models/Roll');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// use views
require('dotenv').config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send("<form style='' action='/roll' method='POST'><input style='width:600px;height:100px;' type='number' name='roll' placeholder='Enter roll number'><button style='width:200px;height:100px;' type='submit'>Submit</button></form>");    
});

app.post('/roll', async (req, res) => {
    const userFound = await Roll.exists({roll:req.body.roll}).then((roll)=>roll);
    if(userFound){
        res.redirect('/fail')
    }
    else {
        Roll.create(req.body);
        res.redirect('/');
    }
});

app.get('/fail', (req, res) => {
    res.send('<h1>Roll Number already Exists !</h1><button ><a href="/">Go Back</a></button>');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
    }
);

module.exports = app;