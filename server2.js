const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000

var url = 'url/status.xml';


app.use(express.static(__dirname + '/app' ));
app.get('/sensor.xml', function(req,res){
 
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});