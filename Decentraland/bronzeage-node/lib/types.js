/**
 * An inverse enum. Retrieves key by value.
 * @typedef {Object} RevMap
 * @global
 */

/**
 * @typedef {Object} Path
 * @property {String} name - Account name.
 * @property {Number} account - Account index.
 * @property {Number} change - Change chain.
 * @property {Number} index - Address index.
 * @global
 */

/**
 * One of {@link module:constants.inv}.
 * @typedef {Number|String} InvType
 * @global
 */

/**
 * @typedef {Object} Outpoint
 * @property {Hash} hash
 * @property {Number} index
 * @global
 */

/**
 * An output script type.
 * @see {module:constants.scriptTypes}
 * May sometimes be a string if specified.
 * @typedef {Number|String} ScriptType
 * @global
 */

/**
 * A subset of {@link ScriptType}, including
 * pubkeyhash, scripthash, witnesspubkeyhash,
 * and witnessscripthash. This value
 * specifically refers to the address prefix.
 * It is a network-agnostic way of representing
 * prefixes. May sometimes be a string if
 * specified.
 * @typedef {Number|String} AddressType
 * @global
 */

/**
 * A bitfield containing locktime flags.
 * @typedef {Number} LockFlags
 * @global
 */

/**
 * A map of address hashes ({@link Hash} -> value).
 * @typedef {Object} AddressMap
 * @global
 */

/**
 * @typedef {Object} ParsedURI
 * @property {Base58Address} address
 * @property {Amount?} amount? - Amount in satoshis.
 * @property {String?} label
 * @property {String?} message
 * @property {String?} request - Payment request URL.
 * @global
 */

/**
 * Wallet ID
 * @typedef {String} WalletID
 * @global
 */

/**
 * Base58 string.
 * @typedef {String} Base58String
 * @global
 */

/**
 * Base58 address.
 * @typedef {String} Base58Address
 * @global
 */

/**
 * Buffer or hex-string hash.
 * @typedef {Buffer|String} Hash
 * @global
 */

/**
 * Reversed hex-string hash (uint256le).
 * @typedef {String} ReversedHash
 * @global
 */

/**
 * Signature hash type. One of `all`, `single`, `none`, or
 * one of {@link constants.hashType}.
 * @typedef {String|Number} SighashType
 * @global
 */

/**
 * Wallet balance.
 * @typedef {Object} Balance
 * @property {Amount} confirmed
 * @property {Amount} unconfirmed
 * @property {Amount} total
 * @global
 */

/**
 * A satoshi amount. This is technically a
 * JS double float, but it is regularly
 * enforced to be less than 53 bits and
 * less than MAX_MONEY in various
 * functions.
 * @typedef {Number} Amount
 * @global
 */

/**
 * Rate of satoshis per kB.
 * @typedef {Amount} Rate
 * @global
 */

/**
 * A big number (bn.js)
 * @typedef {Object} BN
 * @global
 */

/**
 * A bitfield containing script verify flags.
 * @typedef {Number} VerifyFlags
 * @global
 */

/**
 * @typedef {Object} Orphan
 * @property {Hash} hash - Orphan TX hash.
 * @property {Number} index - Orphan input index.
 * @global
 */

/**
 * @typedef {Object} CoinSelection
 * @property {Coin[]?} chosen - Selected coins.
 * @property {Amount} change - Amount of change to add.
 * @property {Amount} fee - Estimated fee.
 * @property {Amount} total - Total value.
 * @global
 */

/**
 * @typedef {Object} DeploymentState
 * @property {VerifyFlags} flags
 * @property {LockFlags} lockFlags
 * @property {Boolean} coinbaseHeight - Whether coinbase height is enforced.
 * @property {Boolean} segwit
 * @property {Boolean} csv
 * @global
 */

/**
 * @typedef {Object} SubmitOrderPacket
 * @property {Hash} hash
 * @property {TX} tx
 * @global
 */

/**
 * @typedef {Object} ReplyPacket
 * @property {Hash} hash
 * @property {Number} code
 * @property {Buffer} publicKey
 * @global
 */

/**
 * @typedef {Object} FilterLoadPacket
 * @see Bloom
 * @property {Buffer} filter - Serialized bloom filter.
 * @property {Number} n - Number of hash functions.
 * @property {Number} tweak - Bloom filter seed.
 * @property {String|Number} update (See {@link constants.filterFlags}).
 * @global
 */

/**
 * @typedef {Object} FilterAddPacket
 * @see Bloom
 * @property {Buffer} data - Data to add to filter.
 * @global
 */

/**
 * @typedef {Object} GetUTXOsPacket
 * @property {Boolean} mempool - Check mempool.
 * @property {Outpoint[]} prevout - Outpoints.
 * @global
 */

/**
 * @typedef {Object} NakedCoin
 * @property {Number} version - Transaction version.
 * @property {Number} height - Transaction height (-1 if unconfirmed).
 * @property {Amount} value - Output value in satoshis.
 * @property {Script} script - Output script.
 * @property {Boolean} coinbase - Whether the containing
 * transaction is a coinbase.
 * @property {Hash} hash - Transaction hash.
 * @property {Number} index - Output index.
 * @global
 */

/**
 * @typedef {Object} UTXOsPacket
 * @property {Array?} data.hits - Hits (array of
 * 1s and 0s representing a bit mask).
 * @property {Buffer?} data.map - Hit map.
 * @property {Object} data.height - Chain height.
 * @property {Hash} data.tip - Chain tip hash.
 * @property {Coin[]} data.coins
 * @global
 */

/**
 * @typedef {Object} PingPacket
 * @property {BN} nonce
 * @global
 */

