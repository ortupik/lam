'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  mongoosePaginate = require('mongoose-paginate');

/**
 * Shipping Schema
 */

 var schema = new mongoose.Schema({ /* schema definition */ });
 

var ShippingSchema = new Schema({
  user_id: {
    type: 'String'
  },
  fname: {
    type: 'String'
  },
  lname: {
    type: 'String'
  },
  phone: {
    type: 'String'
  },
  email: {
    type: 'String'
  },
  county: {
    type: 'String'
  },
  city: {
    type: 'String'
  },
  address: {
     type: 'String'
  },
  street: {
    type: 'String'
  },
  building: {
    type: 'String'
  },
  apartment: {
    type: 'String'
  },
  floor: {
    type: 'String'
  },
  entrance: {
    type: 'String'
  },
  comment: {
    type: 'String'
  },
  postcode: {
    type: 'String'
  },
  pref_date: {
    type: 'String'
  },
  selected: {
    type: 'String',
    default:'false'
  }
}); 

ShippingSchema.plugin(mongoosePaginate);
mongoose.model('Shipping', ShippingSchema);