// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface IDCLRegistrar {
    function getOwnerOf(
        string memory _subdomain
    ) external view returns (address);
}
