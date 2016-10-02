//Converter Class 
var Converter = require("csvtojson").Converter;
var fs = require('fs')
var converter = new Converter({});
 
//end_parsed will be emitted once parsing finished 
converter.on("end_parsed", function (jsonArray) {
   console.log(jsonArray); //here is your result jsonarray 
 	fs.writeFile('social_network.json',JSON.stringify(jsonArray), (err) => {
 		if (err) throw err;
 		console.log('It\'s saved!');
	});
});
 
//read from file 
require("fs").createReadStream("./social_network.csv").pipe(converter);