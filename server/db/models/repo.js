'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var repoSchema = new mongoose.Schema({
  owner: {type: String},
  collaborators: [type: String],
  repoName: {type: String},
  description: {type: String},
  forks_count: {type: Number},
  size: {type: Number},
  open_issues_count: {type: Number},
  pushed_at: {type: String},
  created_at: {type: String},
  updated_at: {type: String},
  feature: {
    task: [{
        toDo: {type: String},
        owner:{type: String},
        status:{type: String} 
    }],
    dueDate: {type: String}
  }
  
}); 




mongoose.model('Repo', repoSchema);