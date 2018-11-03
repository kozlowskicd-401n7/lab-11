'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
jsonSchema(mongoose);

const categories = mongoose.Schema({
  title: {type:String, required:true},
  text: {type:String},
});

export default mongoose.model('categories', categories);