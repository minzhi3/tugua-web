var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('use_modules.js');
});

/*router.use(function (req,res,next){

express.static(path.join(__dirname + '/node_modules/snapsvg/dist/'));
console.log(req.url);
next();
});*/
router.use('/snapsvg', express.static(path.join(__dirname + '/../node_modules/snapsvg/dist/')));
router.use('/jquery', express.static(path.join(__dirname + '/../node_modules/jquery/dist/')));

module.exports = router;
