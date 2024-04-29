import hre, { ethers } from "hardhat";
import { Checker__factory } from "../../typechain-types";
import { bytecode } from "../bytecode.json";
import { getContractsForNetwork } from "../utils";
import { getTestsForNetwork } from "./checkLAND.tests";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

async function main() {
  const { LAND, ESTATE } = getContractsForNetwork(hre.network.name);
  const tests = getTestsForNetwork(hre.network.name);

  const hex = await hre.network.provider.send("eth_call", [
    {
      to: checkerAddress,
      data: checkerInterface.encodeFunctionData("multicall", [
        tests.map((test) =>
          checkerInterface.encodeFunctionData("checkLAND", [
            test.params.sender,
            LAND!,
            ESTATE!,
            test.params.x,
            test.params.y,
          ])
        ),
      ]),
    },
    "latest",
    {
      [checkerAddress]: {
        code: bytecode,
      },
    },
  ]);

  console.log(checkerInterface.decodeFunctionResult("multicall", hex)[0]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
