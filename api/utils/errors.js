const showError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};

export default showError;
