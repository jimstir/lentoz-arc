---
title: Financing
description: A flash loan implementation for tokenized reserves
author: Jimmy Debe (@jimstir)
status: raw
created: 2024-2-26
requires: 20, 4626
---

## Abstract

This specification will define a flash loan implementation for a tokenized reserve. 
This replecates a fiancing model for use of token holders.

## Specification

The finance policy consists of two contracts, 
as described in [ERC-3156](https://eips.ethereum.org/EIPS/eip-3156).

### Reserve(Lender) contract

```solidity

interface IFinanceLender {

//The amount of asset avaliable to be lended to a borrower
function maxFlashLoan(address token) external virtual returns(uint256);

//The fee to be charged to the borrower for a loan
function flashfee(address token, uint256) external virtual returns(uint256);

//Initiate a flash loan
function flashLoan(address token, uint256 amount) external virtual returns(uint256);

// Function to add withdrawal funds to borrow. Should be used by lender(reserve)
function fundPolicy(address token, uint256 amount) external virtual returns(uint256);

// Function withdraw all funds to the reserve only
function withdrawPolicy(address token, uint256 policy, uint256 amount) external virtual returns(uint256);

)
//

```

### Borrower contract
A receiver of financing MUST implement a `IERC3156FlashBorrower`.

```solidity

interface IFinanceBorrower {

    /**
     * @dev Receive a flash loan.
     * @param initiator The initiator of the loan.
     * @param token The loan currency.
     * @param amount The amount of tokens lent.
     * @param fee The additional amount of tokens to repay.
     * @param data Arbitrary data structure, intended to contain user-defined parameters.
     * @return The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan"
     */
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32);

  // Borrower make a payment
  function usersBill(uint256 billNum) external virtual returns(uint256);

}

```

