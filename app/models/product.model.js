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

var ProductSchema = new Schema({
  id: {
    type: 'Number'
  },
  name: {
    type: 'String'
  },
  category: {
    type: 'String'
  },
  subcategory: {
    type: 'String'
  },
  type: {
    type: 'String'
  },
  href: {
    type: 'String'
  },
  image: {
    small: {
      type: 'String'
    },
    medium: {
      type: 'String'
    },
    large: {
      type: 'String'
    }
  },
  additionalImages: {
    type: [
      'Mixed'
    ]
  },
  price: {
    type: 'String'
  },
  oldPrice: {
    type: 'String'
  },
  brand: {
    name: {
      type: 'String'
    },
    image: {
      type: 'String'
    },
    href: {
      type: 'String'
    }
  },
  variations: {
    type: [
      'Mixed'
    ]
  },
  overview: {
    type: 'String'
  },
  specifications: {
    type: [
      'Mixed'
    ]
  },
  reviews: {
    type: [
      'Mixed'
    ]
  },
  questions: {
    type: [
      'Mixed'
    ]
  },
  isNotAvailable: {
    type: 'Boolean'
  },
  isOnSale: {
    type: 'Boolean'
  },
  isAddedToCart: {
    type: 'Boolean'
  },
  isAddedToFavorites: {
    type: 'Boolean'
  },
  isAddedToCompare: {
    type: 'Boolean'
  },
  statuses: {
    type: [
      'String'
    ]
  },
  properties: {
    type: [
      'Mixed'
    ]
  }
}); 

mongoose.model('Product', ProductSchema);