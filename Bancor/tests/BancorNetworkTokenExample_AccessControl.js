const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BancorNetworkTokenExample AccessControl Test", function () {
  let owner, admin, newAdmin, newRole, nonAdmin, token;

  beforeEach(async function () {
    // Deploy the contract and get reference to the contract instance
    [owner, admin, newAdmin, newRole, nonAdmin] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("BancorNetworkTokenExample");
    token = await Token.connect(owner).deploy();
    await token.deployed();
    await token.grantRole(
      await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE")),
      admin.address
    );
  });

  describe("AccessControl Granting/Revoking Functionality", function () {
    it("Should prevent non-admins from granting the ADMIN_ROLE", async function () {
      await expect(
        token
          .connect(nonAdmin)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("ADMIN_ROLE")
            ),
            newAdmin.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });

    it("Should correctly grant the ADMIN_ROLE", async function () {
      await token.grantRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE")),
        newAdmin.address
      );
    });

    it("Should prevent non-admins from revoking the ADMIN_ROLE", async function () {
      await expect(
        token
          .connect(nonAdmin)
          .revokeRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("ADMIN_ROLE")
            ),
            admin.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });

    it("Should correctly revoke the ADMIN_ROLE", async function () {
      await token.revokeRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ADMIN_ROLE")),
        admin.address
      );
    });

    it("Should prevent revoking the ADMIN_ROLE from an account that doesn't have it", async function () {
      await expect(
        token
          .connect(admin)
          .revokeRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("ADMIN_ROLE")
            ),
            nonAdmin.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${admin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });
  });

  describe("AccessControl grant custom roles", async function () {
    // Test case for granting a custom role to an account
    it("Should correctly grant a custom role", async function () {
      await expect(
        token
          .connect(nonAdmin)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("GRANT_ROLE")
            ),
            newRole.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
      await token.grantRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("GRANT_ROLE")),
        newRole.address
      );
      await expect(
        token
          .connect(admin)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("GRANT_ROLE")
            ),
            newRole.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${admin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });

    // Test case for revoking a custom role from an account
    it("Should correctly revoke a custom role", async function () {
      await expect(
        token
          .connect(nonAdmin)
          .revokeRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("GRANT_ROLE")
            ),
            admin.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
      await token.grantRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("GRANT_ROLE")),
        newRole.address
      );
      await token.revokeRole(
        await ethers.utils.keccak256(ethers.utils.toUtf8Bytes("GRANT_ROLE")),
        newRole.address
      );
      await expect(
        token
          .connect(admin)
          .revokeRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("GRANT_ROLE")
            ),
            nonAdmin.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${admin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });
  });

  describe("AccessControl: Access Denied tests", async function () {
    it("Should not allow non-admin accounts to grant or revoke roles", async function () {
      await expect(
        token
          .connect(nonAdmin)
          .grantRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("GRANT_ROLE")
            ),
            newRole.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
      await expect(
        token
          .connect(nonAdmin)
          .revokeRole(
            await ethers.utils.keccak256(
              ethers.utils.toUtf8Bytes("GRANT_ROLE")
            ),
            newRole.address
          )
      ).to.be.revertedWith(
        `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
      );
    });
  });
});
