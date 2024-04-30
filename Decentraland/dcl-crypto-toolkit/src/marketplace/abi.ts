export default [
  {
    constant: false,
    inputs: [
      {
        name: '_ownerCutPerMillion',
        type: 'uint256'
      }
    ],
    name: 'setOwnerCutPerMillion',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_legacyNFTAddress',
        type: 'address'
      }
    ],
    name: 'setLegacyNFTAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'ERC721_Interface',
    outputs: [
      {
        name: '',
        type: 'bytes4'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'InterfaceId_ValidateFingerprint',
    outputs: [
      {
        name: '',
        type: 'bytes4'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'unpause',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'acceptedToken',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'assetId',
        type: 'uint256'
      }
    ],
    name: 'cancelOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'paused',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'nftAddress',
        type: 'address'
      },
      {
        name: 'assetId',
        type: 'uint256'
      }
    ],
    name: 'cancelOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'nftAddress',
        type: 'address'
      },
      {
        name: 'assetId',
        type: 'uint256'
      },
      {
        name: 'priceInWei',
        type: 'uint256'
      },
      {
        name: 'expiresAt',
        type: 'uint256'
      }
    ],
    name: 'createOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'pause',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'nftAddress',
        type: 'address'
      },
      {
        name: 'assetId',
        type: 'uint256'
      },
      {
        name: 'price',
        type: 'uint256'
      },
      {
        name: 'fingerprint',
        type: 'bytes'
      }
    ],
    name: 'safeExecuteOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'ownerCutPerMillion',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'assetId',
        type: 'uint256'
      },
      {
        name: 'priceInWei',
        type: 'uint256'
      },
      {
        name: 'expiresAt',
        type: 'uint256'
      }
    ],
    name: 'createOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'publicationFeeInWei',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'nftAddress',
        type: 'address'
      },
      {
        name: 'assetId',
        type: 'uint256'
      },
      {
        name: 'price',
        type: 'uint256'
      }
    ],
    name: 'executeOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_publicationFee',
        type: 'uint256'
      }
    ],
    name: 'setPublicationFee',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'contractName',
        type: 'string'
      },
      {
        name: 'migrationId',
        type: 'string'
      }
    ],
    name: 'isMigrated',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_acceptedToken',
        type: 'address'
      },
      {
        name: '_legacyNFTAddress',
        type: 'address'
      },
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_sender',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'legacyNFTAddress',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'assetId',
        type: 'uint256'
      }
    ],
    name: 'auctionByAssetId',
    outputs: [
      {
        name: '',
        type: 'bytes32'
      },
      {
        name: '',
        type: 'address'
      },
      {
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address'
      },
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'orderByAssetId',
    outputs: [
      {
        name: 'id',
        type: 'bytes32'
      },
      {
        name: 'seller',
        type: 'address'
      },
      {
        name: 'nftAddress',
        type: 'address'
      },
      {
        name: 'price',
        type: 'uint256'
      },
      {
        name: 'expiresAt',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'assetId',
        type: 'uint256'
      },
      {
        name: 'price',
        type: 'uint256'
      }
    ],
    name: 'executeOrder',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'assetId',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'seller',
        type: 'address'
      },
      {
        indexed: false,
        name: 'nftAddress',
        type: 'address'
      },
      {
        indexed: false,
        name: 'priceInWei',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'expiresAt',
        type: 'uint256'
      }
    ],
    name: 'OrderCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'assetId',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'seller',
        type: 'address'
      },
      {
        indexed: false,
        name: 'nftAddress',
        type: 'address'
      },
      {
        indexed: false,
        name: 'totalPrice',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'buyer',
        type: 'address'
      }
    ],
    name: 'OrderSuccessful',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'assetId',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'seller',
        type: 'address'
      },
      {
        indexed: false,
        name: 'nftAddress',
        type: 'address'
      }
    ],
    name: 'OrderCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'publicationFee',
        type: 'uint256'
      }
    ],
    name: 'ChangedPublicationFee',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'ownerCutPerMillion',
        type: 'uint256'
      }
    ],
    name: 'ChangedOwnerCutPerMillion',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'legacyNFTAddress',
        type: 'address'
      }
    ],
    name: 'ChangeLegacyNFTAddress',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'assetId',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'seller',
        type: 'address'
      },
      {
        indexed: false,
        name: 'priceInWei',
        type: 'uint256'
      },
      {
        indexed: false,
        name: 'expiresAt',
        type: 'uint256'
      }
    ],
    name: 'AuctionCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'assetId',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'seller',
        type: 'address'
      },
      {
        indexed: false,
        name: 'totalPrice',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'winner',
        type: 'address'
      }
    ],
    name: 'AuctionSuccessful',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'bytes32'
      },
      {
        indexed: true,
        name: 'assetId',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'seller',
        type: 'address'
      }
    ],
    name: 'AuctionCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Pause',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Unpause',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'contractName',
        type: 'string'
      },
      {
        indexed: false,
        name: 'migrationId',
        type: 'string'
      }
    ],
    name: 'Migrated',
    type: 'event'
  }
]
