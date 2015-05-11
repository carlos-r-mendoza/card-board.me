'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var featureSchema = new mongoose.Schema({
    title: {required: true, type: String},
    details: {required: true, type: String},
    phases: [{
      name: {required: true, type: String, default:'Open'},
      cards: [
        {
          title: {required: true, type: String},
          details: {required: true, type: String},
          status: {required: true, type: String, default: 'Open'},
          comments: {type: String},
          assignee:{type: String},
          label: [{type: String}],
          dueDate: {type: String}
        }
      ]
    }]
}); 




mongoose.model('Feature', featureSchema);