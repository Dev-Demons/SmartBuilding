// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

interface ICommittee {
    function members(address _user) external view returns (bool);
}
