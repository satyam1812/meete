var sql = require('mysql');
var md5 = require('md5');
var connection = require('../modules/connection');
var responses = require('../modules/responses');
var comFunc = require('../modules/commonFunction');


exports.login = function(req , res) {
var email = req.body.email;
var password = req.body.password;

	var sql = "SELECT  * FROM `tb_user` WHERE `email`=? AND `password`=?";
	var password = md5(password);
	var values = [email,password];
 	 	
	connection.query(sql, values, function(err, result){
		if (err) {
			responses.sendError(res);
			return;
		} else if(result.length>0)
			{
				result[0].password = "";
				responses.resultview(result , res);
			} else
			{
				responses.invalidCredential (res);
				 return;
			}
						
		

	});
}

exports.signup = function(req, res) {

	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	var password=md5(password);
	
	var sql = "SELECT * FROM `tb_user` WHERE `email`=?";
	var values = [email];

	connection.query(sql, values, function(err, result){
		if (err) {
			responses.sendError(res);
			return;
	 	} else if (result.length > 0 ) {
	 		var msg = "Email is already exist."
			responses.AlreadyExit(msg, res);
			return;
		} else {

			var user_id  = md5(comFunc.generateRandomString());
			var sql = "INSERT INTO `tb_user`( `user_id`,`name`, `email`, `password`) VALUES (?,?,?,?)";
			var values = [user_id,name, email, password];

			connection.query(sql, values, function(err, result){
				if (err) {
					responses.sendError(err);
					return;
				} else {

					var sql = "SELECT `name` , `email` , `password` FROM `tb_user` WHERE `user_id`=?";
					values = [user_id];

					connection.query(sql,values,function(err , result){
						if(err)
						{
							responses.sendError(res);
							return;
						}
						else {
							responses.resultview (result ,res);
							return;
						}

				});
					
				}
			});
		}
	});    
}
exports.update = function(req,res) {

	var description = req.body.description;
	var age = req.body.age;
	var gender = req.body.gender;
	var user_id = req.body.user_id;
	if(age>=18)
	{
		var  sql ="";
		values=[];

		if(req.files.length == 0) {
			update_sql = "UPDATE `tb_user` SET `gender`=? , `age` =? , `description` = ?, `is_varified`=? WHERE `user_id`=?";
			values = [gender,age,description,1,user_id];
			connection.query(update_sql,values,function(err, result) {
						if(err){ 
							responses.sendError(res);
							return;
						}
						else {
							responses.resultview(result,res);
							return;
						}
			});
		} else {
			for(i=0;i<req.files.length;i++) {
				if(req.files[i].fieldname == "profile_image") {
				 	update_sql = "UPDATE `tb_user` SET `profile_image` = ? ,`gender`=?,`age`=?,`description`=?,`is_varified`=? WHERE `user_id`=?";
				 	values=[req.files[i].filename,gender,age,description,1,user_id];
				 	connection.query(update_sql,values,function(err, result) {
						if(err){ 
							responses.sendError(res);
							return;
						}
						else {
							responses.resultview(result,res);
							return;
						}
					});
				 	
				}else if(req.files[i].fieldname == "cover_image"){
				 	update_sql = "UPDATE `tb_user` SET `cover_image` = ? ,`gender`=?,`age`=?,`description`=?,`is_varified`=? WHERE `user_id`=?";
				 	values=[req.files[i].filename,gender,age,description,1,user_id];
					connection.query(update_sql,values,function(err, result) {
						if(err){
							responses.sendError(res);
							return;
						}
						else {
							responses.resultview(result,res);
							return;
						}
					});
			      }
				 
			}
		}
		
	}else{
	responses.age_varification(res);
			return;
}
}
