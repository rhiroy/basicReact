var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var pinSchema = mongoose.Schema({
  lat: Number,
  lng: Number
});

var Pin = mongoose.model('Pin', pinSchema);

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pin', function(req, res) {
  Pin.find()
    .then(pins => {
      res.json(pins)
    })
    .catch(err => {
      console.log(err, 'error');
      res.send(err);
    })
});

app.post('/pin', function(req, res) {
  console.log(req.body);
  new Pin(req.body)
    .save()
    .then(pin => {
      res.send('Pin Added');
    })
    .catch(err => {
      console.log(err, 'error');
      res.status(500).send('Failed to Add Pin');
    })
});

app.listen(3000, function() {
  console.log('Austin Town Map is listening on 3000');
});
