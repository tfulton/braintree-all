var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect(302, '/index.html');
  // res.render('index', { title: 'Express' });
});

router.get('/client-token', function(req, res, next) {
    res.redirect(302, '/clienttoken.html');
    // res.render('index', { title: 'Express' });
});

module.exports = router;
