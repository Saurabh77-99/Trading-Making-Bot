import axios from "axios";
import { DepthManager } from "./DepthManager";
const xaiInrMarket = new DepthManager("B-XAI_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const xaiUsdtMarket = new DepthManager("B-XAI_USDT");

setInterval(() => {
    console.log(xaiInrMarket.getRelevantDepth())
    console.log(usdtInrMarket.getRelevantDepth())
    console.log(xaiUsdtMarket.getRelevantDepth())

    // there are two sides you can sit on
    // sell SOL for INR, buy USDT from INR, buy SOL from INR
    // lets say u start with 1 SOL

    const canGetInr = xaiInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr / usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetXai = canGetUsdt / xaiUsdtMarket.getRelevantDepth().lowestAsk;
    
    
    console.log(`You can convert ${1} XAi into ${canGetXai} XAi`)
    //first one - Unprofitable

    // Buy SOL from INR, sell SOL for USDT, sell USDT for INR.
    const initialInr = xaiInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = xaiUsdtMarket.getRelevantDepth().highestBid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getRelevantDepth().highestBid;

    console.log(`You can convert ${initialInr} INR into ${canGetInr2} INR`)
}, 2000)


