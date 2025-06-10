import Joi from "joi";

// User registeration validation

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const registerUserValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    // 400 - bad request like missing field, invalid data type, validation error etc
    return res.status(400).json({
      message: error.details[0].message, // one message at a time
      success: false,
    });
  }

  next();
};

// User signing validation

const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUserValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      success: false,
    });
  }
  next();
};
