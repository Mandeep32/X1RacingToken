const contractAddress = "0xYourTestnetContractAddress";  // i do not get my contract id because
//i do not have money for gas fess but i compiled full code working absolutely fine
const abi = [
  // ... ABI entries ...
];

let web3;
let contract;
let accounts;

document.getElementById("connect").onclick = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(abi, contractAddress);
    updateBalances();
  } else {
    alert("Please install MetaMask!");
  }
};

document.getElementById("stake").onclick = async () => {
  const amount = document.getElementById("stakeAmount").value;
  await contract.methods.stake(web3.utils.toWei(amount, "ether")).send({ from: accounts[0] });
  updateBalances();
};

document.getElementById("unstake").onclick = async () => {
  const amount = document.getElementById("unstakeAmount").value;
  await contract.methods.unstake(web3.utils.toWei(amount, "ether")).send({ from: accounts[0] });
  updateBalances();
};

document.getElementById("claimReward").onclick = async () => {
  await contract.methods.claimReward().send({ from: accounts[0] });
  updateBalances();
};

async function updateBalances() {
  const balance = await contract.methods.balanceOf(accounts[0]).call();
  const stakingBalance = await contract.methods.stakingBalance(accounts[0]).call();
  const rewards = await contract.methods.rewards(accounts[0]).call();
  document.getElementById("balance").innerText = `Balance: ${web3.utils.fromWei(balance, "ether")} X1R`;
  document.getElementById("stakingBalance").innerText = `Staking Balance: ${web3.utils.fromWei(stakingBalance, "ether")} X1R`;
  document.getElementById("rewards").innerText = `Rewards: ${web3.utils.fromWei(rewards, "ether")} X1R`;
}
