const http = require('http');
const express = require('express');
const request = require('request');
const app = express();
const path = require('path');
const port = 3000




app.use(express.static(__dirname + '/app' ));
app.get('/sensor.xml', function(req,res){

	var url = 'url/status.xml';

	res.send(request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            return body;
        }
    }));
 
});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});