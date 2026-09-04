import {
  encodeFunctionData,
  parseUnits,
  parseAbi,
  concatHex,
  stringToHex,
  type Address,
  type Hex,
} from "viem";
import {
  USDC_ADDRESS,
  USDC_DECIMALS,
  AERODROME_V2_NVDA_USDC_POOL,
  UNISWAP_V3_ROUTER,
  TokenizedStock,
} from "./tokens";
import { appendBuilderSuffix } from "./attribution";

// ERC20 approve ABI
export const ERC20_APPROVE_ABI = parseAbi([
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)"
]);

// Aerodrome V2 Pool ABI for direct swap
export const AERO_POOL_SWAP_ABI = parseAbi([
  "function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes data) external",
  "function getAmountOut(uint256 amountIn, address tokenIn) view returns (uint256)"
]);

// Uniswap V3 SwapRouter02 ABI
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
  dexName: "Aerodrome" | "UniswapV3";
}

/**
 * Builds the exact transaction data for swapping USDC -> B20 Token (or vice-versa)
 * Appends the ERC-8021 Builder Code suffix for onchain attribution.
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
    // Buying B20 stock with USDC
    const tokenIn = USDC_ADDRESS;
    const amountInUnits = parseUnits(amountIn.toFixed(6), USDC_DECIMALS);
    const expectedOutUnits = parseUnits(expectedOut.toFixed(8), stock.decimals);
    const minOutUnits = parseUnits(minOut.toFixed(8), stock.decimals);

    if (stock.primaryDex === "Aerodrome" && stock.poolAddress) {
      // Aerodrome pool swap: token0 is USDC, token1 is NVDAc
      // Aerodrome requires user to transfer tokenIn directly to pool, then call pool.swap(0, minOut, recipient, "0x")
      // Alternatively, we use Uniswap Router if configured
      const baseCalldata = encodeFunctionData({
        abi: AERO_POOL_SWAP_ABI,
        functionName: "swap",
        args: [0n, minOutUnits, recipient, "0x"],
      });
      const attributedCalldata = appendBuilderSuffix(baseCalldata, builderCode);

      return {
        routerAddress: stock.poolAddress,
        tokenIn,
        amountInUnits,
        expectedOutUnits,
        minOutUnits,
        calldata: attributedCalldata,
        dexName: "Aerodrome",
      };
    } else {
      // Uniswap V3 SwapRouter02
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
    }
  } else {
    // Selling B20 stock for USDC
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
