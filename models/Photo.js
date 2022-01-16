const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: { type: Date, default: Date.now },
});

//create model
const Photo = mongoose.model('photo', PhotoSchema);

module.exports = Photo;
