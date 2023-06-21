const { addScema,  } = require("../utils/contactAddScema");
const { HttpError } = require("../helpers");

const noBody = (req, res, next) => {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
        next(HttpError(400, "missing fields"));
    }
    next()
}

const validate = (schema, res, obj, next) => {
  const validationLogs = schema.validate(obj)
 
  if (validationLogs.error) {
    return res.status(400).json({ message: `missing required ${validationLogs.error.details[0].path[0]} field`});
  }
  next()
}

const validateFavorite = (schema, res, obj, next) => {
  const validationFavorite  = schema.validate(obj)
 
  if (validationFavorite .error) {
    return res.status(400).json({ message: `missing required ${validationFavorite.error.details[0].path[0]} field!!`});
  }
  next()
}

const { isValidObjectId } = require("mongoose");

const isValidId = (req, res,  next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, ` Not found`));
  }
  next();
};

module.exports = {
  isValidId,
  noBody,
  validateFavorite,
  validateBody: (req, res, next) => {
    return validate(addScema, res, req.body, next);
  },
};
