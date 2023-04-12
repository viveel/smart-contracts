# ViveelMaticTest Test Report Summary

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

### RBAC Test Cases Overview

**"Should prevent non-admins from granting the ADMIN_ROLE"**:

* This test case checks if the contract correctly prevents non-admin accounts from granting the ADMIN_ROLE to other accounts.
* The test calls the grantRole() function with a non-admin account and a new admin address, and expects the function call to be reverted with the expected error message.

**"Should correctly grant the ADMIN_ROLE"**:
    
* This test case checks if the contract correctly grants the ADMIN_ROLE to a new admin account.
* The test calls the grantRole() function with the owner account and a new admin address, and expects the function call to complete successfully.
    
**"Should prevent non-admins from revoking the ADMIN_ROLE"**:
    
* This test case checks if the contract correctly prevents non-admin accounts from revoking the ADMIN_ROLE from other accounts.
* The test calls the revokeRole() function with a non-admin account and the admin account, and expects the function call to be reverted with the expected error message.
    
**"Should correctly revoke the ADMIN_ROLE"**:
    
* This test case checks if the contract correctly revokes the ADMIN_ROLE from an existing admin account.
* The test calls the revokeRole() function with the owner account and the admin account, and expects the function call to complete successfully.
    
**"Should prevent revoking the ADMIN_ROLE from an account that doesn't have it"**:
    
* This test case checks if the contract correctly prevents the revocation of the ADMIN_ROLE from an account that doesn't have it.
* The test calls the revokeRole() function with the admin account and a non-admin account, and expects the function call to be reverted with the expected error message.
    
**"Should correctly grant a custom role"**:
    
* This test case checks if the contract correctly grants a custom role to an account.
* The test calls the grantRole() function with a non-admin account and a new role address, and expects the function call to complete successfully.
    
**"Should correctly revoke a custom role"**:
    
* This test case checks if the contract correctly revokes a custom role from an account.
* The test grants a custom role to a non-admin account and then calls the revokeRole() function with the owner account and the new role address, and expects the function call to complete successfully.
    
**"Should not allow non-admin accounts to grant or revoke roles"**:
    
* This test case checks if the contract correctly prevents non-admin accounts from granting or revoking roles.
* The test calls the grantRole() and revokeRole() functions with a non-admin account and expects the function calls to be reverted with the expected error message.

### PAUSABLE Test Cases Overview

**"Should initially be unpaused"**:

* This test case checks that the token contract is initially unpaused/returns false upon deploying the contract.

**"Should allow the owner to pause the contract"**:

* This test case checks if the pause function can be called successfully by the contract owner and if the paused function returns true after calling it.

**"Should not allow non-owner accounts to pause the contract"**:

* This test case checks if calling the pause function by a non-owner account is reverted with the expected error message and if the paused function still returns false.

**"Should allow the owner to unpause the contract"**:

* This test case checks if the unpause function can be called successfully by the contract owner after calling the pause function and if the paused function returns false after calling it.

**"Should not allow non-owner accounts to unpause the contract"**:

* This test case checks if calling the unpause function by a non-owner account is reverted with the expected error message and if the paused function still returns true.

**"Should not allow transfers when paused"**:

* This test case checks if transferring tokens when the contract is paused is reverted with the expected error message and if the token balances of the sender and receiver remain unchanged after the failed transfer.
