'use strict';

const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const appPort = process.env.PORT || 3000;

app.use(compression());

app.use('/dist', express.static('./dist'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'));
});

app.listen(appPort, () => {
    console.log('App listening: http://localhost:' + appPort); // eslint-disable-line no-console
});

module.exports = app;
