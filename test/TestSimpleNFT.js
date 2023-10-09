const SimpleNFT = artifacts.require("SimpleNFT");

contract('SimpleNFT', (accounts) => {
  let simpleNFTInstance;

  beforeEach(async () => {
    simpleNFTInstance = await SimpleNFT.new("YourNFTName", "NFT");
  });

  it('should mint an NFT with a specific tokenId', async () => {
    const tokenId = 1; // Specify the tokenId you want to mint
    const owner = accounts[0];

    await simpleNFTInstance.mint(owner, tokenId, { from: owner });

    const ownerOfToken = await simpleNFTInstance.ownerOf(tokenId);
    assert.equal(ownerOfToken, owner, "Token owner is not as expected");
  });

  it('should mint multiple NFTs with specific tokenIds', async () => {
    const tokenIds = [1, 2, 3]; // Specify the tokenIds you want to mint
    const owner = accounts[0];

    await simpleNFTInstance.mintBatch(owner, tokenIds, { from: owner });

    for (const tokenId of tokenIds) {
      const ownerOfToken = await simpleNFTInstance.ownerOf(tokenId);
      assert.equal(ownerOfToken, owner, "Token owner is not as expected");
    }
  });

  it('should not allow minting by non-owner', async () => {
    const tokenId = 1;
    const nonOwner = accounts[1];

    try {
      await simpleNFTInstance.mint(nonOwner, tokenId, { from: nonOwner });
      assert.fail("Minting should fail for non-owner");
    } catch (error) {
      assert.include(error.message, "revert", "Minting should revert for non-owner");
    }
  });
});
