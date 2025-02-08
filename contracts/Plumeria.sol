// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Plumeria is ERC1155 {
    // ==================== State Variables ====================
    address public publisher;
    string public name;
    string public symbol;
    string private metadataUri;

    uint public constant MAX_SUPPLY = 5000;
    mapping(uint256 => uint256) private _totalSupply;

    // ==================== Constructor and Setup Functions ====================
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadataUri
    ) ERC1155("") {
        publisher = msg.sender;
        name = _name;
        symbol = _symbol;
        metadataUri = _metadataUri;
    }

    function setPublisher(address _publisher) external onlyPublisher {
        publisher = _publisher;
        emit SetPublisher(_publisher);
    }

    function setMetadataUri(string memory _metadataUri) external onlyPublisher {
        metadataUri = _metadataUri;
        emit SetMetadataUri(_metadataUri);
    }

    // ==================== Modifiers ====================
    modifier onlyPublisher() {
        require(msg.sender == publisher, "You are not the publisher");
        _;
    }

    modifier onlyCompleteSet() {
        require(checkBalances(msg.sender), "You don't have all the tokens");
        _;
    }

    modifier onlyValidTokenId(uint _tokenId) {
        require(_tokenId > 0 && _tokenId < 17, "Invalid token ID");
        _;
    }

    modifier onlyValidAmount(uint _amount) {
        require(_amount > 0 && _amount < 11, "Invalid amount");
        _;
    }

    modifier supplyLimit(uint _tokenId, uint _amount) {
        require(
            totalSupply(_tokenId) + _amount <= MAX_SUPPLY,
            "The supply is full"
        );
        _;
    }

    // ==================== View Functions ====================
    function getBalances(address _owner) external view returns (uint[] memory) {
        uint[] memory balances = new uint[](17);
        for (uint i = 0; i < 17; i++) {
            balances[i] = balanceOf(_owner, i);
        }
        return balances;
    }

    function totalSupply(uint256 id) public view returns (uint256) {
        return _totalSupply[id];
    }

    function checkBalances(address _owner) internal view returns (bool) {
        for (uint i = 1; i < 17; i++) {
            if (balanceOf(_owner, i) == 0) return false;
        }
        return true;
    }

    // ==================== External Functions ====================
    function mint(
        uint _tokenId,
        uint _amount
    )
        external
        onlyValidTokenId(_tokenId)
        onlyValidAmount(_amount)
        supplyLimit(_tokenId, _amount)
    {
        _mint(msg.sender, _tokenId, _amount, "");
        _totalSupply[_tokenId] += _amount;
    }

    function mintBatch(
        uint[] memory _tokenIds,
        uint[] memory _amounts
    ) external {
        require(_tokenIds.length == _amounts.length, "Mismatched arrays");
        for (uint i = 0; i < _tokenIds.length; i++) {
            require(_tokenIds[i] > 0 && _tokenIds[i] < 17, "Invalid token ID");
            require(_amounts[i] < 11, "Invalid amount");
            require(
                totalSupply(_tokenIds[i]) + _amounts[i] <= MAX_SUPPLY,
                "The supply is full"
            );
        }
        _mintBatch(msg.sender, _tokenIds, _amounts, "");
        for (uint i = 0; i < _tokenIds.length; i++) {
            _totalSupply[_tokenIds[i]] += _amounts[i];
        }
    }

    function burn(uint _tokenId, uint _amount) external {
        require(_tokenId < 17, "Invalid token ID");
        _burn(msg.sender, _tokenId, _amount);
        _totalSupply[_tokenId] -= _amount;
        if(_tokenId == 0) emit BurnPremium(msg.sender, _amount);
    }

    function burnBatch(
        uint[] memory _tokenIds,
        uint[] memory _amounts
    ) external {
        require(_tokenIds.length == _amounts.length, "Mismatched arrays");
        for (uint i = 0; i < _tokenIds.length; i++) {
            require(_tokenIds[i] > 0 && _tokenIds[i] < 17, "Invalid token ID");
        }
        _burnBatch(msg.sender, _tokenIds, _amounts);
        for (uint i = 0; i < _tokenIds.length; i++) {
            _totalSupply[_tokenIds[i]] -= _amounts[i];
        }
    }

    function upgrade() external onlyCompleteSet {
        uint[] memory _tokenIds = new uint[](16);
        uint[] memory _amounts = new uint[](16);
        assembly {
            let ptr1 := add(_tokenIds, 0x20)
            let ptr2 := add(_amounts, 0x20)
            for {
                let i := 0
            } lt(i, 16) {
                i := add(i, 1)
            } {
                mstore(add(ptr1, mul(0x20, i)), add(i, 1))
                mstore(add(ptr2, mul(0x20, i)), 1)
            }
        }
        _burnBatch(msg.sender, _tokenIds, _amounts);

        for (uint i = 0; i < 16; i++) {
            _totalSupply[i + 1] -= 1;
        }

        _mint(msg.sender, 0, 1, "");
        _totalSupply[0] += 1;
        emit MintPremium(msg.sender);
    }

    // ==================== Metadata Functions ====================
    function uri(uint _tokenId) public view override returns (string memory) {
        require(_tokenId < 17, "Invalid token ID");
        return
            string(
                abi.encodePacked(
                    metadataUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    // ==================== Events ====================
    event SetPublisher(address indexed _publisher);
    event SetMetadataUri(string _metadataUri);
    event MintPremium(address indexed _owner);
    event BurnPremium(address indexed _owner, uint indexed _amount);
}
