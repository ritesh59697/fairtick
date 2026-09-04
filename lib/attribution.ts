import { stringToHex, concatHex, type Hex } from "viem";

/**
 * ERC-8021 / Base Builder Code Attribution
 * Every transaction can append a dataSuffix to the calldata for onchain attribution.
 * Builder codes are registered on https://base.dev (Settings -> Builder Code)
 */

export const BUILDER_CODE_ENV = process.env.NEXT_PUBLIC_BUILDER_CODE || "";

/**
 * Appends builder code suffix to raw transaction calldata
 */
export function appendBuilderSuffix(data: Hex, builderCode: string = BUILDER_CODE_ENV): Hex {
  if (!builderCode || builderCode.trim() === "") {
    return data;
  }
  const cleanCode = builderCode.trim();
  // Encode builder code into bytes
  const suffix = stringToHex(cleanCode);
  return concatHex([data, suffix]);
}
