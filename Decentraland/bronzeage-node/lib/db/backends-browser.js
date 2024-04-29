/**
 * backends-browser.js - database backends for decentraland
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var level = require('./level');
var RBT = require('./rbt');

exports.get = function get(name) {
  if (name === 'rbt')
    return RBT;
  return level;
};
