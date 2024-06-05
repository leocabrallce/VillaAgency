var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('property-details', { title: 'Property Details' });
});

module.exports = router;
