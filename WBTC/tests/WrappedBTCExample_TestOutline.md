# WrappedBTCExample Test Report Summary

*Note: This is an auto-generated report based on the contract intermediary representation.

## Contract Specs

License: **_// SPDX-License-Identifier: UNLICENSED_**
Type: **_WBTC_**
Pragma Version: **_^0.8.0_**

## Functional Tests

### STANDARD Test Cases Overview

**"Should correctly deploy the contract"**:

* This test case checks if the contract is deployed and if its address is a proper address.

**"Should correctly set the initial token supply"**:

* This test case ensures that the initial token supply is set correctly.

**"Should correctly allocate the initial token supply to the contract owner"**:

* This test case ensures that the initial token supply is correctly allocated to the contract owner's address.

**"Should correctly report the total token supply"**:

* This test case ensures that the total token supply is correctly reported.

**"Should correctly report the token balance of the contract owner"**:

* This test case ensures that the token balance of the contract owner is correctly reported.

**"Should correctly report the token balance of any other address"**:

* This test case ensures that the token balance of any other address is correctly reported.

**"Should correctly report the token name"**:

* This test case ensures that the token name is correctly reported.

**"Should correctly report the token symbol"**:

* This test case ensures that the token symbol is correctly reported.

**"Should correctly report the token decimals"**:

*This test case ensures that the token decimals value is correctly reported.

**"Should correctly transfer tokens from the sender to the recipient"**:

* This test case ensures that tokens are correctly transferred from the sender's address to the recipient's address.

**"Should correctly emit a Transfer event on token transfer"**:

* This test case ensures that a Transfer event is correctly emitted when tokens are transferred.

**"Should revert when sender does not have sufficient balance for transfer"**:

* This test case ensures that the transfer function reverts when the sender does not have a sufficient balance to complete the transfer.

**"Should correctly transfer tokens from the sender to the recipient using transferFrom function"**:

* This test case ensures that tokens are correctly transferred from the sender's address to the recipient's address using the transferFrom function.

**"Should correctly update the balances of the sender, recipient, and spender on transferFrom function"**:

* This test case ensures that the balances of the sender, recipient, and spender are correctly updated after tokens are transferred using the transferFrom function.

**"Should correctly emit a Transfer event on transferFrom function"**:

* This test case ensures that a Transfer event is correctly emitted when tokens are transferred using the transferFrom function.

**"Should revert when spender does not have a sufficient allowance on transferFrom function"**:

* This test case ensures that the transferFrom function reverts when the spender does not have a sufficient allowance to complete the transfer.

**"Should revert when sender does not have a sufficient balance on transferFrom function"**:

* This test case ensures that the transferFrom function reverts when the sender does not have a sufficient balance to complete the transfer.

**"Should correctly set allowance for spender using approve function"**:

* This test case ensures that the allowance for a spender is correctly set using the approve function.

**"Should correctly emit an Approval event on allowance setting using approve function"**:

* This test case ensures that an Approval event is correctly emitted when the allowance is set using the approve function.

**"Should correctly report allowance for spender using allowance function"**:

* This test case ensures that the allowance for a spender is correctly reported using the allowance function.

**"Should correctly increase allowance for spender using increaseAllowance function"**:

* This test case ensures that the allowance for a spender is correctly increased using the increaseAllowance function.

**"Should correctly emit an Approval event on allowance increase using increaseAllowance function"**:

* This test case ensures that an Approval event is correctly emitted when the increaseAllowance function is called.

**"Should correctly decrease allowance for spender using decreaseAllowance function"**:

* This test case ensures that the allowance for a spender is correctly decreased using the decreaseAllowance function.

**"Should correctly emit an Approval event of allowance decrease using decreaseAllowance function**:

* This test case ensures that an Approval event is correctly emitted when the allowance is set using the decreaseAllowance

### MINTABLE Test Cases Overview
  
**"Should correctly mint tokens to the owner's account"**:

* This test case checks if the mint function correctly mints tokens to the owner's account.
* It mints an amount of tokens to the owner and checks if the owner's balance and the total supply are updated correctly.

**"Should not allow non-owner accounts to mint tokens"**:

* This test case checks if non-owner accounts are not allowed to mint tokens.
* It attempts to mint tokens with a non-owner account and checks if the expected error message is thrown.

**"Should not allow non-owner accounts to mint tokens to another account's balance"**:

* This test case checks if non-owner accounts are not allowed to mint tokens to another account's balance.
* It attempts to mint tokens to a recipient's address with a non-owner account and checks if the expected error message is thrown.

**"Should correctly increase the balance of recipient1 after minting tokens to the recipient's account"**:

* This test case checks if the mint function correctly increases the balance of a recipient after minting tokens to the recipient's address.
* It mints an amount of tokens to the recipient and checks if the recipient's balance and the total supply are updated correctly.

**"Should correctly mint the maximum number of tokens"**:

* This test case checks if the mint function correctly mints the maximum number of tokens.
* It calculates the maximum supply of tokens and mints that amount of tokens to the owner.
* It checks if the total supply is updated correctly.

**"Should correctly mint multiple batches of tokens"**:

* This test case checks if the mint function correctly mints multiple batches of tokens.
* It mints two amounts of tokens to the owner and checks if the total supply is updated correctly.

### BURNABLE Test Cases Overview

**"Should correctly burn tokens from the owner's account"**:

* This test case checks if the burn function correctly burns tokens from the owner's account.
* It burns an amount of tokens from the owner and checks if the owner's balance and the total supply are updated correctly.

**"Should not allow burning more tokens than the sender has"**:

* This test case checks if the burn function does not allow burning more tokens than the sender has.
* It attempts to burn an amount of tokens that is greater than the owner's balance and checks if the expected error message is thrown.

### PAUSABLE Test Cases Overview

**"Should initially be unpaused"**:

* This test case checks if the contract is initially unpaused.
* It checks if the paused variable is false.

"Should allow the owner to pause the contract":

* This test case checks if the owner is allowed to pause the contract.
* It pauses the contract with the owner account and checks if the paused variable is true.

**"Should not allow non-owner accounts to pause the contract"**:

* This test case checks if non-owner accounts are not allowed to pause the contract.
* It attempts to pause the contract with a non-owner account and checks if the expected error message is thrown.

**"Should allow the owner to unpause the contract"**:

* This test case checks if the owner is allowed to unpause the contract.
* It pauses and then unpauses the contract with the owner account and checks if the paused variable is false.

**"Should not allow non-owner accounts to unpause the contract"**:

* This test case checks if non-owner accounts are not allowed to unpause the contract.
* It pauses the contract with the owner account and attempts to unpause the contract with a non-owner account.
* It checks if the expected error message is thrown.

**"Should not allow transfers when paused"**:

* This test case checks if transfers are not allowed when the contract is paused.
* It attempts to transfer tokens when the contract is paused and checks if the expected error message is thrown.
* It also checks if the balances of the sender and recipient are not updated.
