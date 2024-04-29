export function getContractsForNetwork(network: string) {
  switch (network) {
    case "mainnet":
      return {
        LAND: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
        ESTATE: "0x959e104e1a4db6317fa58f8295f586e1a978c297",
        REGISTRAR: "0x2a187453064356c898cae034eaed119e1663acb8",
      };
    case "goerli":
      return {
        LAND: "0x25b6B4bac4aDB582a0ABd475439dA6730777Fbf7",
        ESTATE: "0xC9A46712E6913c24d15b46fF12221a79c4e251DC",
        REGISTRAR: "0x6b8da2752827cf926215b43bb8e46fd7b9ddac35",
      };
    case "matic":
      return {
        TPR: "0x1c436c1efb4608dffdc8bace99d2b03c314f3348",
        FACTORY_1: {
          address: "0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8",
          sinceBlock: 15202563,
        },
        FACTORY_2: {
          address: "0x3195e88aE10704b359764CB38e429D24f1c2f781",
          sinceBlock: 28121692,
        },
        COMMITTEE_1: {
          address: "0x71d9350Ef44E1e451F00e447C0DfF2d1FB75510a",
          sinceBlock: 15202559,
        },
        COMMITTEE_2: {
          address: "0xaeec95a8aa671a6d3fec56594827d7804964fa70",
          sinceBlock: 19585299,
        },
      };
    case "mumbai":
      return {
        TPR: "0xedf516f2d42a47f9ce0b145fe0dbb76975379889",
        FACTORY_1: {
          address: "0x2A72Ec4241Ac4fBc915ae98aC5a5b01AdE721f4B",
          sinceBlock: 14517381,
        },
        FACTORY_2: {
          address: "0xDDb3781Fff645325C8896AA1F067bAa381607ecc",
          sinceBlock: 26012021,
        },
        COMMITTEE_1: {
          address: "0x4bb5ACe5ceB3Dd51ea35fa01a8f9B5507c234270",
          sinceBlock: 14517376,
        },
        COMMITTEE_2: {
          address: "0xe18B1361d41afC44658216F3Dc27e48c2336e3c2",
          sinceBlock: 18881998,
        },
      };
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
