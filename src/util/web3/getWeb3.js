import store from "../../store";
import Web3 from "web3";

export const WEB3_INITIALIZED = "WEB3_INITIALIZED";
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  };
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener("load", async dispatch => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        resolve(store.dispatch(web3Initialized({ web3Instance: web3 })));
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      resolve(web3);
    }
    // Fallback to localhost if no web3 injection; use dev console port by default
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(store.dispatch(web3Initialized({ web3Instance: web3 })));
    }
  });
});

export default getWeb3;
