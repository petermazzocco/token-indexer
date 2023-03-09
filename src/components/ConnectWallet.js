import { useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [signer, setSigner] = useState("");
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  //MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  //Connect Wallet
  async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
    const signerAccount = await provider.getSigner();
    setSigner(signerAccount);
    setAccount(await signerAccount.getAddress());
    setBalance(ethers.utils.formatEther(await signerAccount.getBalance()));
  }
  return (
    <div>
      <button
        onClick={connectWallet}
        class="relative inline-flex h-11 w-full items-center border-white justify-center p-0.5 mb-2 mr-2 hover:bg-white hover:text-teal-800 hover:border-2 hover:border-teal-800 overflow-hidden text-sm font-medium border-2 rounded-lg "
      >
        Connect A Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
