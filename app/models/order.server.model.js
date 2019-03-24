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
  user_id: {
    type: String,
    required: 'user_id missing'
  },
  order_id: {
   type: String,
   required: 'order_id missing'
  },
  items: {
    type: 'Array',
    require: 'order items missing' 
  },
  amount: {
    type: 'String'
  },
  shippingFee: {
    type: 'String'
  },
  discount: {
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
  },
  shippingAddress: {
     type: 'Mixed'
  },
  status: {
    type: 'String',
    default: 'processing'
  },
  date: {
    type: Date,
    default: Date.now
  }

}); 

OrderSchema.plugin(mongoosePaginate);
mongoose.model('Order', OrderSchema);