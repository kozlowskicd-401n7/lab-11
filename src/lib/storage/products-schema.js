'use strict';

import mongoose from 'mongoose';
import jsonSchema from 'mongoose-schema-jsonschema';
jsonSchema(mongoose);

const products = mongoose.Schema({
  title: {type:String, required:true},
  text: {type:String},
  quantity: {type:Number, required:true},
  category: {type:String, required: true}
});

export default mongoose.model('products', products);