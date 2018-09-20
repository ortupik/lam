'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');


/**
 * Laptop Schema
 */

var ComputerSchema = new Schema({
  id: {
    type: 'Number'
  },
  name: {
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
    'Diagonal display': {
      type: 'String'
    },
    CPU: {
      type: 'String'
    },
    RAM: {
      type: 'String'
    },
    'Video Card': {
      type: 'String'
    }
  }
});

mongoose.model('Computer', ComputerSchema);