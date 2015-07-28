var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	console.log("asdf");
	models.Quiz.find( quizId ).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error("No existe el quizId:"+quizId));
		}
	});
}; 


exports.show = function(req, res){
	res.render("quizes/show",{ quiz: req.quiz });
}; 


exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render("quizes/index",{ quizes: quizes });
	});
}; 


exports.question = function(req, res){
	res.render("quizes/new",{});
}; 

exports.answer = function(req, res){
	var respuesta;

	if(req.query.respuesta === req.quiz.respuesta ){
		respuesta = 'Correcta';
	}else{
		respuesta = 'Incorrecta';
	}
	
	res.render("quizes/answer",{quiz: req.quiz, respuesta: respuesta});
}; 
