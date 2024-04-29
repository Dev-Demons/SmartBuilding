/*!
 * ec.js - ecdsa wrapper for secp256k1 and elliptic
 * Copyright (c) 2014-2016, Christopher Jeffrey (MIT License).
 * Copyright (c) 2016-2017, Manuel Araoz (MIT License).
 * https://github.com/decentraland/decentraland-node
 */

'use strict';

var secp256k1;

if (+process.env.DECENTRALAND_USE_ELLIPTIC !== 1) {
  try {
    secp256k1 = require('secp256k1');
  } catch (e) {
    ;
  }
}

module.exports = secp256k1
  ? require('./ec-secp256k1')
  : require('./ec-elliptic');
