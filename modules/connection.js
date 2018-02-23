var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'meete_APP'
});
 
connection.connect(function(err){
	if (err) {
		var error = {
			status: 0,
			message: "Error in execution"
		}
	} else {
		console.log("database is working");	
	}
});
module.exports = connection;
