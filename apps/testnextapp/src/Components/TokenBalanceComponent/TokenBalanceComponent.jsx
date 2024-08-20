'use client'
import React, { useContext, useEffect, useState } from 'react';
import { SwapContext } from '@/Context/context';

const TokenBalanceComponent = () => {
    const { account, getaTokenBalance } = useContext(SwapContext);
    const [tokenBalances, setTokenBalances] = useState([]);

    const ETH = "Eth";
    const COIN_1 = "Tether USD";
    const COIN_2 = "BNB";
    const COIN_3 = "USD Coin";
    const COIN_4 = "stETH";
    const COIN_5 = "TRON";
    const COIN_6 = "Uniswap";
    const COIN_7 = "SHIBA INU";
    const COIN_8 = "Matic Token";
    const DEFAULT_VALUE = "Select a token";

    useEffect(() => {
        const fetchTokenBalances = async () => {
            if (account) {
                console.log("Acc ==>>> ", account);
                const tokens = ["Tether USD", "BNB", "USD Coin", "stETH", "TRON", "Uniswap", "SHIBA INU", "Matic Token"];
                const balances = await Promise.all(tokens.map(async token => {
                    const balance = await getaTokenBalance(token, account);
                    return { token, balance };
                }));
                setTokenBalances(balances);
            }
        };
        fetchTokenBalances();
    }, [account, getaTokenBalance]);

    return (
        <div>
            <h2>Token Balances</h2>
            <ul>
                {tokenBalances.map(({ token, balance }) => (
                    <li key={token}>
                        <strong>{token}: </strong> {balance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TokenBalanceComponent;
