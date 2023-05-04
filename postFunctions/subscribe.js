const mongoose = require('mongoose');

const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (emailValue) => {
        return emailRegExp.test(emailValue);
      },
    },
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

const handleSubscribePost = async (req, res) => {
  const email = req.body.email;

  try {
    const subscription = new Subscription({ email });
    await subscription.save();
    res.status(201).json({
      message:
        "Thank you for joining the No Worries Moving family! We're thrilled to have you on board and can't wait to share our latest news, promotions, and tips with you. Stay tuned for updates on how we can make your next move stress-free.",
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid email address.' });
    } else if (err.code === 11000) {
      res.status(409).json({ error: 'Email already subscribed.' });
    } else {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};

module.exports = handleSubscribePost;
