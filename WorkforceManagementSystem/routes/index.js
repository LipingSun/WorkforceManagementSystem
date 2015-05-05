var express = require('express');

var index = express();

index.all('/', function (req, res) {
  if ('user' in req.session) {
    switch (req.session.user.type) {
      case "admin" : res.render('admin.html'); break;
      case "guard" : res.render('guard.html'); break;
      case "client" : res.render('client.html'); break;
    }
  } else {
    res.render('login.html');
  }
});

exports.index = index;