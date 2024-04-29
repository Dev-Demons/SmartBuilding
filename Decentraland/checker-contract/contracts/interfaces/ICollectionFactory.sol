// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface ICollectionFactory {
    function isCollectionFromFactory(
        address _collection
    ) external view returns (bool);
}
