import hre, { ethers } from "hardhat";
import LANDAbi from "../../abis/LAND.json";
import EstateAbi from "../../abis/Estate.json";
import { getContractsForNetwork } from "../utils";
import { getTestsForNetwork } from "./checkLAND.tests";

async function main() {
  const { LAND, ESTATE } = getContractsForNetwork(hre.network.name);
  const test = getTestsForNetwork(hre.network.name)[0];

  const land = new ethers.Contract(LAND!, LANDAbi, ethers.provider);
  const estate = new ethers.Contract(ESTATE!, EstateAbi, ethers.provider);

  const options = { blockTag: test.block };

  const { sender, x, y } = test.params;

  const landId = await land.encodeTokenId(x, y, options);
  console.log("landId", landId.toString());

  const landOwner = await land.ownerOf(landId, options);
  console.log("landOwner", landOwner);
  console.log("sender == landOwner", sender == landOwner);

  const landApproved = await land.getApproved(landId, options);
  console.log("landApproved", landApproved);
  console.log("landApproved == sender", landApproved == sender);

  const landUpdateOperator = await land.updateOperator(landId, options);
  console.log("landUpdateOperator", landUpdateOperator);
  console.log("landUpdateOperator == sender", landUpdateOperator == sender);

  const landIsApprovedForAll = await land.isApprovedForAll(landOwner, sender, options);
  console.log("landIsApprovedForAll", landIsApprovedForAll);

  const landUpdateManager = await land.updateManager(landOwner, sender, options);
  console.log("landUpdateManager", landUpdateManager);

  const estateIsOwner = landOwner.toLowerCase() === estate.address;
  console.log("estateIsOwner", estateIsOwner);

  if (estateIsOwner) {
    const estateId = await estate.getLandEstateId(landId, options);
    console.log("estateId", estateId.toString());

    const estateOwner = await estate.ownerOf(estateId, options);
    console.log("estateOwner", estateOwner);
    console.log("estateOwner === sender", estateOwner === sender);

    const estateApproved = await estate.getApproved(estateId, options);
    console.log("estateApproved", estateApproved);
    console.log("estateApproved === sender", estateApproved === sender);

    const estateUpdateOperator = await estate.updateOperator(estateId, options);
    console.log("estateUpdateOperator", estateUpdateOperator);
    console.log("estateUpdateOperator === sender", estateUpdateOperator === sender);

    const estateIsApprovedForAll = await estate.isApprovedForAll(estateOwner, sender, options);
    console.log("estateIsApprovedForAll", estateIsApprovedForAll);

    const estateUpdateManager = await estate.updateManager(estateOwner, sender, options);
    console.log("estateUpdateManager", estateUpdateManager);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
