const express = require('express');
const app = express();

app.use( require('./TodoRoutes') );


module.exports = app;