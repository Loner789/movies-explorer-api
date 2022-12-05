require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const corsHandler = require('./middlewares/corsHandler');
const { MONGO_URL_DEV } = require('./utils/config');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(corsHandler);
app.use(express.json());
app.use(limiter);
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : MONGO_URL_DEV);

  app.listen(PORT);
}

main();
