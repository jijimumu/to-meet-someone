var express = require("express")
var app     = express()
var path    = require("path")
var fs = require('fs')
var nodes = require('./csv/names.json')
var edges = require('./csv/social_network.json')
var cpnNodes = []
var cpnEdges = []
var cpnNodesWinner = []
var cpnEdgesWinner = []
var id = []
var idWinner = []
var limit = 200


var stringEdges = JSON.stringify(edges)


// var winner = []
// var winner_network = [] 
function dump(){
	var geek = require('./geek.json')
	var geek_network = require('./geek_network.json') 
	
	for(var i=0;i<geek.length;i++){
		var duplicate = geek[i]
		duplicate.id += geek.length 
		duplicate.label = 'somedody'
		winner.push(duplicate)
	}

	for(var j=0;j<geek_network.length;j++){
		var dup = geek_network[j]
		dup.from += geek.length 
		dup.to += geek.length 
		winner_network.push(dup)
	}
}

// dataPreProcess()
// console.log('compnent nodes number = ' + cpnNodes.length)
// console.log('component edges number = ' + cpnEdges.length)
// fs.writeFile('geek.json',JSON.stringify(cpnNodes), (err) => {
//  		if (err) throw err;
//  		console.log('It\'s saved!');
// 	})
// fs.writeFile('geek_network.json',JSON.stringify(cpnEdges), (err) => {
//  		if (err) throw err;
//  		console.log('It\'s saved!');
// 	})

// dump()
// fs.writeFile('winner.json',JSON.stringify(winner), (err) => {
//  		if (err) throw err;
//  		console.log('It\'s saved!');
// 	})
// fs.writeFile('winner_network.json',JSON.stringify(winner_network), (err) => {
//  		if (err) throw err;
//  		console.log('It\'s saved!');
// 	})
var geek = require('./geek.json')
var geek_network = require('./geek_network.json')
var winner = require('./winner.json')
var winner_network = require('./winner_network.json')
var geek_component = []
var geek_network_component = []
var winner_component = []
var winner_network_component = []
var geek_id = []
var winner_id = []


app.use(express.static('public'))


function dataPreProcess(){
	for(var i=0; i<limit; i++){
		geek_component.push(geek[i])
		winner_component.push(winner[i])
		geek_id.push(geek_component[i].id)
		winner_id.push(winner_component[i].id)
	}
	
	for(var j=0; j<geek_network.length; j++){
		// console.log(edges[j])
		if(geek_id.indexOf(geek_network[j].from) > 0 || geek_id.indexOf(geek_network[j].to) >0){
			geek_network_component.push(geek_network[j])
		}
		if(winner_id.indexOf(winner_network[j].from) > 0 || winner_id.indexOf(winner_network[j].to) >0){
			winner_network_component.push(winner_network[j])
		}
	}
	
}
dataPreProcess()
var totalNodes = geek_component.concat(winner_component)
var totalEdges = geek_network_component.concat(winner_network_component)

console.log('totalNodes = ' + totalNodes.length)
console.log('totalEdges = ' + totalEdges.length)

app.use('/static', express.static('public'))

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'))
})

app.get('/graph',function(req,res){
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify({nodes:totalNodes,edges:totalEdges}))
})

app.get('/edges',function(req,res){
	res.setHeader('Content-Type', 'application/json')
	res.send(JSON.stringify(edges))
})

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'))
});

app.listen(3000)

console.log("Running at Port 3000")