const zipCodeRegex = /^\d{5}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
const phoneRegex = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/;

const requiredZip = {
  type: String,
  required: true,
  validate: {
    validator: (value) => {
      return zipCodeRegex.test(value);
    },
    message: (props) => `${props.value} is not a valid ZIP code!`,
  },
};

const requiredEmail = {
  type: String,
  required: true,
  lowercase: true,
  validate: {
    validator: (value) => emailRegex.test(value),
    message: (props) => `${props.value} is not a valid email address!`,
  },
};

const requiredPhone = {
  type: String,
  required: true,
  validate: {
    validator: (value) => phoneRegex.test(value),
    message: (props) => `${props.value} is not a valid phone number!`,
  },
};

const requiredString = (fieldName) => ({
  type: String,
  required: true,
  minlength: 1,
  message: `${fieldName} field cannot be empty`,
});

module.exports = {
  requiredZip,
  requiredEmail,
  requiredPhone,
  requiredString,
};
