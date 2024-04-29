import hre, { ethers } from "hardhat";
import { Checker__factory } from "../../typechain-types";
import { bytecode } from "../bytecode.json";
import { getContractsForNetwork } from "../utils";
import { getTestsForNetwork } from "./validateWearables.tests";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

async function main() {
  const { FACTORY_1, FACTORY_2, COMMITTEE_1, COMMITTEE_2 } = getContractsForNetwork(hre.network.name);
  const tests = getTestsForNetwork(hre.network.name);

  for (let i = 0; i < tests.length; i++) {
    try {
      const { params, block, expected } = tests[i];

      const factories = [FACTORY_1!, FACTORY_2!]
        .filter(({ sinceBlock }) => block >= sinceBlock)
        .map(({ address }) => address);

      const commitees = [COMMITTEE_1!, COMMITTEE_2!]
        .filter(({ sinceBlock }) => block >= sinceBlock)
        .map(({ address }) => address);

      const hex = await hre.network.provider.send("eth_call", [
        {
          to: checkerAddress,
          data: checkerInterface.encodeFunctionData("validateWearables", [
            params.sender,
            factories,
            params.collection,
            params.itemId,
            params.contentHash,
            commitees,
          ]),
        },
        ethers.utils.hexStripZeros(ethers.utils.hexlify(block)),
        {
          [checkerAddress]: {
            code: bytecode,
          },
        },
      ]);

      const hasAccess = checkerInterface.decodeFunctionResult("validateWearables", hex)[0];

      hasAccess === expected ? console.log("SUCCESS") : console.error("FAILURE");
    } catch (e) {
      console.error("FAILURE: error", (e as Error).message);
      console.error("FAILURE: ", (e as Error).message);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
