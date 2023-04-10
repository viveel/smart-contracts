const { expect } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const chai = require("chai");
chai.use(solidity);

describe("SHIBAINUExample Burnable Test", function () {
  let owner, recipient1, token;

  beforeEach(async function () {
    // Deploy the contract and get reference to the contract instance
    [owner, recipient1, recipient2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SHIBAINUExample");
    token = await Token.deploy();
    await token.deployed();
    await token.connect(owner).transfer(recipient1.address, 1000);
  });

  describe("Burnable Token Extension Functionality", function () {
    it("Should correctly burn tokens from the owner's account", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      const initialTotalSupply = await token.totalSupply();
      const amount = 500;
      await token.burn(amount);
      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance.sub(amount)
      );
      expect(await token.totalSupply()).to.equal(initialTotalSupply.sub(amount));
    });

    it("Should not allow burning more tokens than the sender has", async function () {
      const initialTotalSupply = await token.totalSupply();
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await expect(token.burn(initialOwnerBalance.add(1))).to.be.revertedWith(
        "ERC20: burn amount exceeds balance"
      );
      expect(await token.totalSupply()).to.equal(initialTotalSupply);
    });

    it("Should correctly burn tokens from the recipient's account after approval", async function () {
      const initialTotalSupply = await token.totalSupply();
      const initialRecipientBalance = await token.balanceOf(recipient1.address);
      const amount = 500;
      await token.connect(recipient1).approve(owner.address, amount);
      await token.connect(owner).burnFrom(recipient1.address, amount);
      expect(await token.balanceOf(recipient1.address)).to.equal(
        initialRecipientBalance.sub(amount)
      );
      expect(await token.totalSupply()).to.equal(initialTotalSupply.sub(amount));
    });

    it("Should not allow burning more tokens than are approved by the account", async function () {
      const initialTotalSupply = await token.totalSupply();
      const initialRecipientBalance = await token.balanceOf(recipient1.address);
      await token
        .connect(recipient1)
        .approve(owner.address, initialRecipientBalance.add(1));
      await expect(
        token
          .connect(owner)
          .burnFrom(recipient1.address, initialRecipientBalance.add(1))
      ).to.be.revertedWith("ERC20: burn amount exceeds balance");
      expect(await token.balanceOf(recipient1.address)).to.equal(
        initialRecipientBalance
      );
      expect(await token.totalSupply()).to.equal(initialTotalSupply);
    });

    it("Should correctly decrease the allowance after burning tokens from the recipient's account", async function () {
      const initialTotalSupply = await token.totalSupply();
      const initialRecipientBalance = await token.balanceOf(recipient1.address);
      const amount = 500;
      await token.connect(recipient1).approve(owner.address, amount);
      await token.connect(owner).burnFrom(recipient1.address, amount);
      expect(await token.balanceOf(recipient1.address)).to.equal(
        initialRecipientBalance.sub(amount)
      );
      expect(await token.allowance(recipient1.address, owner.address)).to.equal(
        0
      );
      expect(await token.totalSupply()).to.equal(initialTotalSupply.sub(amount));
    });
  });
});