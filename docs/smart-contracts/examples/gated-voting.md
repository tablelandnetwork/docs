---
title: Gated voting
description: Create a contract that gates writes to a voting table based on ERC721 token ownership.
keywords:
  - token gating
  - nft gating
  - dao voting
---

Collaborative data often needs some way to permissionlessly ensure only the correct users can change table data. For example, a DAO could have some knowledge base or protocol decision that anyone with DAO token ownership can cast a vote. This setup established both a questions and an answers table:

- The sender must be a holder of token to answer for related questions—i.e., the `answer` method gates table writes by NFT ownership.
- For adding a question, this is fully open to _anyone_ and isn't gated by ownership, but it only allows updates and never deletes nor updates.

The voter contract holds questions and answer tables in which permissioned users can write to. The associated NFT contract that is gating the writes is also provided as a very basic implementation.

## Voter contract

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.11 <0.9.0;

import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/ITablelandController.sol";
import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";

/**
 * @dev Implementation of {ITablelandVoter}.
 */
contract TablelandVoter is ITablelandController {
    using ERC165Checker for address;

    uint256 private _questionsTableId;
    string private constant QUESTIONS_PREFIX = "voter_questions";
    string private constant QUESTIONS_SCHEMA =
        "id integer primary key, token text, body text";

    uint256 private _answersTableId;
    string private constant ANSWERS_PREFIX = "voter_answers";
    string private constant ANSWERS_SCHEMA =
        "qid int, token text, respondent text, vote int, unique(qid, respondent)";

    bytes4 private constant IID_IERC721 = 0x80ac58cd;

    constructor() {
        // Create questions table.
        _questionsTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(QUESTIONS_SCHEMA, QUESTIONS_PREFIX)
        );

        // Set controller for questions table to this contract.
        TablelandDeployments.get().setController(
            address(this),
            _questionsTableId,
            address(this)
        );

        // Create answers table.
        _answersTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(ANSWERS_SCHEMA, ANSWERS_PREFIX)
        );
    }

    // Create an answer.
    // Here we let the contract do inserts into the answers table.
    // The sender must be a holder of token to answer for related questions.
    function answer(uint256 qid, address token, bool vote) external {
        require(
            token.supportsInterface(type(IERC721).interfaceId),
            "token is not an nft"
        );
        require(
            IERC721(token).balanceOf(msg.sender) > 0,
            "sender is not token owner"
        );

        // Insert answer.
        TablelandDeployments.get().mutate(
            address(this),
            _answersTableId,
            SQLHelpers.toInsert(
                ANSWERS_PREFIX,
                _answersTableId,
                "qid,token,respondent,vote",
                string.concat(
                    Strings.toString(qid),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(token)),
                    ",",
                    SQLHelpers.quote(Strings.toHexString(msg.sender)),
                    ",",
                    vote ? "1" : "0"
                )
            )
        );
    }

    // Implement ITablelandController for questions table.
    // Anyone can insert.
    // Nobody can update or delete.
    function getPolicy(address) external payable returns (Policy memory) {
        return
            ITablelandController.Policy({
                allowInsert: true,
                allowUpdate: false,
                allowDelete: false,
                whereClause: "",
                withCheck: "",
                updatableColumns: new string[](0)
            });
    }

    // Return the questions table name
    function getQuestionsTable() public view returns (string memory) {
        return SQLHelpers.toNameFromId(QUESTIONS_PREFIX, _questionsTableId);
    }

    // Return the answers table name
    function getAnswersTable() public view returns (string memory) {
        return SQLHelpers.toNameFromId(ANSWERS_PREFIX, _answersTableId);
    }
}
```

## NFT contract

Below is a basic NFT contract, but if you're trying to create your own NFT using Tableland, check out the page on [how to build an NFT](/playbooks/concepts/how-to-build-an-nft). It outlines additional resources like defining an [optimal SQL table structure](/playbooks/concepts/nft-metadata) or [building a dynamic NFT in Solidity](/tutorials/dynamic-nft-solidity).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleToken is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;

    // Base URI
    string private _baseURIextended;

    constructor() ERC721("ExampleToken", "ExampleToken") {}

    function setBaseURI(string memory baseURI_) external onlyOwner {
        _baseURIextended = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory base = _baseURI();

        // If there is no base URI, revert.
        require(bytes(base).length > 0, "Base token URI is not set");

        // concatenate the tokenId to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function mint(address recipient) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        return newItemId;
    }
}
```
