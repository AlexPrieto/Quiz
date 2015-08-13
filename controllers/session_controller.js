var models = require('../models/models.js');

exports.news = function(req,res){
	var errors = req.session.errors || null;
	req.session.errors = null;

	res.render('sessions/new', {errors: errors});
}

exports.create = function(req,res){
	
	var login = req.body.usuario;
	var pass = req.body.pass;
	
	var userController = require('./user_controller.js');
	userController.autenticar(login, pass, function(error, user){
		if(error){
			req.session.errors = [{ "message": "Se ha producido un error: "+error }];
			res.redirect("/login");
		}else{
			//creamos la sesion
			var fechaController = require('./fecha_controller.js');
			req.session.user = {id: user.id, username: user.username};
			req.session.fechaUltimoUso = fechaController.fechaActual();
			//mandamos al usuario a la dirección anterior del login
			res.redirect(req.session.redir.toString());
		}
	});	
}

exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}

//este middleware bloquea las acciones que requieren que el usuario este registrado
exports.loginRequired = function(req,res, next){
	
	if(req.session.user){
		var userController = require('./user_controller.js');
		//tiempo de espera sin realizar alguna acción
		if(userController.comprobarLogout(req)){
			delete req.session.user;
			var errors = new Array({message: "Sesion caducada"}); 
			res.render('sessions/new', {errors: errors});
		}else{
			_actualizarfecha(req);
			next(); //siguiente middleware
		}
	}else{
		res.redirect("/login");
	}
}

exports.actualizarFecha = function(req,res,next){
	var userController = require('./user_controller.js');
	//recargamos la hora de uso si tenemos una sesión activa y no ha pasado el tiempo
	if(req.session.user && !userController.comprobarLogout(req)){
		_actualizarfecha(req);
	}
	next();
}

function _actualizarfecha(req){
	var fechaController = require('./fecha_controller.js');
	req.session.fechaUltimoUso = fechaController.fechaActual();
}