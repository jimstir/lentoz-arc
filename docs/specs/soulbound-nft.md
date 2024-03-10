---
title: Soulbound NFT for Reserves
description: A soulbound NFT implementation for tokenized reserves
author: Jimmy Debe (@jimstir)
status: raw specification
created: 03-09-2024
requires: ERC721, ERC5192
---

## Abstract

The specification describes a soulbound non-fungible token (NFT) for tokenized reserves. 
The account in control of the token will be the reserves but assinged to other users.

## Movtivation / Background

A soulbound NFT allows an address to mint tokens that does not have the ability to be transfered.
As desribed in [ERC5192](), tokens become soulbound to a single address.

This specification will follow the ERC5192 standard track tokens.
Some reserves may desire to have on chain reference for NFT that use a tokenURI to reference a real world activity.
The reserve will initate the minting, assign a tokenURI, and 
assign the account owner address.

## Specification
