const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Roll = require('./models/Roll');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use views
app.set('views', './views');
require('dotenv').config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    // send file in views/index.html by specifying the root to views
    res.sendFile('/views/index.html', { root: __dirname });    
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
    res.sendFile('/views/fail.html', { root: __dirname });
    }
);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
    }
);

module.exports = app;