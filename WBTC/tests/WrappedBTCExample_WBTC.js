const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WrappedBTCExample Mintable Test", function () {
  let owner, recipient1, recipient2, newMinter, nonMinter, token, totalSupply;

  beforeEach(async function () {
    // Deploy the contract and get reference to the contract instance
    [owner, recipient1, recipient2, newMinter, nonMinter] =
      await ethers.getSigners();
    const Token = await ethers.getContractFactory("WrappedBTCExample");
    token = await Token.connect(owner).deploy();
    await token.deployed();
    await token.connect(owner).mint(owner.address, 10000);
    await token.connect(owner).transfer(recipient1.address, 1000);
    await token.connect(owner).transfer(recipient2.address, 1000);
    totalSupply = await token.totalSupply();
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
      ).to.be.revertedWith("Ownable: caller is not the owner");
      expect(await token.totalSupply()).to.equal(totalSupply);
    });

    it("Should not allow non-owner accounts to mint tokens to another account's balance", async function () {
      await expect(
        token.connect(recipient1).mint(recipient2.address, 500)
      ).to.be.revertedWith("Ownable: caller is not the owner");
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

describe("WrappedBTCExample Burnable Test", function () {
    let owner, recipient1, token;
  
    beforeEach(async function () {
      // Deploy the contract and get reference to the contract instance
      [owner, recipient1, recipient2] = await ethers.getSigners();
      const Token = await ethers.getContractFactory("WrappedBTCExample");
      token = await Token.deploy();
      await token.deployed();
      await token.connect(owner).mint(owner.address, 10000);
      await token.connect(owner).transfer(recipient1.address, 1000)
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
    });
  });

describe("WrappedBTCExample Pausable Test", function () {
    let owner, recipient, token;
  
    beforeEach(async function () {
      // Deploy the contract and get reference to the contract instance
      [owner, recipient] = await ethers.getSigners();
      const Token = await ethers.getContractFactory("WrappedBTCExample");
      token = await Token.connect(owner).deploy();
      await token.deployed();
      await token.connect(owner).mint(owner.address, 10000);
      await token.connect(owner).transfer(recipient.address, 1000);
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
        await expect(token.connect(recipient).pause()).to.be.revertedWith("Ownable: caller is not the owner");
        expect(await token.paused()).to.be.false;
      });
  
      it("Should allow the owner to unpause the contract", async function () {
        await token.connect(owner).pause();
        await token.connect(owner).unpause();
        expect(await token.paused()).to.be.false;
      });
  
      it("Should not allow non-owner accounts to unpause the contract", async function () {
        await token.connect(owner).pause();
        await expect(token.connect(recipient).unpause()).to.be.revertedWith("Ownable: caller is not the owner");
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
  