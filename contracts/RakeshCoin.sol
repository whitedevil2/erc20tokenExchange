pragma solidity >=0.4.21 <0.6.0;

import "./ERC20Basic.sol";
import "./SafeMath.sol";
import "./Ownable.sol";

/**
 * @title Template token that can be purchased
 * @dev World's smallest crowd sale
 */
contract RakeshCoin is ERC20Basic,Ownable {
  using SafeMath for uint256;

  mapping(address => uint256) balances_MAR;


  uint256 totalSupply_;


  string public constant name = "RakeshCoin";
  string public constant symbol = "MAR";
  uint8 public constant decimals = 18;  // 18 is the most common number of decimal places


  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }





  //to transfer Rakesh Coins
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances_MAR[msg.sender]);

    balances_MAR[msg.sender] = balances_MAR[msg.sender].sub(_value);
    balances_MAR[_to] = balances_MAR[_to].add(_value);
    //emit Transfer(msg.sender, _to, _value);
    return true;
  }



  //checking balance of Rakesh Coins
  function balanceOf(address _owner) public view returns (uint256) {
    return balances_MAR[_owner];
  }


  //this sells Rakesh Coins in exchage for ether
  function () external payable {
      uint256 amount = msg.value.mul(1000);
      balances_MAR[msg.sender] = balances_MAR[msg.sender].add(amount);
      totalSupply_ = totalSupply_.add(amount);
      //emit Transfer(0x0, msg.sender, amount);
  }
}
