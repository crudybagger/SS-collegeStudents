const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const Roll = require('./models/Roll');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// use views
app.set('view engine', 'ejs');

require('dotenv').config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.render('index.ejs');
    }
);

app.post('/roll', async (req, res) => {
    const userFound = await Roll.exists({roll:req.body.roll}).then((roll)=>roll);
    if(userFound){
        res.redirect('/fail')
    }
    else {
        Roll.create(req.body);
        res.redirect('/');
    }
    // console.log(userFound)
    // res.send(userFound)
});

app.get('/fail', (req, res) => {
    res.render('fail.ejs');
    }
);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
    }
);

module.exports = app;