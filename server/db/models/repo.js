'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var featureSchema = new mongoose.Schema({
    title: {required: true, type: String},
    task: [{
      title: {type: String},
      body: {type: String},
      comments: {type: String},
      assignee:{type: String},
      status: {required: true, type: String, default: 'Open'},
      label: [{String}],
      dueDate: {type: String}
    }]
}); 




mongoose.model('Feature', featureSchema);