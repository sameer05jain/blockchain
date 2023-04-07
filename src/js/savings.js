// Export the 'updateAccountDetails' function for use in other JavaScript files
async function updateAccountDetails() {
    const { address: CONTRACT_ADDRESS, abi: CONTRACT_ABI } = await loadContractConfig();

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const userAccount = accounts[0];
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
            const balanceWei = await contract.methods.getBalance(userAccount).call();
            const balance = web3.utils.fromWei(balanceWei, 'ether');
            const interest = await contract.methods.calculateInterest(userAccount).call();
            const interestEth = web3.utils.fromWei(interest, 'ether');
            document.getElementById('balance').textContent = balance;
            document.getElementById('interest').textContent = interestEth;
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask or another compatible Ethereum wallet.');
    }
}

async function loadContractConfig() {
    const response = await fetch('/js/savingsContractConfig.json');
    const config = await response.json();
    return {
        address: config.contractAddress,
        abi: config.contractABI,
    };
}

(async function init() {
    const { address: CONTRACT_ADDRESS, abi: CONTRACT_ABI } = await loadContractConfig();

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const userAccount = accounts[0];
            const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

            document.getElementById('deposit-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const weiAmount = document.getElementById('deposit-amount').value;
                await contract.methods.deposit().send({ from: userAccount, value: weiAmount });
                updateAccountDetails();
            });

            document.getElementById('withdraw-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const weiAmount = document.getElementById('withdraw-amount').value;
                await contract.methods.withdraw(weiAmount).send({ from: userAccount });
                updateAccountDetails(userAccount, contract);
            });

            document.getElementById('withdraw-form').addEventListener('submit', async (e) => {
                e.preventDefault();
                const weiAmount = document.getElementById('withdraw-amount').value;
            
                await contract.methods.withdraw(userAccount, weiAmount).send({ from: userAccount });
                updateAccountDetails(userAccount, contract);
            });

            updateAccountDetails();

        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask or another compatible Ethereum wallet.');
    }
})();


