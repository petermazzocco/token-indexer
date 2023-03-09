import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";

const App = () => {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);

  async function getTokenBalance() {
    const config = {
      apiKey: "UcMpr1-cSvWsWpUZqqF5hC9AyO7HtpGj",
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const data = await alchemy.core.getTokenBalances(userAddress);

    setResults(data);

    const tokenDataPromises = [];

    for (let i = 0; i < data.tokenBalances.length; i++) {
      const tokenData = alchemy.core.getTokenMetadata(
        data.tokenBalances[i].contractAddress
      );
      tokenDataPromises.push(tokenData);
    }

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
  }

  return (
    <div className="min-h-screen bg-black text-white bg-[url('../public/bg.svg')] bg-fixed">
      <div className="flex flex-col align-middle justify-center px-24 py-24">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            VAULT
          </span>
          -20
        </h1>
        <h2 className="text-xl">
          An Easy Way To View Your{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            ERC-20
          </span>{" "}
          Assets
        </h2>
      </div>
      <div className="flex sm:flex-col md:flex-row justify-evenly">
        <div className="justify-center">
          <h2 className=" text-xl font-bold mt-8 mb-1">Enter A Address</h2>
          <input
            class="relative inline-flex w-full items-center text-black border-white justify-center p-0.5 mb-2 mr-2 hover:bg-white hover:text-teal-800 hover:border-2 hover:border-teal-800 overflow-hidden text-sm font-medium border-2 rounded-lg "
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <button
            class="relative inline-flex h-11 w-full items-center border-white justify-center p-0.5 mb-2 mr-2 hover:bg-white hover:text-teal-800 hover:border-2 hover:border-teal-800 overflow-hidden text-sm font-medium border-2 rounded-lg "
            onClick={getTokenBalance}
          >
            Submit
          </button>
        </div>
        <div className="grid justify-center align-middle mt-4 pb-10">
          {hasQueried ? (
            <div class="relative overflow-x-auto flex flex-col align-middle place-items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Symbol
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Logo
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Balance
                    </th>
                  </tr>
                </thead>
                {results.tokenBalances.map((e, i) => {
                  return (
                    <tbody>
                      <td className="px-6 py-4 border border-gray-600 font-medium whitespace-nowrap ">
                        {tokenDataObjects[i].symbol}
                        &nbsp;
                      </td>
                      <td className="px-6 py-4 border border-gray-600 font-medium  whitespace-nowrap ">
                        {tokenDataObjects[i].logo ? (
                          <img
                            src={tokenDataObjects[i].logo}
                            alt="logo"
                            className="w-8"
                          />
                        ) : (
                          <p>N/A</p>
                        )}
                      </td>
                      <td className="px-6 py-4 border border-gray-600 font-medium whitespace-nowrap ">
                        {Utils.formatUnits(
                          e.tokenBalance,
                          tokenDataObjects[i].decimals
                        ).substring(0, 8)}
                      </td>
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
