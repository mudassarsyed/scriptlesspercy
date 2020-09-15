var express = require('express');
var bodyParser = require("body-parser");
const PercyScript = require('@percy/script');
const dotenv = require('dotenv');
dotenv.config();


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); //__dir and not _dir
var port = 7000; // you can use any port
app.get('/', function (req, res) {
    res.sendFile('index.html');
});
app.post('/submit', function (req, res) {
    name = req.body.url; //capture webpage url here
    process.env.URL=name;
    res.redirect('/');
    console.log('App URL:'+ process.env.URL);
    PercyScript.run(async (page, percySnapshot) => {
        await page.goto(process.env.URL);
        await percySnapshot(process.env.URL);
      });
});

app.listen(port);
console.log('server on http://localhost:' + port);
console.log('Percy Token:'+ process.env.PERCY_TOKEN);
