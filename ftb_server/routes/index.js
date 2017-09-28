var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var d = new Date();
    var n_days = (12 - d.getDay()) % 7;
  res.render('index', { nr_days: n_days });
});

module.exports = router;
