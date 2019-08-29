'use strict';
/**
 * API Server Module
 * @module src/middleware/500
 */

/**
 * Handles errors
 * @param err {object}
 * @param req {object}
 * @param res {object}
 * @param next, to next middleware
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
};
