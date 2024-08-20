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
      console.log("address name === > " , contractObj);
      try {
        const address = await contractObj.getTokenAddress("BNB");
        console.log("Addrtes === > " , address);
      } catch (error) {
        console.log("Error in context === > " , error);
      }
      return address;
    } catch (e) {
      return;
    }
  }


  return (
    <SwapContext.Provider value={{ account , getTokenAddress }}>
      {children}
    </SwapContext.Provider>
  );
};
