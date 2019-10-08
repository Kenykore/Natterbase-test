const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')

require('dotenv').config()
var router = require('./routes');
var app = express();
//configuration
//1. Redis
                            
//2.Express Configuration
  

app.set('trust proxy', 1)
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(methodOverride());

router(app);
module.exports=app