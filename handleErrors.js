module.exports = handleErrors = (errObj) => {
  const errors = [];

  for (const [key, value] of Object.entries(errObj.errors)) {
    errors.push({ key, value });
  }

  return errors;
};
