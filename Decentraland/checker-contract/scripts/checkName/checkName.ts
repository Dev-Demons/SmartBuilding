import hre, { ethers } from "hardhat";
import { Checker__factory } from "../../typechain-types";
import { bytecode } from "../bytecode.json";
import { getContractsForNetwork } from "../utils";
import { getTestsForNetwork } from "./checkName.tests";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

async function main() {
  const { REGISTRAR } = getContractsForNetwork(hre.network.name);
  const tests = getTestsForNetwork(hre.network.name);

  for (let i = 0; i < tests.length; i++) {
    try {
      const { params, block, expected } = tests[i];

      const hex = await hre.network.provider.send("eth_call", [
        {
          to: checkerAddress,
          data: checkerInterface.encodeFunctionData("checkName", [params.sender, REGISTRAR!, params.name]),
        },
        ethers.utils.hexStripZeros(ethers.utils.hexlify(block)),
        {
          [checkerAddress]: {
            code: bytecode,
          },
        },
      ]);

      const hasAccess = checkerInterface.decodeFunctionResult("checkName", hex)[0];

      hasAccess === expected ? console.log("SUCCESS") : console.error("FAILURE");
    } catch (e) {
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
