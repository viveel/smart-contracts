# SHIBAINUExample Test Report Summary

*Note: This is an auto-generated report based on the contract intermediary representation.

## Contract Specs

License: **_// SPDX-License-Identifier: UNLICENSED_**
Type: **_ERC20_**
Pragma Version: **_^0.8.9_**

### Function Tests


    
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

    
### BURNABLE Test Cases Overview
    

**"Should correctly burn tokens from the owner's account"**:

* This test checks if the contract can correctly burn tokens from the owner's account. 
* It verifies that the owner's balance decreases by the correct amount, and that the total supply decreases by the same amount.

**"Should not allow burning more tokens than the sender has"**:

* This test checks if the contract prevents burning more tokens than the sender has. 
* It verifies that an error is thrown when the owner tries to burn more tokens than they have, and that the total supply remains unchanged.

**"Should correctly burn tokens from the recipient's account after approval"**:

* This test checks if the contract correctly burns tokens from a recipient's account after approval. 
* It first approves the owner to spend a certain amount of tokens from the recipient's account, then burns the approved amount. 
* It verifies that the recipient's balance decreases by the correct amount, and that the total supply decreases by the same amount.

**"Should not allow burning more tokens than are approved by the account"**:

* This test checks if the contract prevents burning more tokens than are approved by the account. 
* It first approves the owner to spend a certain amount of tokens from a recipient's account, then tries to burn more tokens than were approved. 
* It verifies that an error is thrown, and that the recipient's balance and the total supply remain unchanged.

**"Should correctly decrease the allowance after burning tokens from the recipient's account"**:

* This test checks if the contract correctly decreases the allowance after burning tokens from a recipient's account. 
* It first approves the owner to spend a certain amount of tokens from the recipient's account, then burns the approved amount. 
* It verifies that the recipient's balance decreases by the correct amount, and that the allowance is reduced to zero. 
* Finally, it verifies that the total supply decreases by the same amount.

    


