const SandipCoin = artifacts.require("./SandipCoin.sol");
const ShivaniCoin = artifacts.require("./ShivaniCoin.sol");
const RakeshCoin = artifacts.require("./RakeshCoin.sol");



module.exports = function(deployer) {
  deployer.deploy(SandipCoin);
  deployer.deploy(ShivaniCoin);
  deployer.deploy(RakeshCoin);
};
