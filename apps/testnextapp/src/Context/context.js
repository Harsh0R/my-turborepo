'use client'
import React, { createContext, useEffect, useState } from 'react';
import { connectWallet } from './contract';
import { contract } from './contract';


export const SwapContext = createContext();

export const SwapProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contractObj, setContractObj] = useState()

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const account = await connectWallet();
        console.log("Account ==> ", account);
        const contractIns = await contract();
        console.log("Contract Obj ===> ", contractIns);
        setContractObj(contractIns);
        setAccount(account);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };
    fetchAccount();
  }, []);

  async function getTokenAddress(tokenName) {
    try {
      const contractObj = await contract();
      console.log("address name === > ", tokenName);
      try {
        const address = await contractObj.getTokenAddress(tokenName);
        return address;
      } catch (error) {
        console.log("Error in === > ", error);
      }
    } catch (e) {
      return;
    }
  }

  async function swapEthToTokens(tokenName, amount) {
    console.log("Name ==> " , tokenName , " Am,ounbt==> " ,amount);
    try {
      let tx = {
        value: toWie(amount),
      };
      const contractObj = await contract();
      console.log("Contract ==> " , contractObj);
      const data = await contractObj.swapEthToToken(tokenName, tx);
      console.log("data ==> " , data);
      const receipt = await data.wait();
      return receipt;
    } catch (e) {
      return parseErrorMsg(e);
    }
  }

  async function hasValideAllowance(owner, tokenName, amount) {
    try {
      const contractObj = await contract();
      const address = await contractObj.getTokenAddress(tokenName);

      const tokenContractObj = await tokenContract(address);
      const data = await tokenContractObj.allowance(
        owner,
        "0x5EBF3785F366d2FF0203714A3858ae46a98b3F37"
      );
      const result = BigNumber.from(data.toString()).gte(
        BigNumber.from(toWie(amount))
      );
      return result;
    } catch (e) {
      return parseErrorMsg(e);
    }
  }

  async function increaseAllowance(tokenName, amount) {
    try {
      const contractObj = await contract();
      const address = await contractObj.getTokenAddress(tokenName);

      const tokenContractObj = await tokenContract(address);
      const data = await tokenContractObj.approve(
        "0x5EBF3785F366d2FF0203714A3858ae46a98b3F37",
        toWie(amount)
      );
      const result = await data.wait();
      return result;
    } catch (e) {
      return parseErrorMsg(e);
    }
  }

  async function swapTokenToEth(tokenName, amount) {
    try {
      const contractObj = await contract();
      const data = contractObj.swapTokenToEth(tokenName, toWie(amount));
      const result = await data.wait();
      return result;
    } catch (e) {
      return parseErrorMsg(e);
    }
  }

  async function swapTokenToToken(srcToken, desToken, amount) {
    try {
      const contractObj = await contract();
      const data = contractObj.swapTokenToToken(
        srcToken,
        desToken,
        toWie(amount),
        { gasLimit }
      );
      const result = await data.wait();
      return result;
    } catch (e) {
      return parseErrorMsg(e);
    }
  }

  async function getaTokenBalance(tokenName, address) {
    const contractObj = await contract();
    // console.log("Tb ==>", tokenName, " address = ", address);
    const balance = await contractObj.getBalance(tokenName, address);
    // console.log("Balance ==> ", balance);

    // Get the decimal precision of the token (assuming token.decimals returns it)
    // const decimalPrecision = await contractObj.decimals(tokenName);
    const decimalPrecision = 0;

    // Convert balance to wei
    const balanceWei = balance * 10 ** decimalPrecision;

    // Convert balance to Ether
    const balanceEth = balanceWei / 10 ** 18;

    return balanceEth;
  }

  async function toWie(amount) {
    const toWie = ethers.utils.parseUnits(amount.toString());
    return toWie.toString();
  }

  async function parseErrorMsg(e) {
    const json = JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message;
  }



  return (
    <SwapContext.Provider value={{ account, getTokenAddress, swapEthToTokens, hasValideAllowance, swapTokenToEth, swapTokenToToken, getaTokenBalance, increaseAllowance }}>
      {children}
    </SwapContext.Provider>
  );
};
