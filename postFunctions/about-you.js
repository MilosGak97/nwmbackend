const mongoose = require('mongoose');
const handleErrors = require('../handleErrors');
const {
  requiredString,
  requiredEmail,
  requiredPhone,
} = require('../schemaFields');

const aboutYouSchema = new mongoose.Schema({
  customerName: requiredString('Name'),
  customerLastName: requiredString('Last name'),
  customerEmail: requiredEmail,
  customerPhone: requiredPhone,
  customerStory: requiredString('Story'),
});

const AboutYou = mongoose.model('AboutYou', aboutYouSchema);

const handleAboutYouPost = async (req, res) => {
  const customerData = req.body;

  try {
    const aboutYou = new AboutYou(customerData);

    await aboutYou.save();

    res.status(201).json({
      message: `Dear ${customerData.customerName} thank you for sharing your story with us. We really do value our customers and like to hear from them.`,
    });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports = handleAboutYouPost;
