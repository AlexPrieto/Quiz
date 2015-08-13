var express = require('express');
var router = express.Router();

var quizes = require('../controllers/quiz_controller.js');
var comment = require('../controllers/comment_controller.js');
var session = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', session.actualizarFecha, function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//autoload
router.param('quizId', quizes.load);
router.param('commentId', comment.load);

//funciones de sesion
router.get('/login', session.news);
router.post('/login', session.create);
router.get('/logout', session.destroy);

router.get('/quizes', session.actualizarFecha, quizes.index);
router.get('/quizes/:quizId(\\d+)', session.actualizarFecha,quizes.show); //solo permitimos numeros en el link
router.get('/quizes/:quizId(\\d+)/edit', session.loginRequired ,quizes.edit);
router.put('/quizes/:quizId(\\d+)', session.loginRequired, quizes.update);
router.delete('/quizes/:quizId(\\d+)', session.loginRequired, quizes.destroy);
router.get('/quizes/new', session.loginRequired, quizes.news);
router.post('/quizes/create', session.loginRequired, quizes.create);
router.get('/quizes/:quizId(\\d+)/answer',session.actualizarFecha, quizes.answer); 

router.get('/quizes/:quizId(\\d+)/comments/new',session.actualizarFecha, comment.news);
router.post('/quizes/:quizId(\\d+)/comment',session.actualizarFecha, comment.create);
router.put('/quizes/:quizId(\\d+)/comment/:commentId(\\d+)/publish', session.loginRequired, comment.publish);

/* Autor */
router.get('/author',session.actualizarFecha, function(req, res) {
	res.render('author', { });
});


module.exports = router;
