# LAB - 09

## API Server

### Author: Joanna Arroyo

### Links and Resources
* [submission PR](https://github.com/joanna-401-advanced-javascript/lab-09-api-server/pull/1)
* [travis](https://travis-ci.com/joanna-401-advanced-javascript/lab-09-api-server)
* [front-end](https://joanna-lab-09.herokuapp.com/)

#### Documentation
* [api docs](./docs/swagger.json)
* [jsdoc](https://joanna-lab-09.herokuapp.com/docs)

### Modules
#### `v1.js`
##### Exported Values and Methods

###### `handleGetAll() -> object`
Gets all existing records

###### `handleGetOne(id) -> object`
Gets one existing record by id

###### `handlePost() -> object`
Creates new record

###### `handlePut(id) -> object`
Updates existing record

###### `handleDelete(id) -> object`
Deletes existing record


### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` - URL to the running mongo instance/db

#### Running the app
* `node index.js`
* Endpoint: `/api/v1/categories`
  * Returns all existing categories
* Endpoint: `/api/v1/products`
  * Returns all existing categories
  
#### Tests
* Unit tests: `npm run test`
* Lint tests: `npm run lint`

#### UML
![UML Image]()