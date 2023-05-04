require('dotenv').config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const helmet = require('helmet');

const morgan = require('morgan');

const fs = require('fs');

const app = express();

const handleSubscribe = require('./postFunctions/subscribe');
const handlePricing = require('./postFunctions/pricing');
const handleFreeBoxes = require('./postFunctions/free-boxes');
const handleAboutYou = require('./postFunctions/about-you');
const handleContact = require('./postFunctions/contact');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

app.post('/subscribe', handleSubscribe);
app.post('/pricing', handlePricing);
app.post('/free-boxes', handleFreeBoxes);
app.post('/about-you', handleAboutYou);
app.post('/contact', handleContact);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongovac.zib5bza.mongodb.net/noworriesmoving?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
