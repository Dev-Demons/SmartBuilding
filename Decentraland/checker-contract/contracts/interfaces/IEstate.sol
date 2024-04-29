// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface IEstate {
    function getLandEstateId(uint256 nft) external view returns (uint256);

    function ownerOf(uint256 _nft) external view returns (address);

    function getApproved(uint256 _nft) external view returns (address);

    function isApprovedForAll(
        address _user,
        address _operator
    ) external view returns (bool);

    function updateOperator(uint256 _nft) external view returns (address);

    function updateManager(
        address _user,
        address _operator
    ) external view returns (bool);
}
