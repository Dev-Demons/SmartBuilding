// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "./interfaces/ICollection.sol";
import "./interfaces/ICollectionFactory.sol";
import "./interfaces/IThirdPartyRegistry.sol";
import "./interfaces/ILAND.sol";
import "./interfaces/IEstate.sol";
import "./interfaces/ICommittee.sol";
import "./interfaces/IDCLRegistrar.sol";

import "./utils/Multicall.sol";

contract Checker is Multicall {
    /// @notice Check that an address has access to a certain wearable or emote.
    /// @param _sender The address for which access will be checked.
    /// @param _factories An array of collection factories used to validate that _collection was created by one of them.
    /// @param _collection The address of the collection containing the item.
    /// @param _itemId The id if the item.
    /// @param _contentHash The content hash of the item.
    /// @param _committees Array of committee contracts.
    function validateWearables(
        address _sender,
        ICollectionFactory[] calldata _factories,
        ICollection _collection,
        uint256 _itemId,
        string memory _contentHash,
        ICommittee[] calldata _committees
    ) external view returns (bool) {
        // Check that the collection was created by one of the provided factories.
        // Skip this check if no factories are provided. Skipping is required for L1 collections as they were not created with a factory.
        if (_factories.length > 0) {
            bool isCollectionFromFactory;

            for (uint256 i; i < _factories.length; i++) {
                ICollectionFactory factory = _factories[i];

                isCollectionFromFactory = factory.isCollectionFromFactory(
                    address(_collection)
                );

                if (isCollectionFromFactory) {
                    break;
                }
            }

            if (!isCollectionFromFactory) {
                return false;
            }
        }

        (, , , , , , string memory contentHash) = _collection.items(_itemId);

        if (bytes(contentHash).length != 0) {
            // Only a _sender that belongs to the committee can have access to an item that has a defined content hash.
            bool isCommitteeMember;

            for (uint256 i; i < _committees.length; i++) {
                ICommittee committee = _committees[i];

                isCommitteeMember = committee.members(_sender);

                if (isCommitteeMember) {
                    break;
                }
            }

            bool isHashOk = keccak256(bytes(contentHash)) ==
                keccak256(bytes(_contentHash));

            return isCommitteeMember && isHashOk;
        }

        bool isCollectionValid = !_collection.isApproved() &&
            _collection.isCompleted();

        bool hasAccess = _sender == _collection.creator() ||
            _collection.globalManagers(_sender) ||
            _collection.itemManagers(_itemId, _sender);

        return isCollectionValid && hasAccess;
    }

    /// @notice Check that merkle root matches the merkle root of a third party.
    /// @param _tpRegistry Address of the third party registry contract.
    /// @param _tpId The id of the third party.
    /// @param _root The merkle root to validate.
    function validateThirdParty(
        IThirdPartyRegistry _tpRegistry,
        string memory _tpId,
        bytes32 _root
    ) external view returns (bool) {
        (bool isApproved, bytes32 root, , , , , ) = _tpRegistry.thirdParties(
            _tpId
        );

        return isApproved && root == _root;
    }

    /// @notice Check that an address is the owner of a name.
    /// @param _sender The address for which access will be checked.
    /// @param _registrar The address of the DCL registrar.
    /// @param _name The name to check.
    function checkName(
        address _sender,
        IDCLRegistrar _registrar,
        string calldata _name
    ) external view returns (bool) {
        return _sender == _registrar.getOwnerOf(_name);
    }

    /// @notice Check that an address has access to a LAND.
    /// @param _sender The address for which access will be checked.
    /// @param _land The LAND contract.
    /// @param _estate The Estate contract.
    /// @param _x X coordinate of the land.
    /// @param _y Y coordinate of the land.
    function checkLAND(
        address _sender,
        ILAND _land,
        IEstate _estate,
        int256 _x,
        int256 _y
    ) external view returns (bool) {
        uint256 landId = _land.encodeTokenId(_x, _y);
        address landOwner = _land.ownerOf(landId);

        if (landOwner == _sender) {
            return true;
        }

        if (_land.getApproved(landId) == _sender) {
            return true;
        }

        if (_land.updateOperator(landId) == _sender) {
            return true;
        }

        if (_land.isApprovedForAll(landOwner, _sender)) {
            return true;
        }

        if (_land.updateManager(landOwner, _sender)) {
            return true;
        }

        if (landOwner == address(_estate)) {
            uint256 estateId = _estate.getLandEstateId(landId);
            address estateOwner = _estate.ownerOf(estateId);

            if (estateOwner == _sender) {
                return true;
            }

            if (_estate.getApproved(estateId) == _sender) {
                return true;
            }

            if (_estate.updateOperator(estateId) == _sender) {
                return true;
            }

            if (_estate.isApprovedForAll(estateOwner, _sender)) {
                return true;
            }

            if (_estate.updateManager(estateOwner, _sender)) {
                return true;
            }
        }

        return false;
    }
}
