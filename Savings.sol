// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract SavingsPlatform {
    mapping(address => uint256) private balances;
    uint256 public interestRate;
    uint256 public totalDeposits;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    constructor(uint256 _interestRate) {
        interestRate = _interestRate;
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        totalDeposits += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function calculateInterest(address user) public view returns (uint256) {
        return (balances[user] * interestRate) / 100;
    }

    function withdraw(address payable _to, uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient user balance");
        require(address(this).balance >= _amount, "Insufficient contract balance");

        balances[msg.sender] -= _amount;
        totalDeposits -= _amount;
        _to.transfer(_amount);

        emit Withdrawal(msg.sender, _amount);
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }
}
