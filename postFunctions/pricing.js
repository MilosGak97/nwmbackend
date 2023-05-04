const mongoose = require('mongoose');

const {
  requiredZip,
  requiredEmail,
  requiredPhone,
  requiredString,
} = require('../schemaFields');

const pricingSchema = new mongoose.Schema({
  destination: {
    zip: requiredZip,
    destination: requiredString('Destination'),
  },
  date: {
    type: Date,
    required: true,
  },
  homeInfo: {
    type: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['house', 'apartment'],
      validate: {
        validator: (value) => {
          return /^house$|^apartment$/i.test(value);
        },
        message: (props) => `${props.value} is not a valid home type!`,
      },
    },
    bedroomsNumber: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['1', '2', '3', '4+', 'studio', '2+'],
      validate: {
        validator: (value) => {
          return /^1$|^2$|^3$|^4\+$|^studio$|^2\+$/i.test(value);
        },
        message: (props) => `${props.value} is not a valid bedroom number!`,
      },
    },
  },
  contactInfo: {
    name: requiredString('Name'),
    email: requiredEmail,
    phone: requiredPhone,
  },
});

const Pricing = mongoose.model('Pricing', pricingSchema);

const handlePricingPost = async (req, res) => {
  const pricingData = {
    destination: {
      zip: req.body.formsData.destination.calcZip,
      destination: req.body.formsData.destination.destinationOption,
    },
    date: new Date(req.body.formsData.date.calcDate).toLocaleDateString(),
    homeInfo: {
      type: req.body.formsData.homeType.calcHomeType,
      bedroomsNumber: req.body.formsData.homeType.calcBedroomNumbers,
    },
    contactInfo: {
      name: req.body.formsData.contactData.calcName,
      email: req.body.formsData.contactData.calcEmail,
      phone: req.body.formsData.contactData.calcPhone,
    },
  };

  try {
    const pricing = new Pricing(pricingData);

    await pricing.save();

    res.status(201).json({
      message:
        'Thank you for requesting a quote from No Worries Moving! We have received your request and will get back to you shortly with a personalized quote.',
    });
  } catch (err) {
    const errors = [];

    for (const [_, value] of Object.entries(err.errors)) {
      errors.push(value.message);
    }

    res.status(400).json({ errors });
  }
};

module.exports = handlePricingPost;
