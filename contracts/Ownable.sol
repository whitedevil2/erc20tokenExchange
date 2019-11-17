pragma solidity >=0.4.21 <0.6.0;

contract Ownable {
    /* Define owner of the type address */
    address owner;

    /**
     * Modifiers partially define a function and allow you to augment other functions.
     * The rest of the function continues at _;
     */
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /* This function is executed at initialization and sets the owner of the contract */
    constructor() public {
        owner = msg.sender;
    }
}
