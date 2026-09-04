import { getAddress, type Address } from "viem";

export interface TokenizedStock {
  symbol: string;         // e.g. "NVDAc"
  name: string;           // e.g. "NVIDIA Corporation"
  underlying: string;     // e.g. "NVDA"
  address: Address;       // B20 precompile address
  feedAddress: Address;   // Chainlink total-return aggregator V3
  decimals: number;       // 8 for B20 tokens
  feedDecimals: number;   // 8 for Chainlink USD feeds
  primaryDex: "Aerodrome" | "UniswapV3" | string;
  poolAddress?: Address;
  poolFee?: number;       // e.g. 3000 (0.3%) for Uniswap V3
  isPriority?: boolean;   // featured on top of market list
}

export const BASE_CHAIN_ID = 8453;

// Official Base mainnet USDC
export const USDC_ADDRESS: Address = getAddress("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913");
export const USDC_DECIMALS = 6;

// Onchain registry from Base docs
export const B20_REGISTRY_ADDRESS: Address = getAddress("0x3f3E8cf41cdd3b1D118c16471aB0113DfDDd5CaD");

// Aerodrome V2 Pool for NVDA/USDC
export const AERODROME_V2_NVDA_USDC_POOL: Address = getAddress("0x2e39A9018330c8784956998185D23D9dB503d1F7");

// Uniswap V3 QuoterV2 & SwapRouter02 on Base
export const UNISWAP_V3_QUOTER_V2: Address = getAddress("0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a");
export const UNISWAP_V3_ROUTER: Address = getAddress("0x2626664c2603336E57B271c5C0b26F421741e481");

/**
 * Hardcoded allowlist of official Coinbase Tokenized Stocks on Base (B20)
 * Feeds are Chainlink AggregatorV3 with Total Return (multiplier already folded in)
 */
export const B20_TOKENS: TokenizedStock[] = [
  {
    symbol: "NVDAc",
    name: "NVIDIA Corporation",
    underlying: "NVDA",
    address: getAddress("0xb20000000000000000000078ee7ce2fE4908108C"),
    feedAddress: getAddress("0x04689a41629776563E6822F76f2e57D148d28513"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "Aerodrome",
    poolAddress: AERODROME_V2_NVDA_USDC_POOL,
    poolFee: 3000,
    isPriority: true,
  },
  {
    symbol: "AAPLc",
    name: "Apple Inc.",
    underlying: "AAPL",
    address: getAddress("0xb200000000000000000000C2e324d24d7eEcd1fb"),
    feedAddress: getAddress("0x787f13dEa48Db0897CbCDD985de77809D837F988"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolAddress: getAddress("0x97F35d1E92795327614BE000cd18cba1Be2c1931"),
    poolFee: 3000,
    isPriority: true,
  },
  {
    symbol: "METAc",
    name: "Meta Platforms Inc.",
    underlying: "META",
    address: getAddress("0xb2000000000000000000008bC8786B856E61707C"),
    feedAddress: getAddress("0x6526aE6797A76123638b863AeE4dD27Ba4E4b27D"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolAddress: getAddress("0x583919ec1975a1238C50e1940911894ee6912476"),
    poolFee: 3000,
    isPriority: true,
  },
  {
    symbol: "GOOGLc",
    name: "Alphabet Inc.",
    underlying: "GOOGL",
    address: getAddress("0xb2000000000000000000002D0BA3164cc74f58B7"),
    feedAddress: getAddress("0x5bF49E0ffA937CE2FfF033c739aD7C634c4D34F2"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolAddress: getAddress("0x8634EE4145A63E40E44e12A6Bb1B905Fcb8856a6"),
    poolFee: 3000,
    isPriority: true,
  },
  {
    symbol: "TSLAc",
    name: "Tesla Inc.",
    underlying: "TSLA",
    address: getAddress("0xb2000000000000000000001e800a7f5189430cD0"),
    feedAddress: getAddress("0xFaf869185383a24F8cb00e27BdA6b63B9905DCb4"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: true,
  },
  {
    symbol: "MSFTc",
    name: "Microsoft Corporation",
    underlying: "MSFT",
    address: getAddress("0xb200000000000000000000Ab99cFa739E253872B"),
    feedAddress: getAddress("0xeB10A6c9aa7E537aEd766C08c35Dae35B321b18c"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: true,
  },
  {
    symbol: "AMZNc",
    name: "Amazon.com Inc.",
    underlying: "AMZN",
    address: getAddress("0xb200000000000000000000d9192b6B456483C2E8"),
    feedAddress: getAddress("0x06A8E4b3aBB3B7543d8396FB2B763d22820cB295"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  },
  {
    symbol: "COINc",
    name: "Coinbase Global Inc.",
    underlying: "COIN",
    address: getAddress("0xb200000000000000000000c85a31389D71F3ecfb"),
    feedAddress: getAddress("0x408e44f504A7371a345F03a73dDC96A4b48e8aa7"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  },
  {
    symbol: "MSTRc",
    name: "MicroStrategy Inc.",
    underlying: "MSTR",
    address: getAddress("0xb2000000000000000000004884b426556b92883d"),
    feedAddress: getAddress("0xB3cE282CD188b35DA0E38D8Bc7d58e33173D202a"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  },
  {
    symbol: "CRCLc",
    name: "Circle Internet Financial",
    underlying: "CRCL",
    address: getAddress("0xB20000000000000000000019f6E7C675b73C2e4D"),
    feedAddress: getAddress("0x0231cF2635D1E17bB5c2462cc7504Ba1fBd61f33"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  },
  {
    symbol: "INTCc",
    name: "Intel Corporation",
    underlying: "INTC",
    address: getAddress("0xB2000000000000000000004AFF16039bA04bdFBc"),
    feedAddress: getAddress("0xAB657C39bac0D5886250D70849e2E3E008F2EECB"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  },
  {
    symbol: "SPCXc",
    name: "SpaceX",
    underlying: "SPCX",
    address: getAddress("0xb2000000000000000000007b9fcbd005511aCBd5"),
    feedAddress: getAddress("0x6A634B235903C4ad6376892180d6fF8612e3Fa68"),
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  },
  {
    symbol: "SNDKc",
    name: "Sandisk / Western Digital",
    underlying: "SNDK",
    address: getAddress("0xb200000000000000000000397293Cb8cda9a10c5"),
    // Marked unavailable: truncated in brief specification
    feedAddress: "0x0000000000000000000000000000000000000000" as Address,
    decimals: 8,
    feedDecimals: 8,
    primaryDex: "UniswapV3",
    poolFee: 3000,
    isPriority: false,
  }
];

export function getTokenBySymbol(symbol: string): TokenizedStock | undefined {
  const clean = symbol.toLowerCase().replace(/c$/, "");
  return B20_TOKENS.find(
    (t) =>
      t.symbol.toLowerCase() === symbol.toLowerCase() ||
      t.underlying.toLowerCase() === clean
  );
}

export function getTokenByAddress(address: string): TokenizedStock | undefined {
  return B20_TOKENS.find(
    (t) => t.address.toLowerCase() === address.toLowerCase()
  );
}
