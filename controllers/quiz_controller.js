var models = require('../models/models.js');


exports.question = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render("quizes/question",{pregunta: quiz[0].pregunta });
	});
}; 

exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		var respuesta;
	
		if(req.query.respuesta === quiz[0].respuesta ){
			respuesta = 'Incorrecta';
		}else{
			respuesta = 'Correcta';
		}
		
		res.render("quizes/answer",{respuesta: respuesta});
	});
}; 
