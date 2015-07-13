exports.question = function(req, res){
	res.render("quizes/question",{pregunta: 'Capital de Italia'});
}; 

exports.answer = function(req, res){
	var respuesta;
	if(req.query.respuesta .match(/roma/i) == null ){
		respuesta = 'Incorrecta';
	}else{
		respuesta = 'Correcta';
	}
	
	res.render("quizes/answer",{respuesta: respuesta});
}; 
