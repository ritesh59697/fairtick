import { stringToHex, concatHex, toHex, type Hex } from "viem";

/**
 * ERC-8021 / Base Builder Code Attribution
 * Standard Schema 0 Suffix Layout:
 * [calldata] + [1-byte length] + [ascii code] + [0x00 schema] + [16-byte marker]
 * 16-byte marker: 0x8021 repeated 8 times (0x80218021802180218021802180218021)
 * Schema 0: Canonical builder code attribution
 */

export const BUILDER_CODE_ENV = process.env.NEXT_PUBLIC_BUILDER_CODE || "bc_jmw5p5jt";

// 16-byte ERC-8021 repeated marker (8 x 0x8021)
export const ERC_8021_MARKER: Hex = "0x80218021802180218021802180218021";

// 1-byte Schema 0 identifier
export const ERC_8021_SCHEMA_0: Hex = "0x00";

/**
 * Validates if a builder code is configured and non-empty
 */
export function hasValidBuilderCode(code: string = BUILDER_CODE_ENV): boolean {
  return typeof code === "string" && code.trim().length > 0;
}

/**
 * Generates the standard ERC-8021 Schema 0 data suffix
 */
export function buildErc8021Suffix(builderCode: string): Hex {
  const cleanCode = builderCode.trim();
  const codeHex = stringToHex(cleanCode);
  // Calculate byte length of code string (e.g. 7 for "baseapp")
  const codeByteLength = (codeHex.length - 2) / 2;
  const lengthHex = toHex(codeByteLength, { size: 1 });

  return concatHex([lengthHex, codeHex, ERC_8021_SCHEMA_0, ERC_8021_MARKER]);
}

/**
 * Appends standard ERC-8021 Schema 0 builder code suffix to raw transaction calldata
 */
export function appendBuilderSuffix(data: Hex, builderCode: string = BUILDER_CODE_ENV): Hex {
  if (!hasValidBuilderCode(builderCode)) {
    return data;
  }
  const suffix = buildErc8021Suffix(builderCode);
  return concatHex([data, suffix]);
}

