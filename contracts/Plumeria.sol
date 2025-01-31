// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Plumeria is ERC1155 {
    address public publisher;
    string public name;
    string public symbol;
    string metadataUri;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadataUri
    ) ERC1155("") {
        name = _name;
        symbol = _symbol;
        metadataUri = _metadataUri;
    }

    event SetPublisher(address indexed _publisher, string message);
    event SetMetadataUri(string _metadataUri, string message);

    modifier onlyPublisher() {
        require(msg.sender == publisher, "Yor are not the publisher");
        _;
    }

    modifier onlyCompleteSet() {
        require(checkBalances(msg.sender), "You don't have all the tokens");
        _;
    }

    function getBalances(address _owner) external view returns (uint[] memory) {
        uint[] memory balances = new uint[](17);
        for(uint i = 0 ; i < 17 ; i++ ){
            balances[i] = balanceOf(_owner, i);
        }

        return balances;
    }

    function mint(uint _tokenId, uint _amount) external {
        require(_tokenId < 17 && _tokenId > 0, "Invalid token ID");
        _mint(msg.sender, _tokenId, _amount, "");
    }

    function mintBatch(
        uint[] memory _tokenIds,
        uint[] memory _amounts
    ) external {
        for (uint i = 0; i < _tokenIds.length; i++) {
            require(_tokenIds[i] < 17 && _tokenIds[i] > 0, "Invalid token ID");
        }
        _mintBatch(msg.sender, _tokenIds, _amounts, "");
    }

    function upgrade() external onlyCompleteSet {
        uint[] memory _tokenIds = new uint[](16);
        uint[] memory _amounts = new uint[](16);
        
        assembly {
            let ptr1 := add(_tokenIds, 0x20)
            let ptr2 := add(_amounts, 0x20)

            for {let i := 0 } lt(i, 16) { i := add(i, 1) } {
                mstore(add(ptr1, mul(0x20, i)), add(i, 1))
                mstore(add(ptr2, mul(0x20, i)), 1)
            }
        }

        _burnBatch(msg.sender, _tokenIds, _amounts);
        _mint(msg.sender, 0, 1, "");

    }

    function burn(uint _tokenId, uint _amount) external {
        require(_tokenId < 17, "Invalid token ID");
        _burn(msg.sender, _tokenId, _amount);
    }

    function burnBatch(
        uint[] memory _tokenIds,
        uint[] memory _amounts
    ) external {
        for (uint i = 0; i < _tokenIds.length; i++) {
            require(_tokenIds[i] < 17, "Invalid token ID");
        }
        _burnBatch(msg.sender, _tokenIds, _amounts);
    }

    function uri(uint _tokenId) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    metadataUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function checkBalances(address _owner) internal view returns (bool) {
        bool check = true;

        for (uint i = 0; i < 16; i++) {
            if (balanceOf(_owner, i + 1) > 0) {
                continue;
            } else {
                check = false;
                break;
            }
        }

        return check;
    }

    function setPublisher(address _publisher) external onlyPublisher {
        publisher = _publisher;
        emit SetPublisher(_publisher, "Publisher set");
    }

    function setMetadataUri(string memory _metadataUri) external onlyPublisher {
        metadataUri = _metadataUri;
        emit SetMetadataUri(_metadataUri, "Metadata URI set");
    }
}
