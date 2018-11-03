'use strict';

jest.mock('require-dir');

import modelFinder from '../../../src/middleware/model-finder.js';

describe('Model Finder Middleware', () => {
  it('throws an error if a valid model is not presnt', () => {
    let request = {params:{}};
    let response = {};
    let next = jest.fn();
    modelFinder(request,response,next)
    expect(next).toHaveBeenCalledWith('Invalid Model');
  });
  it('returns a model object/function when a valid model is requested', () => {
    let request = {params:{model:'foo'}};
    let response = {};
    let next = jest.fn();
    modelFinder(request,response,next);
    expect(request.model).toBeDefined();
    expect(next).toHaveBeenCalledWith();
  });
});
