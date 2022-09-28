const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const shortUrl = require('./models/shortUrl');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/shortUrls', async (req, res) => {
       await shortUrl.create({ full: req.body.url });
       res.redirect('/');
    });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });