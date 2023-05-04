const mongoose = require('mongoose');
const handleErrors = require('../handleErrors');

const {
  requiredString,
  requiredZip,
  requiredEmail,
  requiredPhone,
} = require('../schemaFields');

const freeBoxesSchem = new mongoose.Schema({
  boxesName: requiredString('Name'),
  boxesLastName: requiredString('Last Name'),
  boxesAddress: requiredString('Address'),
  boxesApartment: {
    type: String,
  },
  boxesCity: requiredString('City'),
  boxesState: requiredString('State'),
  boxesZip: requiredZip,
  boxesEmail: requiredEmail,
  boxesPhone: requiredPhone,
});

const FreeBoxes = mongoose.model('FreeBoxes', freeBoxesSchem);

const handleFreeBoxesPost = async (req, res) => {
  const boxesData = req.body;

  try {
    const freeBoxes = new FreeBoxes(boxesData);

    await freeBoxes.save();

    res.status(201).json({
      message:
        'Thank you for your interest in our free boxes promotion! We have received your request and one of our representatives will be in touch with you shortly to discuss the details.',
    });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports = handleFreeBoxesPost;
