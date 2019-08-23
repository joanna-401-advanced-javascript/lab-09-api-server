'use strict';

/**
 * Handles 404 errors
 * @param req {object}
 * @param res {object}
 * @param next, to next middleware
 */
module.exports = (req,res, next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
