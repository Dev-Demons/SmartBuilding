import hre, { ethers } from "hardhat";
import CollectionFactoryAbi from "../../abis/CollectionFactory.json";
import CommitteeAbi from "../../abis/Committee.json";
import CollectionAbi from "../../abis/Collection.json";
import { getTestsForNetwork } from "./validateWearables.tests";
import { getContractsForNetwork } from "../utils";

async function main() {
  const { FACTORY_1, FACTORY_2, COMMITTEE_1, COMMITTEE_2 } = getContractsForNetwork(hre.network.name);
  const test = getTestsForNetwork(hre.network.name)[0];

  const factoryV2 = new ethers.Contract(FACTORY_1!.address, CollectionFactoryAbi, ethers.provider);
  const factoryV3 = new ethers.Contract(FACTORY_2!.address, CollectionFactoryAbi, ethers.provider);
  const oldCommittee = new ethers.Contract(COMMITTEE_1!.address, CommitteeAbi, ethers.provider);
  const committee = new ethers.Contract(COMMITTEE_2!.address, CommitteeAbi, ethers.provider);
  const collection = new ethers.Contract(test.params.collection, CollectionAbi, ethers.provider);

  const options = { blockTag: test.block };

  const { sender, itemId, contentHash } = test.params;

  if (test.block >= FACTORY_1!.sinceBlock) {
    const isCollectionFromFactoryV2 = await factoryV2.isCollectionFromFactory(collection.address, options);
    console.log("isCollectionFromFactoryV2", isCollectionFromFactoryV2);
  }

  if (test.block >= FACTORY_2!.sinceBlock) {
    const isCollectionFromFactoryV3 = await factoryV3.isCollectionFromFactory(collection.address, options);
    console.log("isCollectionFromFactoryV3", isCollectionFromFactoryV3);
  }

  const item = await collection.items(itemId, options);
  console.log("item.contentHash", item.contentHash);

  if (test.block >= COMMITTEE_1!.sinceBlock) {
    const isOldCommitteeMember = await oldCommittee.members(sender, options);
    console.log("isOldCommitteeMember", isOldCommitteeMember);
  }

  if (test.block >= COMMITTEE_2!.sinceBlock) {
    const isCommitteeMember = await committee.members(sender, options);
    console.log("isCommitteeMember", isCommitteeMember);
  }

  console.log("item.contentHash === contentHash", item.contentHash === contentHash);

  const creator = await collection.creator(options);
  console.log("creator", creator);
  console.log("creator === sender", creator.toLowerCase() === sender);

  const globalManager = await collection.globalManagers(sender, options);
  console.log("globalManager", globalManager);

  const itemManager = await collection.itemManagers(itemId, sender, options);
  console.log("itemManager", itemManager);

  const isApproved = await collection.isApproved(options);
  console.log("isApproved", isApproved);

  const isCompleted = await collection.isCompleted(options);
  console.log("isCompleted", isCompleted);

  const isCollectionValid = !isApproved && isCompleted;
  console.log("isCollectionValid", isCollectionValid);

  const addressHasAccess = creator === sender || globalManager || itemManager;
  console.log("addressHasAccess", addressHasAccess);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
