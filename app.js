var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var md5 = require('md5');
var multer = require('multer');
var app = express();
var port = process.env.port || 3003; 

var storage = multer.diskStorage({
	destination:function(req,file,callback) {
		callback(null,'./uploads/user');
	},
	filename:function(req,file,callback) {
		var fileUniqueName = md5(Date.now());
		 callback(null,  fileUniqueName + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
var user_panel = require('./routes/user');
app.use(express.static(path.join(__dirname, 'views')));
app.post('/user/login', user_panel.login);
app.post('/user/signup', user_panel.signup);
app.post('/user/update',upload.any(), user_panel.update);
app.listen(port, function(){
	console.log("Server is running on port "+port);
});
