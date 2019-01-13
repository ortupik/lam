'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  mongoosePaginate = require('mongoose-paginate');

/**
 * Order Schema
 */

var schema = new mongoose.Schema({ /* schema definition */ });
 

var OrderSchema = new Schema({
  items: {
    type: 'Array'
  },
  amount: {
    type: 'String'
  },
  currency: {
    type: 'String'
  },
  type: {
    type: 'String'
  },
  description: {
    type: 'String'
  },
  reference: {
    type: 'String'
  },
  customer: {
      type: 'Mixed'
  },
  _paymentMethod: {
      type: 'Mixed'
  },
  _scraper: {
     type: 'Mixed'
  }

}); 

OrderSchema.plugin(mongoosePaginate);
mongoose.model('Order', OrderSchema);