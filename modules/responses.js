

exports.sendError = function(res) {
	var error = {
		status: 0,
		message: "Error in execution"
	}
	res.send(error);
}

exports.success = function(result, res) {
	var response = {
		status: 1,
		response: result
	};
	res.send(response);
}

exports.invalidCredential = function(res) {
	var response = {
		status: 0,
		message: "Invalid credential."
	}
	res.send(response);
}

exports.AlreadyExit = function(msg, res) {
	var response = {
		status: 0,
		message: msg
	}
	res.send(response);
}
exports.resultview = function(result,res) {

	var response = { status : 1 ,
		message : result[0]
		}
	res.send(response);
}
exports.age_varification = function(res) {
	var error = {
		status: 0,
		message: "you are not eligible."
	}
	res.send(error);
}