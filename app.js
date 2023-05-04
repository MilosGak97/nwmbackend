require('dotenv').config();

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const helmet = require('helmet');


const app = express();

const handleSubscribe = require('./postFunctions/subscribe');
const handlePricing = require('./postFunctions/pricing');
const handleFreeBoxes = require('./postFunctions/free-boxes');
const handleAboutYou = require('./postFunctions/about-you');
const handleContact = require('./postFunctions/contact');


app.use(express.json());
app.use(cors());
app.use(helmet());

app.post('/subscribe', handleSubscribe);
app.post('/pricing', handlePricing);
app.post('/free-boxes', handleFreeBoxes);
app.post('/about-you', handleAboutYou);
app.post('/contact', handleContact);

app.use('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongovac.zib5bza.mongodb.net/noworriesmoving?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
