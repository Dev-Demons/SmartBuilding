import hre, { ethers } from "hardhat";
import TPRAbi from "../../abis/TPR.json";
import { getContractsForNetwork } from "../utils";
import { getTestsForNetwork } from "./validateThirdParty.tests";

async function main() {
  const { TPR } = getContractsForNetwork(hre.network.name);
  const test = getTestsForNetwork(hre.network.name)[0];

  const tpr = new ethers.Contract(TPR!, TPRAbi, ethers.provider);

  const options = { blockTag: test.block };

  const thirdParty = await tpr.thirdParties(test.params.tpId, options);
  console.log("thirdParty.isApproved", thirdParty.isApproved);
  console.log("thirdParty.root === test.params.root", thirdParty.root === ethers.utils.hexlify(test.params.root));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
