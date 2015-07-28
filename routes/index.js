var express = require('express');
var router = express.Router();

var quizes = require('../controllers/quiz_controller.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//autoload
router.param('quizId', quizes.load);

router.get('/quizes', quizes.index);
router.get('/quizes/:quizId(\\d+)', quizes.show); //solo permitimos numeros en el link
router.get('/quizes/:quizId(\\d+)/answer', quizes.answer); 
//router.get('/quizes/new', quizes.nuevo);

/* Autor */
router.get('/author', function(req, res) {
	res.render('author', { });
});


module.exports = router;
