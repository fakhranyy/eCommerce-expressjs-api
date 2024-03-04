import { validationResult } from "express-validator";

/**
 * @desc finds the vallidation errors in this request and wraps them in an object with handy functions
 * @behaviour catch errors from rules of the validation if it exists
 */
export const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
