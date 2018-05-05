const http = require('http');
const express = require('express');
const app = express();
const port = 3000;
const HttpUtils = require("./HttpUtils");

//Configuration
// url Sensor
const sensorAddress = 'http://192.168.1.136/status.xml';

app.use(express.static(__dirname + '/app' ));
app.get('/sensor', function(req,res) {

	var parseString = require('xml2js').parseString;
	var REST = new HttpUtils();

	const options = {
  	method: "GET",
    url: sensorAddress,
    headers: {}
	};

	REST.request(options, 200, false).then(function (result) {

	  parseString(result, function (err, result) {
	      var temp = result.response.sensor[0].temp[0];
				res.end(JSON.stringify({
			  	temp : parseFloat(temp)
				}));
	  });

	});

});

app.listen(port, function(){
    console.log('Server running on port 3000');
});
