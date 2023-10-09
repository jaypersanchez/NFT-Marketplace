const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const SimpleNFT = artifacts.require("SimpleNFT"); // Import the SimpleNFT contract

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  // Deploy the SimpleNFT contract
  deployer.deploy(SimpleNFT, "KnowledgeHut", "NHNFT"); // Replace with your desired name and symbol
};
