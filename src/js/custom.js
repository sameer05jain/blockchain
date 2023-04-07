let account;
// Login 
const loginWithWeb3 = async () => {
    // 1.1 check if there is global window.web3 instance
    if (window.web3) {
      try {
        // 2. get the user's ethereum account - prompts metamask to login
        const selectedAccount = await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => accounts[0])
          .catch(() => {
            // 2.1 if the user cancels the login prompt
            throw Error("Please select an account");
          });
  
        // 3. set the global userWalletAddress variable to selected account
        window.userWalletAddress = selectedAccount;
  
        // 4. store the user's wallet address in local storage
        window.localStorage.setItem("userWalletAddress", selectedAccount);

        // 5. Hide the login section
        document.getElementsByClassName("logout")[0].style.display = "inline"; 
        document.getElementsByClassName("login")[0].style.display = "none"; 
        document.getElementsByClassName("dashboard-container")[0].style.display = "block"; 

        $(".login-container").fadeOut("slow");
        $(".dashboard-container").fadeIn("slow");

        // 6. Show Dashbpoard Display Contract

        showUserDashboard();

        await connectContract();
        getContractAccount();
        getContractBalance();
      } catch (error) {
        alert(error);
      }
    } else {
      alert("wallet not found");
    }
  };

const setSessionButtons = async () => {
    if(window.localStorage.getItem("userWalletAddress")) {
        document.getElementsByClassName("login")[0].style.display = "none"; 
        document.getElementsByClassName("logout")[0].style.display = "inline"; 
        document.getElementsByClassName("login-container")[0].style.display = "none"; 
        document.getElementsByClassName("dashboard-container")[0].style.display = "block"; 
        showUserDashboard();
        await connectContract();
        getContractAccount();
        getContractBalance();
    } 
}

// Log out
const logout = () => {
    // set the global userWalletAddress variable to null
    window.userWalletAddress = null;
  
    // remove the user's wallet address from local storage
    window.localStorage.removeItem("userWalletAddress");

    setSessionButtons();
  };

  // function to show the user dashboard
const showUserDashboard = async () => {
    let userWalletAddress = window.localStorage.getItem("userWalletAddress");
    if (!userWalletAddress) {
      return false;
    }
    // show the user's wallet address
    showUserWalletAddress();  
    // get the user's wallet balance
    getWalletBalance();
  };
  

  // get the user's wallet balance
const getWalletBalance = async () => {
    let userWalletAddress = window.localStorage.getItem("userWalletAddress");
    // check if there is global userWalletAddress variable
    if (!userWalletAddress) {
      return false;
    }
  
    const balance = await window.ethereum
    .request({
      method: "eth_getBalance",
      params: [userWalletAddress, "latest"]
    })
    .then((balalnce) => balalnce)
    .catch(() => {
      // 2.1 if the user cancels the login prompt
      throw Error("Please select an account");
    }); 

    // convert the balance to ether
    document.querySelector(".wallet-balance").innerHTML = Number(balance / 1e18).toString(10);
  };
  
// show the user's wallet address from the global userWalletAddress variable
const showUserWalletAddress = () => {
    const walletAddressEl = document.querySelector(".wallet-address");
    walletAddressEl.innerHTML = window.localStorage.getItem("userWalletAddress");
};

const connectContract = async () => {
        const ABI = [
            {
                "inputs": [],
                "name": "deposit",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
    const Address = "0x748109Fd23A8456026E00d4426E462D00BdE008B"; 
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
}

const getContractAccount = async () => {
    const data = await window.contract.methods.getAddress().call();
    document.getElementById("contractAccount").innerHTML = `Contract Account: ${data}`;
}

const getContractBalance = async () => { 
    const data = await window.contract.methods.getBalance().call();
    document.getElementById("balanceArea").innerHTML = `Contract Balance: ${data}`;
}

const depositContract = async () => {
    let userWalletAddress = window.localStorage.getItem("userWalletAddress");
    const amount = document.getElementById("depositInput").value;
    await window.contract.methods.deposit().send({from: userWalletAddress, value: amount});
}

const withdraw = async () => {
    let userWalletAddress = window.localStorage.getItem("userWalletAddress");
    const amount = document.getElementById("amountInput").value;
    const address = document.getElementById("addressInput").value;
    await window.contract.methods.withdraw(address, amount).send({from: userWalletAddress});
}

function setValue() {
    document.getElementById("depositInput").value = "500";
}

function setValue1() {
    document.getElementById("depositInput").value = "1000";
}

function setValue2() {
    document.getElementById("depositInput").value = "1500";
}

window.onload = function() {
    setSessionButtons();
  };