const Joi = require("joi");

const houseValidationMiddleware = (req, res, next) => {
  // Trim whitespace from keys in the request body
  req.body = Object.fromEntries(
    Object.entries(req.body).map(([key, value]) => [key.trim(), value])
  );
  const schema = Joi.object({
    location: Joi.string().required(),
    type: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    availability: Joi.string()
      .valid("available", "unavailable", "rented")
      .required(),
    // photos: Joi.array().items(Joi.string().required()).required(),
    // rating: Joi.number().min(1).max(5).required(),
    bedrooms: Joi.number().integer().min(1).required(),
    nightly_price: Joi.number().positive().required(),
    beds: Joi.number().integer().min(1).required(),
    privateBath: Joi.boolean().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    console.error("Joi Validation Error:", validation.error.details[0].message);
    return res.status(400).json({ 
      error: validation.error.details[0].message 
    });
  } else {
    console.log("Everything has passed");
  }

  next();
};

module.exports = houseValidationMiddleware;