import hre, { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  if (hre.network.name !== "hardhat") {
    throw new Error("Only 'hardhat' network supported");
  }

  const checkerFactory = await ethers.getContractFactory("Checker");
  const checker = await checkerFactory.deploy();
  await checker.deployed();

  const bytecodePath = path.resolve(__dirname, "bytecode.json");
  const bytecodeContent = JSON.stringify(
    {
      bytecode: await hre.network.provider.send("eth_getCode", [checker.address]),
    },
    null,
    2
  );

  fs.writeFileSync(bytecodePath, bytecodeContent, { encoding: "utf-8" });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
