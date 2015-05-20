var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('test', ['mycollection']);
//var serialPort = require('serialport');
var redis = require('redis');
var client = redis.createClient();

client.get("urn:medicalconditiondto:734646", function(err, reply) {
  // reply is null when the key is missing
  console.log(err);
  console.log(reply);
});

module.exports = app;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.delete('/EmployeeList/:id',function(req,res){
  console.log(req.params.id);
  db.mycollection.remove({_id:mongojs.ObjectId(req.params.id)},function(err,doc){
    console.log(doc);
    res.json(doc);
  });
});

app.put('/EmployeeList',function(req,res) {
    db.mycollection.update(
    {_id:mongojs.ObjectId(req.body._id)},
    {
        Name:req.body.Name,
        Age:req.body.Age,
        EmpId:req.body.EmpId
    }, function(err, doc) {
    res.json(doc);
  });
});

app.post('/EmployeeList', function (req, res) {
  console.log(req.body);
  //inserting object into the DB
  db.mycollection.insert(req.body,function(err,doc){
    res.json(doc);
    console.log(doc);
  });
});

app.get('/EmployeeList',function(req,res){
  //console.log(employees);
  db.mycollection.find(function(err,docs){
    res.send(docs);
    console.log(docs);
  });
});
