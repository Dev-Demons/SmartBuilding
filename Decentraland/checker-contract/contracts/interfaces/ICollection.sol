// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface ICollection {
    function items(
        uint256 _itemId
    )
        external
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256,
            address,
            string memory,
            string memory
        );

    function creator() external view returns (address);

    function globalManagers(address _user) external view returns (bool);

    function itemManagers(
        uint256 _itemId,
        address _user
    ) external view returns (bool);

    function isApproved() external view returns (bool);

    function isCompleted() external view returns (bool);
}
