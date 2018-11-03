'use strict';

import requireAll from 'require-dir';

const models = requireAll('../models');
/*
{
  notes: { default: [Function: Notes] },
  tasks: { default: [Function: Tasks] }
}

 */

export default (request,response,next) => {
  let model = request.params.model;
  console.log(model);
  if(model && models[model] && models[model].default) {
    request.model = models[model].default;
    next();
  }
  else {
    next('Invalid Model');
  }
};
