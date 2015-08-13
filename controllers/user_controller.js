var _tiempoEspera = 180000;

var users = {
		admin: {id: 1, username: "admin", password:'1234'},
		pepe: {id: 2, username: "pepe", password:'5678'}
}

exports.autenticar = function(login, password, callback){
	console.log(users);
	if(users[login]){
		if(password===users[login].password){
			callback(null, users[login]);
		}else{
			callback(new Error("La contraseña no es correcta"));
		}
	}else{
		callback(new Error("No existe el usuario"));
	}
}

exports.comprobarLogout = function(req){
	var fechaController = require('./fecha_controller.js');
	console.log("----->"+req.session.fechaUltimoUso);
	var num = fechaController.tiempoTranscurrido(req.session.fechaUltimoUso);
	if(num > _tiempoEspera){
		console.log("Tiempo de espera: "+num);
		return true;
	}else{
		return false;
	}
}


