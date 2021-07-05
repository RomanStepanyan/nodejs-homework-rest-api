const Joi = require("joi");

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  ),
}).min(1);

const schemaCreate = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaCreateUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// const schemaLoginUser = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string()
//     .regex(/^\d{3}-\d{3}-\d{4}$/)
//     .required(),
//   token: Joi.string().required(),
// });

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreate, req.body, next);
};

module.exports.updateContact = (req, _res, next) => {
  return validate(schemaUpdate, req.body, next);
};

module.exports.updateContactStatus = (req, _res, next) => {
  return validate(schemaUpdateStatus, req.body, next);
};

module.exports.user = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

// module.exports.loginUser = (req, _res, next) => {
//   return validate(schemaLoginUser, req.body, next);
// };
