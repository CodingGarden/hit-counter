const express = require('express');
const cookieParser = require('cookie-parser');

const counter = require('./routes/counter');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.enable('trust proxy');

app.get('/', (req, res) => {
  res.json({
    message: '👋🌎'
  });
});

app.use('/counters', counter);

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});