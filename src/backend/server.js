'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('./dbSession.js');

var Server = function(port){
    console.log(__dirname)
    var server = Percolator({'port':port, 'autoLink':false, 'staticDir':__dirname+'/../frontend'});

    server.route('/api/keywords',
    {
        GET: function(req, res){
            dbSession.fetchAll('SELECT id, value, categoryID FROM keyword ORDER BY id',
                function(err, rows){
                     if(err){
                        console.log(err);
                        res.status.internalServerError(err)
                     }else{
                        res.collection(rows).send()
                     }
                })
        }
    });

    return server;
}

module.exports = {'Server': Server};