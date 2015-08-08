var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.find( quizId ).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error("No existe el quizId:"+quizId));
		}
	});
}; 

exports.news = function(req,res){
	//se crea una variable de tipo Quiz, para la vuelta del formulario tener la Quiz de manera directa
	var quizNew = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});
	
	res.render("quizes/new", {quiz: quizNew});
}

//creamos la nueva quiz
exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz ); // se crea un elemento que NO persiste en la BD

	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		}else{
			quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
				res.redirect("/quizes");
			});
		}
		
	});
}

//actualizamos una quiz
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', {quiz: req.quiz, errors: err.errors});
		}else{
			req.quiz.save({fields: ["pregunta","respuesta", "tema"]}).then(function(){
				res.redirect("/quizes");
			});
		}
		
	});	
}

//borramos una quiz
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect("/quizes");
	}).catch(function(error){
		next(error);
	});
	
}

exports.edit = function(req, res){
	res.render("quizes/edit",{quiz: req.quiz});
};



exports.show = function(req, res){
	res.render("quizes/show",{ quiz: req.quiz });
}; 


exports.index = function(req, res){
	if(req.query.search !== undefined && req.query.search != null){
		var preguntas = "%"+_sustituirEspacios(req.query.search, "%") +"%";
		//nos ha llegado una peticion de busquedas
		models.Quiz.findAll({where: ["pregunta like ?", preguntas] }).then(function(quizes){
			res.render("quizes/index",{ quizes: quizes, busqueda: "true" });
		});
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render("quizes/index",{ quizes: quizes });
		});
	}
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

function _sustituirEspacios(texto, textoReemplazar){
	var re = new RegExp(" ", "g");
	
	return texto.replace(re, textoReemplazar);
}
