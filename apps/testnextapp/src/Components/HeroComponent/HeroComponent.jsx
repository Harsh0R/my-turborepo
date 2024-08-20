'use client'
import React, { useState, useEffect, useContext } from 'react';
import Style from './HeroComponent.module.css';
import { ETH, COIN_1, COIN_2, COIN_3, COIN_4, COIN_5, COIN_6, COIN_7, COIN_8, DEFAULT_VALUE } from '@/Context/saleToken';
import { SwapContext } from '@/Context/context';

const HeroComponent = () => {
    const [sourceToken, setSourceToken] = useState(DEFAULT_VALUE);
    const [destinationToken, setDestinationToken] = useState(DEFAULT_VALUE);
    const [sourceTokenAmount, setSourceTokenAmount] = useState('');
    const [destinationTokenAmount, setDestinationTokenAmount] = useState('');
    const {swapEthToTokens} = useContext(SwapContext)
    useEffect(() => {
        if (sourceToken === DEFAULT_VALUE || destinationToken === DEFAULT_VALUE) {
            // Reset destination token amount if either source or destination token is not selected
            setDestinationTokenAmount('');
            return;
        }

        const amount = parseFloat(sourceTokenAmount);
        if (isNaN(amount) || amount <= 0) {
            console.error('Please enter a valid source token amount.');
            setDestinationTokenAmount('');
            return;
        }

        if (sourceToken === 'Eth' && destinationToken !== 'Eth') {
            const destinationAmount = amount * 10000;
            setDestinationTokenAmount(destinationAmount.toFixed(2)); // Adjust decimals as needed
        } else if (sourceToken !== 'Eth' && destinationToken === 'Eth') {
            const destinationAmount = amount / 10000;
            setDestinationTokenAmount(destinationAmount.toFixed(2)); // Adjust decimals as needed
        } else {
            const destinationAmount = amount;
            setDestinationTokenAmount(destinationAmount.toFixed(2)); 
        }
    }, [sourceToken, destinationToken, sourceTokenAmount]);

    const handleSwap = () => {
        console.log("Name ==> " , destinationToken , " Am,ounbt==> " ,sourceTokenAmount);
        swapEthToTokens(destinationToken , sourceTokenAmount)
    }

    return (
        <div className="container">
            <h1>Swap Token to Token</h1>
            <div>
                <label>Source Token:</label>
                <select value={sourceToken} onChange={(e) => setSourceToken(e.target.value)}>
                    <option value={DEFAULT_VALUE}>{DEFAULT_VALUE}</option>
                    <option value={ETH}>{ETH}</option>
                    <option value={COIN_1}>{COIN_1}</option>
                    <option value={COIN_2}>{COIN_2}</option>
                    <option value={COIN_3}>{COIN_3}</option>
                    <option value={COIN_4}>{COIN_4}</option>
                    <option value={COIN_5}>{COIN_5}</option>
                    <option value={COIN_6}>{COIN_6}</option>
                    <option value={COIN_7}>{COIN_7}</option>
                    <option value={COIN_8}>{COIN_8}</option>
                </select>
                <input
                    type="number"
                    value={sourceTokenAmount}
                    onChange={(e) => setSourceTokenAmount(e.target.value)}
                    placeholder="Amount"
                />
            </div>
            <div>
                <label>Destination Token:</label>
                <select value={destinationToken} onChange={(e) => setDestinationToken(e.target.value)}>
                    <option value={DEFAULT_VALUE}>{DEFAULT_VALUE}</option>
                    <option value={ETH}>{ETH}</option>
                    <option value={COIN_1}>{COIN_1}</option>
                    <option value={COIN_2}>{COIN_2}</option>
                    <option value={COIN_3}>{COIN_3}</option>
                    <option value={COIN_4}>{COIN_4}</option>
                    <option value={COIN_5}>{COIN_5}</option>
                    <option value={COIN_6}>{COIN_6}</option>
                    <option value={COIN_7}>{COIN_7}</option>
                    <option value={COIN_8}>{COIN_8}</option>
                </select>
                <input
                    type="number"
                    value={destinationTokenAmount}
                    readOnly
                    placeholder="Amount"
                />
            </div>
            <button onClick={handleSwap}>Swap</button>
        </div>
    );
};

export default HeroComponent;
