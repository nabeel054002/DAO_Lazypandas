const { ethers } = require("hardhat");
const { LAZYPANDAS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the CryptoDevsDAO contract
  const LazyPandasDAO = await ethers.getContractFactory("LazyPandasDAO");
  const deployedLazyPandasDAO = await LazyPandasDAO.deploy(
    fakeNftMarketplace.address,
    LAZYPANDAS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("1"),
    }
  );
  await deployedLazyPandasDAO.deployed();

  console.log("LazyPandasDAO deployed to: ", deployedLazyPandasDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });