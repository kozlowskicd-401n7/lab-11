'use strict';

import mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

let mongoServer;

const {server} = require('../../src/app.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
// These functions spool up a mock server and shut it down after tests

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, (err) => {
    if(err) {console.log(err);}
  });
});

afterAll( () => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('API server', () => {
  it('should respond with a 404 on invalid route', () => {
    return mockRequest
    .get('/nope')
    .then (results => {
      expect(results.status).toBe(404);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
  });

  it('can pull documents with get', () => {
    return mockRequest
    .get('/api/v1/foo')
    .then(results => {
      expect(results.status).toBe(200);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
  });
  
  it('posts to the post route', () => {
    let obj = {title:"what", text:"ever"};
    return mockRequest
    .post('/api/v1/foo')
    .send(obj)
    .then(results => {
      console.log(results.body);
      expect(results.status).toBe(200);
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
  });

  it('can pull 1 document with get', () => {
    let obj = {title:"what", text:"ever", _id:1};
    return mockRequest
    .post('/api/v1/foo')
    .send(obj)
    .then(() => {
      mockRequest
      .get('api/v1/foo/1')
      .then(results => {
          expect(results.status).toBe(200)
      })
      .catch(err => {
          expect(err).not.toBeDefined();
      });
    });
  });
    
  it('deletes on the delete route', () => {
    let obj = {title:"what", text:"ever", _id:1};
    return mockRequest
    .post('/api/v1/foo/')
    .send(obj)
    .then(() => {
      mockRequest
      .delete('/api/v1/foo/1')
      .then((results) => {
        expect(results.status).toBe(200)
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
    });
  });

  it('patches to the patch route', () => {
    let obj = {title:"what", text:"ever", _id:1};
    return mockRequest
    .post('/api/v1/foo/')
    .send(obj)
    .then(() => {
      obj = {title:"new", text:"stuff"};
      mockRequest
      .patch('api/v1/foo/1')
      .send(obj)  
      .then (results => {
        expect(results.status).toBe(200);
      })
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
  });

  it('puts on the put route', () => {
    let obj = {title:"what", text:"ever", _id:1};
    return mockRequest
    .post('/api/v1/foo/')
    .send(obj)
    .then(() => {
      obj = {title:"new", text:"stuff", _id:1}
      mockRequest
      .put('api/v1/foo/1')  
      .then (results => {
        expect(results.status).toBe(200);
      })
    })
    .catch(err => {
      expect(err).not.toBeDefined();
    });
  });

});