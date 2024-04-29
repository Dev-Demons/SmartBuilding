// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface IThirdPartyRegistry {
    function thirdParties(
        string memory _tpID
    )
        external
        view
        returns (
            bool,
            bytes32,
            uint256,
            uint256,
            uint256,
            string memory,
            string memory
        );
}
