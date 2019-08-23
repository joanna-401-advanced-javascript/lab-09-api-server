'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

router.param('model', modelFinder.load);

router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

/**
 * This fetches all the records by model
 * @route GET /api/v1/:model
 * @param request {object}
 * @param response {object} 200 - Object of results
 * @param next
 */
router.get('/api/v1/:model', handleGetAll);

/**
 * This fetches one records according to id and model
 * @route GET /api/v1/:model/:id
 * @param request {object}
 * @param response {object} 200 - Requested result
 * @param next
 */
router.post('/api/v1/:model', handlePost);

/**
 * This creates a new record
 * @route POST /api/v1/:model
 * @param request {object}
 * @param response {object} 200 - Posted object
 * @param next
 */
router.get('/api/v1/:model/:id', handleGetOne);

/**
 * This updates an existing record
 * @route PUT /api/v1/:model/:id
 * @param request {object}
 * @param response {object} 200 - Posted object
 * @param next
 */
router.put('/api/v1/:model/:id', handlePut);

/**
 * This deletes an existing record by id
 * @route DELETE /api/v1/:model/:id
 * @param request {object}
 * @param response {object} 200 - Deleted object
 * @param next
 */
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.create(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.update(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
