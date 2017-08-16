'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('./dbSession.js');

var port = 8080;
var server = Percolator({'port': port, 'autoLink': false});

server.route('/api/keywords',
	{
		GET: function(req, res){
			dbSession.fetchAll('SELECT id, value, categoryID FROM keyword ORDER BY id',
                function(err, rows){
                    if(err){
                        console.log(err);
                        res.status.internalServerError(err);
                    }else{
                        res.collection(rows).send(); 
                    }
                })
		}
	}
);

server.listen(function(){
	console.log('Server started and listening on port', port);
});

/*const express = require('express')
const app = express()

app.get('/api/keywords', function (req, res) {
  res.send({'foo':'bar'});
})

app.listen(8080, function () {
  console.log('Server started and listening on port 8080!')
})*/
