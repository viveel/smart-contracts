const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BancorNetworkTokenExample Mintable Test", function () {
  let owner, recipient1, recipient2, newMinter, nonMinter, token, totalSupply;

  beforeEach(async function () {
    // Deploy the contract and get reference to the contract instance
    [owner, recipient1, recipient2, newMinter, nonMinter] =
      await ethers.getSigners();
    const Token = await ethers.getContractFactory("BancorNetworkTokenExample");
    token = await Token.connect(owner).deploy();
    await token.deployed();
    await token.connect(owner).mint(owner.address, 10000);
    await token.connect(owner).transfer(recipient1.address, 1000);
    await token.connect(owner).transfer(recipient2.address, 1000);
    totalSupply = await token.totalSupply();
  });

  describe("MINTER_ROLE Functionality", function () {

    it("Should correctly report the MINTER_ROLE as the address who deployed the contract", async function () {
      const minter = await token.MINTER_ROLE();
      expect(minter).to.equal(await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")).toString());
      expect(await token.hasRole(await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")).toString(), owner.address)).to.equal(true);
    });

    it("Should prevent non-admins from granting the MINTER_ROLE", async function () {
      await expect(
        token
          .connect(nonMinter)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("MINTER_ROLE")
            ),
            nonMinter.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonMinter.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });

    it("Should correctly grant and revoke the MINTER_ROLE", async function () {
      await expect(
        token
          .connect(recipient1)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("MINTER_ROLE")
            ),
            newMinter.address
          )
      ).to.be.revertedWith(
        `AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
      await token.grantRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
        newMinter.address
      );
      const initialSupply = await token.totalSupply();
      const amount = 1000;
      await token.connect(newMinter).mint(newMinter.address, amount);
      expect(await token.balanceOf(newMinter.address)).to.equal(amount);
      expect(await token.totalSupply()).to.equal(initialSupply.add(amount));

      await token.revokeRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE")),
        newMinter.address
      );
      await expect(
        token.connect(newMinter).mint(newMinter.address, 100)
      ).to.be.revertedWith(
        `AccessControl: account ${newMinter.address.toLowerCase()} is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("MINTER_ROLE")
        )}`
      );
      expect(await token.totalSupply()).to.equal(initialSupply.add(amount));
    });

    it("Should prevent non-admins from revoking the MINTER_ROLE", async function () {
      await expect(
        token
          .connect(nonMinter)
          .revokeRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("MINTER_ROLE")
            ),
            owner.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonMinter.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });
  });

  describe("Mintable Token Extension Functionality", function () {
    it("Should correctly mint tokens to the owner's account", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const amount = 500;
      await token.connect(owner).mint(owner.address, amount);
      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance.add(amount)
      );
      const totalSupplyAfter = await token.totalSupply();
      expect(totalSupplyAfter).to.equal(totalSupply.add(500));
    });

    it("Should not allow non-owner accounts to mint tokens", async function () {
      await expect(
        token.connect(recipient1).mint(owner.address, 500)
      ).to.be.revertedWith(
        `AccessControl: account ${recipient1.address.toLowerCase()} is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("MINTER_ROLE")
        )}`
      );
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("Should not allow non-owner accounts to mint tokens to another account's balance", async function () {
      await expect(
        token.connect(recipient1).mint(recipient2.address, 500)
      ).to.be.revertedWith(
        `AccessControl: account ${recipient1.address.toLowerCase()} is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("MINTER_ROLE")
        )}`
      );
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("Should correctly increase the balance of recipient1 after minting tokens to the recipient's account", async function () {
      const initialRecipientBalance = await token.balanceOf(recipient1.address);
      const amount = 500;
      await token.connect(owner).mint(recipient1.address, amount);
      expect(await token.balanceOf(recipient1.address)).to.equal(
        initialRecipientBalance.add(amount)
      );
      expect(await token.totalSupply()).to.equal(totalSupply.add(500));
    });

    it("Should not allow non-minter accounts to mint tokens", async function () {
      await expect(
        token.connect(nonMinter).mint(nonMinter.address, 500)
      ).to.be.revertedWith(
        `AccessControl: account ${nonMinter.address.toLowerCase()} is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("MINTER_ROLE")
        )}`
      );
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("Should correctly mint the maximum number of tokens", async function () {
      
        
        const initialSupply = await token.totalSupply();
        const maxSupply = ethers.BigNumber.from("2").pow("256").sub("1");
        await token.mint(owner.address, maxSupply.sub(initialSupply));
        
        expect(await token.totalSupply()).to.equal(maxSupply);
    });

    it("Should correctly mint multiple batches of tokens", async function () {
      const initialSupply = await token.totalSupply();
      const amount1 = 500;
      const amount2 = 1000;
      await token.mint(owner.address, amount1);
      await token.mint(owner.address, amount2);
      expect(await token.totalSupply()).to.equal(
        initialSupply.add(amount1).add(amount2)
      );
    });   
  });
});
