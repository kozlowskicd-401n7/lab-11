'use strict';

import memoryStorage from './memory.js';
import fileStorage from './filesystem.js';
import mongo from './mongo.js';

let dataStorageModule = {};

switch( process.env.STORAGE ) {
  case 'filesystem':
    dataStorageModule = fileStorage;
    break;
  case 'mongo':
    dataStorageModule = mongo;
  default:
    dataStorageModule = memoryStorage;
    break;
}

export default dataStorageModule;
