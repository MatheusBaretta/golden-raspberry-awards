const express = require('express');
const { getProducerIntervals } = require('./controllers/producerController');
const { loadCSV } = require('./utils/csvLoader');

const app = express();

// Carrega o CSV ao iniciar a aplicação
loadCSV('./data/movielist.csv');

app.get('/producers/intervals', getProducerIntervals);

module.exports = app;