/**
 * @typedef {Object} NakedBlock
 * @property {Number} version - Transaction version. Note that Decentraland reads
 * versions as unsigned even though they are signed at the protocol level.
 * This value will never be negative.
 * @property {Hash} prevBlock
 * @property {Hash} merkleRoot
 * @property {Number} ts
 * @property {Number} bits
 * @property {Number} nonce
 * @property {Number} height
 * @property {Number} totalTX
 * @property {NakedTX[]?} txs - Only present on blocks.
 * @property {Hash[]?} hashes - Only present on merkleblocks.
 * @property {Buffer?} flags - Only present on merkleblocks.
 * @property {Number?} coinbaseHeight - Only present on compactblocks.
 * @global
 */

/**
 * @typedef {Object} NakedInput
 * @property {Outpoint} prevout
 * @property {NakedScript} script - Input script.
 * @property {Number} sequence - nSequence.
 * @property {NakedWitness} witness - Witness.
 * @global
 */

/**
 * @typedef {Object} NakedOutput
 * @property {Amount} value - Value in satoshis.
 * @property {NakedScript} script - Output script.
 * @global
 */

/**
 * @typedef {Object} NakedCoin
 * @property {Number} version - Transaction version.
 * @property {Number} height - Transaction height (-1 if unconfirmed).
 * @property {Amount} value - Output value in satoshis.
 * @property {Script} script - Output script.
 * @property {Boolean} coinbase - Whether the containing
 * transaction is a coinbase.
 * @property {Hash} hash - Transaction hash.
 * @property {Number} index - Output index.
 * @global
 */

/**
 * @typedef {Object} NakedTX
 * @property {Number} version
 * @property {Number} flag
 * @property {NakedInput[]} inputs
 * @property {NakedOutput[]} outputs
 * @property {Number} locktime
 * @global
 */

/**
 * @typedef {Object} NakedScript
 * @property {Buffer} raw - Raw code.
 * @property {Array} code - Parsed code.
 * @global
 */

/**
 * @typedef {Object} NakedWitness
 * @property {Buffer[]} items - Stack items.
 * @global
 */

/**
 * @typedef {Object} FeeFilterPacket
 * @property {Rate} rate
 * @global
 */

/**
 * One of `main`, `testnet`, `regtest`, `segnet3`, `segnet4`.
 * @typedef {String} NetworkType
 * @see {module:network.types}
 * @global
 */

/*
 * Callbacks & Events
 */

/**
 * @callback TXCallback
 * @param {Error?} err
 * @param {TX} tx
 * @global
 */

/**
 * @callback TXSCallback
 * @param {Error?} err
 * @param {TX[]} txs
 * @global
 */

/**
 * @callback MTXCallback
 * @param {Error?} err
 * @param {MTX} tx
 * @global
 */

/**
 * @callback MTXSCallback
 * @param {Error?} err
 * @param {MTX[]} txs
 * @global
 */

/**
 * @callback CoinCallback
 * @param {Error?} err
 * @param {Coin} tx
 * @global
 */

/**
 * @callback CoinsCallback
 * @param {Error?} err
 * @param {Coin[]} tx
 * @global
 */

/**
 * @callback VerifyCallback
 * @param {VerifyError?} err
 * @global
 */

/**
 * @callback BlockCallback
 * @param {Error?} err
 * @param {Block} block
 * @global
 */

/**
 * @callback EntryCallback
 * @param {Error?} err
 * @param {ChainEntry} entry
 * @global
 */

/**
 * @callback EntriesCallback
 * @param {Error?} err
 * @param {ChainEntry[]} entry
 * @global
 */

/**
 * @callback BalanceCallback
 * @param {Error?} err
 * @param {Balance} balance
 * @global
 */

/**
 * @callback BooleanCallback
 * @param {Error?} err
 * @param {Boolean} result
 * @global
 */

/**
 * @callback NumberCallback
 * @param {Error?} err
 * @param {Number} result
 * @global
 */

/**
 * @callback HashCallback
 * @param {Error?} err
 * @param {Hash} hash
 * @global
 */

/**
 * @callback HashesCallback
 * @param {Error?} err
 * @param {Hash[]} hash
 * @global
 */

/**
 * @callback WalletCallback
 * @param {Error?} err
 * @param {Wallet|NakedWallet} wallet
 * @global
 */

/**
 * @callback BufferCallback
 * @param {Error?} err
 * @param {Buffer} data
 * @global
 */

/**
 * @callback ObjectCallback
 * @param {Error?} err
 * @param {Object} obj
 * @global
 */

/**
 * @callback DeploymentCallback
 * @param {(Error|VerifyError)?} err
 * @param {DeploymentState} state
 * @global
 */

/**
 * @callback MinerBlockCallback
 * @param {Error?} err
 * @param {MinerBlock} block
 * @global
 */

/**
 * @callback AddressMapCallback
 * @param {Error?} err
 * @param {AddressMap} map
 * @global
 */

/**
 * @callback AddressTableCallback
 * @param {Error?} err
 * @param {AddressTable} table
 * @global
 */

/**
 * @callback OrphanCallback
 * @param {Error?} err
 * @param {Orphan} orphan
 * @global
 */

/**
 * @callback TSHeightCallback
 * @param {Error?} err
 * @param {Number} ts
 * @param {Number} height
 * @global
 */

/**
 * @callback ConfidenceCallback
 * @param {Error?} err
 * @param {Confidence} confidence
 * @global
 */

/**
 * @callback HashHeightCallback
 * @param {Error?} err
 * @param {Hash} hash
 * @param {Number} height
 * @global
 */
