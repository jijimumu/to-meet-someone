var express = require("express")
var app     = express()
var path    = require("path")
var fs = require('fs')
var nodes = require('./csv/names.json')
var edges = require('./csv/social_network.json')
var cpnNodes = []
var cpnEdges = []
var id = []
var limit = 400


var stringEdges = JSON.stringify(edges)


function dataPreProcess(){
	for(var i=0; i<limit; i++){
		cpnNodes.push(nodes[i])
		id.push(nodes[i].id)
	}
	console.log(cpnNodes)
	console.log(id)
	for(var j=0; j<edges.length; j++){
		// console.log(edges[j])
		if(id.indexOf(edges[j].from) > 0 || id.indexOf(edges[j].to) >0){
			cpnEdges.push(edges[j])
		}
	}
	
}
var winner = []
var winner_network = [] 
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

var totalNodes = geek.concat(winner)
var totalEdges = geek_network.concat(winner_network)
app.use(express.static('public'))

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