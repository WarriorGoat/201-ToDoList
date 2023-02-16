const express = require('express');
const indexRoutes = express.Router();

/* GET home page. */
indexRoutes.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = indexRoutes;
