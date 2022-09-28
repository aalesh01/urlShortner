const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const shortUrl = require('./models/shortUrl');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.get('/', async (req, res) => {
    const allUrls = await shortUrl.find()
    res.render('index',{shortUrls:allUrls});
});

app.post('/shortUrls', async (req, res) => {
       await shortUrl.create({ full: req.body.url });
       res.redirect('/');
    });

app.get('/:shortUrls',async (req, res) =>{
    const shortUrlF =  await shortUrl.findOne({ short: req.params.shortUrls });
    if(shortUrlF===null) return res.status(404);
    shortUrlF.clicks++;
    shortUrlF.save()
    res.redirect(shortUrlF.full);
}
    );


app.listen(8080, () => {
    console.log('Server is running on port 8080');
    });