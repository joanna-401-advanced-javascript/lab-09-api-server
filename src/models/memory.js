'use strict';

const uuid = require('uuid/v4');

class Model {
  /***
   * Database constructor
   */
  constructor() {
    this.database = [];
  }

  /***
   * Gets a record from the database
   * @param id {string}
   * @returns {*}
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /***
   * Creates a record in the database
   * @param {object} matches schema
   * @returns {*}
   */
  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /***
   * Updates a record in the database
   * @param id {string}
   * @param entry {object}
   * @returns {*}
   */
  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /***
   * Deletes a record from the database
   * @param id {string}
   * @returns {*}
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /***
   * Checks that the entry is valid
   * @param entry {object} matches the database schema
   * @returns { * |undefined}
   */
  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;
