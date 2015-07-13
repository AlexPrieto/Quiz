var express = require('express');
var router = express.Router();

var quizes = require('../controllers/quiz_controller.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizes.question);
router.get('/quizes/answer', quizes.answer);

/* Autor */
router.get('/author', function(req, res) {
	res.render('author', { });
});


module.exports = router;
