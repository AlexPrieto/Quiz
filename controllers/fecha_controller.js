var moment = require('moment');

exports.fechaActual = function(){
	console.log(moment().format('YYYY MM DD HH:mm:ss') );
	return moment();
}

exports.tiempoTranscurrido = function(fecha){
	var ahora = moment();
	console.log("Ahora: "+ahora.format('YYYY MM DD HH:mm:ss') );
	console.log("fecha: "+fecha);
	console.log('Difference is ', ahora.diff(fecha), "milliseconds");
	return ahora.diff(fecha);
}