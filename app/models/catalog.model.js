'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

/**
 * Product Schema
 */

var CatalogSchema = new Schema({
    name: {
      type: 'String'
    },
    id: {
      type: 'String'
    },
    image: {
      type: 'String'
    },
    quantity: {
      type: 'Number'
    },
    items: {
      type: [
        'Mixed'
      ]
    }
}); 

mongoose.model('Catalog', CatalogSchema);