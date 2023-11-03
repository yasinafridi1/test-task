function ErrorMessage(res, status = 500, message = "Internal server error") {
  return res.status(status).json({ message });
}

function SuccessMessage(res, data) {
  return res.status(201).json(data);
}

module.exports = { ErrorMessage, SuccessMessage };
