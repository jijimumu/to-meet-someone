var fs = require('fs')
var _ = require('lodash')
var social_network = require('./social_network.json')
var male = require('./male.json')
var female = require('./female.json')



var names = []
for(var i=0; i<social_network.length; i++){
	if(names.indexOf(social_network[i].from) < 0){
		names.push(social_network[i].from)
	}
	if(names.indexOf(social_network[i].to) < 0){
		names.push(social_network[i].to)
	}
}


var orderNames = names.sort(function(a,b){
	return a - b
})

console.log(orderNames.length)

for(var j=0; j<orderNames.length; j++){
	var gender = Math.random()
	if(gender > 0.4){
		// console.log('man')
		var maleLength = male.length
		var random = Math.random() * maleLength
		var whichMan = Math.floor(random)
		var key = orderNames[j]
		orderNames[j] = {}
		// console.log(whichMan)
		if(male.length == 0){
			orderNames[j]['id'] = key
			orderNames[j]['name'] = 'somebody'
			orderNames[j]['gender'] = 'male'
		}else{
			orderNames[j]['id'] = key
			orderNames[j]['name'] = male[whichMan].name
			orderNames[j]['gender'] = 'male'
		}
		
		male.splice(whichMan,1)
	}else{
		// console.log('woman')

		var femaleLength = female.length
		var random = Math.random() * femaleLength
		var whichWoman = Math.floor(random)
		var key = orderNames[j]
		orderNames[j] = {}
		// console.log(whichMan)
		if(female.length == 0){
			orderNames[j]['id'] = key
			orderNames[j]['name'] = 'somebody'
			orderNames[j]['gender'] = 'female'
		}else{
			orderNames[j]['id'] = key
			orderNames[j]['name'] = female[whichWoman].name
			orderNames[j]['gender'] = 'female'
		}
		
		female.splice(whichWoman,1)
	}
}


fs.writeFile('names.json',JSON.stringify(orderNames), (err) => {
	if (err) throw err;
	console.log('It\'s saved!');
});



console.log(orderNames)
