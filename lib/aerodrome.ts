import {
  encodeFunctionData,
  parseUnits,
  parseAbi,
  type Address,
  type Hex,
} from "viem";
import {
  USDC_ADDRESS,
  USDC_DECIMALS,
  UNISWAP_V3_ROUTER,
  TokenizedStock,
} from "./tokens";
import { appendBuilderSuffix } from "./attribution";

// ERC20 standard approve & balance ABI
export const ERC20_APPROVE_ABI = parseAbi([
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)"
]);

// Uniswap V3 SwapRouter02 ABI (0x2626664c2603336E57B271c5C0b26F421741e481 on Base)
export const UNISWAP_ROUTER_ABI = parseAbi([
  "function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)"
]);

export interface SwapPreparation {
  routerAddress: Address;
  tokenIn: Address;
  amountInUnits: bigint;
  expectedOutUnits: bigint;
  minOutUnits: bigint;
  calldata: Hex;
  dexName: "UniswapV3";
}

/**
 * Builds the exact transaction data for swapping USDC <-> B20 Token via SwapRouter02 on Base.
 * Appends the standard ERC-8021 Builder Code suffix for onchain attribution.
 */
export function buildSwapTransaction({
  stock,
  isBuy,
  amountIn,
  expectedOut,
  slippagePct = 0.5,
  recipient,
  builderCode,
}: {
  stock: TokenizedStock;
  isBuy: boolean;
  amountIn: number;
  expectedOut: number;
  slippagePct?: number;
  recipient: Address;
  builderCode?: string;
}): SwapPreparation {
  const slippageMultiplier = (100 - slippagePct) / 100;
  const minOut = expectedOut * slippageMultiplier;

  if (isBuy) {
    // BUY: Swap USDC -> B20 Token
    const tokenIn = USDC_ADDRESS;
    const amountInUnits = parseUnits(amountIn.toFixed(6), USDC_DECIMALS);
    const expectedOutUnits = parseUnits(expectedOut.toFixed(8), stock.decimals);
    const minOutUnits = parseUnits(minOut.toFixed(8), stock.decimals);

    const baseCalldata = encodeFunctionData({
      abi: UNISWAP_ROUTER_ABI,
      functionName: "exactInputSingle",
      args: [
        {
          tokenIn: USDC_ADDRESS,
          tokenOut: stock.address,
          fee: stock.poolFee || 3000,
          recipient,
          amountIn: amountInUnits,
          amountOutMinimum: minOutUnits,
          sqrtPriceLimitX96: 0n,
        },
      ],
    });

    const attributedCalldata = appendBuilderSuffix(baseCalldata, builderCode);

    return {
      routerAddress: UNISWAP_V3_ROUTER,
      tokenIn,
      amountInUnits,
      expectedOutUnits,
      minOutUnits,
      calldata: attributedCalldata,
      dexName: "UniswapV3",
    };
  } else {
    // SELL: Swap B20 Token -> USDC
    const tokenIn = stock.address;
    const amountInUnits = parseUnits(amountIn.toFixed(8), stock.decimals);
    const expectedOutUnits = parseUnits(expectedOut.toFixed(6), USDC_DECIMALS);
    const minOutUnits = parseUnits(minOut.toFixed(6), USDC_DECIMALS);

    const baseCalldata = encodeFunctionData({
      abi: UNISWAP_ROUTER_ABI,
      functionName: "exactInputSingle",
      args: [
        {
          tokenIn: stock.address,
          tokenOut: USDC_ADDRESS,
          fee: stock.poolFee || 3000,
          recipient,
          amountIn: amountInUnits,
          amountOutMinimum: minOutUnits,
          sqrtPriceLimitX96: 0n,
        },
      ],
    });

    const attributedCalldata = appendBuilderSuffix(baseCalldata, builderCode);

    return {
      routerAddress: UNISWAP_V3_ROUTER,
      tokenIn,
      amountInUnits,
      expectedOutUnits,
      minOutUnits,
      calldata: attributedCalldata,
      dexName: "UniswapV3",
    };
  }
}

