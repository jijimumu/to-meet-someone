var express = require("express")
var app     = express()
var path    = require("path")
var fs = require('fs')
var nodes = require('./csv/names.json')
var edges = require('./csv/social_network.json')
var cpnNodes = []
var cpnEdges = []
var id = []
var limit = 50

function dataPreProcess(){
	for(var i=0; i<limit; i++){
		cpnNodes.push(nodes[i])
		id.push(nodes[i].id)
	}
	console.log(cpnNodes)
	console.log(id)
	for(var j=0; j<limit; j++){
		// console.log(edges[j])
		if(id.indexOf(edges[j].from) > 0 || id.indexOf(edges[j].to) >0){
			cpnEdges.push(edges[j])
		}
	}
	console.log(cpnEdges)
}

dataPreProcess()

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
	res.send(JSON.stringify({nodes:cpnNodes,edges:cpnEdges}))
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