import hre from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  if (hre.network.name !== "hardhat") {
    throw new Error("Only 'hardhat' network supported");
  }

  const artifactPath = path.resolve(__dirname, "..", "artifacts", "contracts", "Checker.sol", "Checker.json");
  const artifact = fs.readFileSync(artifactPath, { encoding: "utf-8" });
  const artifactJson = JSON.parse(artifact);

  const abiPath = path.resolve(__dirname, "abi.json");
  const abiContent = JSON.stringify(artifactJson.abi, null, 2);

  fs.writeFileSync(abiPath, abiContent, { encoding: "utf-8" });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
