const { expect } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");
const chai = require("chai");
chai.use(solidity);

describe("ViveelMaticTest Pausable Test", function () {
  let owner, recipient, token;

  beforeEach(async function () {
    // Deploy the contract and get reference to the contract instance
    [owner, recipient] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("ViveelMaticTest");
    token = await Token.connect(owner).deploy();
    await token.deployed();
    await token.connect(owner).transfer(recipient.address, 1000);
  });

  describe("PAUSER_ROLE Functionality", function () {
    it("Should correctly report the PAUSER_ROLE as the address who deployed the contract", async function () {
      const pauser = await token.PAUSER_ROLE();
      expect(pauser).to.equal(await ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes("PAUSER_ROLE")
      ));
      expect(await token.hasRole(await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE")), owner.address)).to.equal(true);
    });

    it("Should prevent non-admins from granting the PAUSER_ROLE", async function () {
      await expect(
        token
          .connect(recipient)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("PAUSER_ROLE")
            ),
            recipient.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${recipient.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });

    it("Should correctly grant and revoke the PAUSER_ROLE", async function () {
      await expect(
        token
          .connect(recipient)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("PAUSER_ROLE")
            ),
            recipient.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${recipient.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
      await token.grantRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE")),
        recipient.address
      );
      await token.revokeRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE")),
        recipient.address
      );
      await expect(
        token.connect(recipient).pause()
      ).to.be.revertedWith(
        `AccessControl: account ${recipient.address.toLowerCase()} is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("PAUSER_ROLE")
        )}`
      );
    });

    it("Should prevent non-admins from revoking the PAUSER_ROLE", async function () {
      await expect(token.connect(recipient).revokeRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("PAUSER_ROLE")),
        owner.address
      )).to.be.revertedWith(
        `AccessControl: account ${recipient.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      )
    });
  });

  describe("Pausable Token Extension Functionality", function () {
    it("Should initially be unpaused", async function () {
      expect(await token.paused()).to.be.false;
    });

    it("Should allow the owner to pause the contract", async function () {
      await token.pause();
      expect(await token.paused()).to.be.true;
    });

    it("Should not allow non-owner accounts to pause the contract", async function () {
      await expect(token.connect(recipient).pause()).to.be.revertedWith(
        `AccessControl: account ${ recipient.address.toLowerCase() } is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("PAUSER_ROLE")
        )}`
      );
      expect(await token.paused()).to.be.false;
    });

    it("Should allow the owner to unpause the contract", async function () {
      await token.connect(owner).pause();
      await token.connect(owner).unpause();
      expect(await token.paused()).to.be.false;
    });

    it("Should not allow non-owner accounts to unpause the contract", async function () {
      await token.connect(owner).pause();
      await expect(token.connect(recipient).unpause()).to.be.revertedWith(
        `AccessControl: account ${ recipient.address.toLowerCase() } is missing role ${await ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes("PAUSER_ROLE")
        )}`
      );
      expect(await token.paused()).to.be.true;
    });

    it("Should not allow transfers when paused", async function () {
      let previousRecipientBalance = await token.balanceOf(recipient.address);
      let previousOwnerBalance = await token.balanceOf(owner.address);
      await token.connect(owner).pause();
      await ethers.provider.send("evm_increaseTime", [86400]);
      await ethers.provider.send("evm_mine", []);
      await expect(
        token.connect(recipient).transfer(owner.address, 100)
      ).to.be.revertedWith("Pausable: paused");
      expect(await token.balanceOf(recipient.address)).to.equal(previousRecipientBalance);
      expect(await token.balanceOf(owner.address)).to.equal(previousOwnerBalance);
    });
  });
});
