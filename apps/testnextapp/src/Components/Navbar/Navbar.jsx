'use client'
import React, { useContext, useEffect, useState } from 'react'
import Style from "./Navbar.module.css"
import { SwapContext } from '@/Context/context'

const Navbar = () => {

    const { account, getTokenAddress } = useContext(SwapContext)
    const [tokenAddress, setTokenAddress] = useState()

    useEffect(() => {
        fetchTokenAddress();    
    }, []);
    
    async function fetchTokenAddress() {
        const address = await getTokenAddress('BNB');
        console.log("Addrtes === > " , address);
        setTokenAddress(address);
    }

    return (
        <div className={Style.container}>
            <div>
                Account Address == {account}
            </div>
        </div>
    )
}

export default Navbar