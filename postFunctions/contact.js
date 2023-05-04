const mongoose = require('mongoose');
const { requiredString, requiredEmail } = require('../schemaFields');

const contactSchema = new mongoose.Schema({
  contactFullName: requiredString('Full name'),
  contactEmail: requiredEmail,
  contactMessage: requiredString('Message'),
});

const Contact = mongoose.model('Contact', contactSchema);

const handleContactPost = async (req, res) => {
  const contactData = req.body;

  try {
    const contact = new Contact(contactData);

    await contact.save();

    res.status(201).json({
      message: `Thank you for contacting No Worries Moving! We have received your message and will be in touch with you shortly. Have a great day!`,
    });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports = handleContactPost;
