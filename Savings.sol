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

    function withdraw() public {
        uint256 amount = balances[msg.sender] + calculateInterest(msg.sender);
        require(amount > 0, "No balance to withdraw");
        balances[msg.sender] = 0;
        totalDeposits -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }
}
