import { XsdAnnotable } from "./helpers";

import {
    IDecimalFacets, IDoubleFacets, IDurationFacets, IEnumerableFacets, IStringFacets,
    TSType, XsdAnySimpleType, XsdSimpleType,
} from "./common";

export class XsdString extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "string");
    }

    public processValue(value: any, facets?: IStringFacets) {
        const r = super.processValue(value, facets);
        const errors: TypeError[] = [];
        if (facets.maxLength !== undefined && r.length > facets.maxLength) {
            errors.push(new TypeError("Value of length " + r.length + " is above the facets maxLength of " + facets.maxLength));
        }
        if (facets.minLength !== undefined && r.length < facets.minLength) {
            errors.push(new TypeError("Value of length " + r.length + " is above the facets minLength of " + facets.minLength));
        }
        if (facets.length !== undefined && r.length !== facets.length) {
            errors.push(new TypeError("Value of length " + r.length + " is different from the facets length of " + facets.length));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdNormalizedString extends XsdString {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "normalizedString");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { whiteSpace: "replace" };
        } else if (!facets.whiteSpace) {
            facets = { ...facets, whiteSpace: "replace" };
        }
        return super.processValue(value, facets);
    }
}

export class XsdToken extends XsdNormalizedString {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "token");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        return super.processValue(value, facets);
    }
}

const languagePattern = /^[a-zA-Z]{1,8}(?:-[a-zA-Z0-9]{1,8})*$/;
export class XsdLanguage extends XsdToken {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "language");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { pattern: languagePattern };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: languagePattern };
        }
        return super.processValue(value, facets);
    }
}

// tslint:disable-next-line:variable-name
const NMTOKENPattern = /^[a-zA-Z0-9_:\-\.]+$/;
export class XsdNMTOKEN extends XsdToken {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "NMTOKEN");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { pattern: NMTOKENPattern };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: NMTOKENPattern };
        }
        return super.processValue(value, facets);
    }
}

// tslint:disable-next-line:variable-name
const NMTOKENSPattern = /^[a-zA-Z0-9_:\-\.]+(?: [a-zA-Z0-9_:\-\.]+)*$/;
// TODO: XsdList
export class XsdNMTOKENS extends XsdToken {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "NMTOKENS");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { pattern: NMTOKENSPattern };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: NMTOKENSPattern };
        }
        return super.processValue(value, facets);
    }
}

const namePattern = /^[a-zA-Z_:][a-zA-Z0-9_:\-\.]*$/;
export class XsdName extends XsdToken {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "name");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { pattern: namePattern };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: namePattern };
        }
        return super.processValue(value, facets);
    }
}

export class XsdNCName extends XsdName {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "NCName");
    }

    public processValue(value: any, facets?: IStringFacets) {
        const r = super.processValue(value, facets);
        if (r.indexOf(":") !== -1) {
            throw [new TypeError("Value " + JSON.stringify(r) + " (inherits from NCName) may not contain a colon (':').")];
        }
        return r;
    }
}

export class XsdID extends XsdNCName {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "ID");
    }
}

export class XsdIDREF extends XsdNCName {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "IDREF");
    }
}

const idrefsPattern = /^[a-zA-Z_:][a-zA-Z0-9_:\-\.]*(?: [a-zA-Z_:][a-zA-Z0-9_:\-\.]*)*$/;
// TODO: XsdList
export class XsdIDREFS extends XsdIDREF {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "IDREFS");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { pattern: idrefsPattern };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: idrefsPattern };
        }
        return super.processValue(value, facets);
    }
}

export class XsdENTITY extends XsdNCName {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "ENTITY");
    }
}

const entitiesPattern = idrefsPattern;
// TODO: XsdList
export class XsdENTITIES extends XsdIDREF {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "ENTITIES");
    }

    public processValue(value: any, facets?: IStringFacets) {
        if (!facets) {
            facets = { pattern: entitiesPattern };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: entitiesPattern };
        }
        return super.processValue(value, facets);
    }
}

const decimalPattern = /^[-\+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/;
export class XsdDecimal extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "number"], nativeName || "decimal");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (typeof value === "number") {
            if (typeof facets.fractionDigits === "number") {
                value = value.toFixed(facets.fractionDigits);
            } else {
                value = value.toString();
            }
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);
        if (!decimalPattern.test(r)) {
            throw [new TypeError("A decimal type needs to be a number (N|N.|N.N|.N).")];
        }
        const n = parseFloat(r);

        const errors: TypeError[] = [];
        if (facets.totalDigits !== undefined && r.replace(/[-\+\.]/g, "").length > facets.totalDigits) {
            errors.push(new TypeError("Value of length " + r.length + " is above the facets totalDigits of " + facets.totalDigits));
        }
        if (facets.maxExclusive !== undefined && n >= facets.maxExclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is above the facets maxExclusive of " + JSON.stringify(facets.maxExclusive)));
        }
        if (facets.maxInclusive !== undefined && n > facets.maxInclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is above the facets maxInclusive of " + JSON.stringify(facets.maxInclusive)));
        }
        if (facets.minInclusive !== undefined && n < facets.minInclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is below the facets minInclusive of " + JSON.stringify(facets.minInclusive)));
        }
        if (facets.minExclusive !== undefined && n <= facets.minExclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is below the facets minExclusive of " + JSON.stringify(facets.minExclusive)));
        }
        if (facets.fractionDigits !== undefined) {
            let decpos = r.indexOf(".");
            if (decpos === -1) {
                decpos = r.length;
            } else {
                decpos++;
            }
            if (r.length - decpos > facets.fractionDigits) {
                errors.push(new TypeError("Value " + JSON.stringify(n) + " has more numbers after the decimal point than allowed by the facets fractionDigits of " + JSON.stringify(facets.fractionDigits)));
            }
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const integerPattern = /^[-\+]?[0-9]+$/;
export class XsdInteger extends XsdDecimal {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "integer");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (typeof value === "number" && !Number.isSafeInteger(value)) {
            throw [new TypeError("The value " + JSON.stringify(value) + " is not a safe integer in this ES implementation.")];
        }
        if (!facets) {
            facets = { pattern: integerPattern, fractionDigits: 0 };
        } else if (!facets.pattern) {
            facets = { ...facets, pattern: integerPattern, fractionDigits: 0 };
        } else {
            facets = { ...facets, fractionDigits: 0 };
        }
        return super.processValue(value, facets);
    }
}

export class XsdNonPositiveInteger extends XsdDecimal {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "nonPositiveInteger");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 0 };
        } else if (!facets.maxInclusive) {
            facets = { ...facets, maxInclusive: 0 };
        }
        return super.processValue(value, facets);
    }
}

export class XsdNegativeInteger extends XsdNonPositiveInteger {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "negativeInteger");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: -1 };
        } else if (!facets.maxInclusive) {
            facets = { ...facets, maxInclusive: -1 };
        }
        return super.processValue(value, facets);
    }
}

const longMax = Math.min(Number.MAX_SAFE_INTEGER, 9223372036854775807);
const longMin = Math.max(-9223372036854775808, Number.MIN_SAFE_INTEGER);
export class XsdLong extends XsdDecimal {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "long");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: longMax, minInclusive: longMin };
        } else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = { ...facets, maxInclusive: longMax };
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = { ...facets, minInclusive: longMin };
            }
        }
        return super.processValue(value, facets);
    }
}

export class XsdInt extends XsdLong {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "int");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 2147483647, minInclusive: -2147483648 };
        } else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = { ...facets, maxInclusive: 2147483647 };
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = { ...facets, minInclusive: -2147483648 };
            }
        }
        return super.processValue(value, facets);
    }
}

export class XsdShort extends XsdInt {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "short");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 32767, minInclusive: -32768 };
        } else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = { ...facets, maxInclusive: 32767 };
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = { ...facets, minInclusive: -32768 };
            }
        }
        return super.processValue(value, facets);
    }
}

export class XsdByte extends XsdShort {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "byte");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 127, minInclusive: -128 };
        } else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = { ...facets, maxInclusive: 127 };
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = { ...facets, minInclusive: -128 };
            }
        }
        return super.processValue(value, facets);
    }
}

export class XsdNonNegativeInteger extends XsdDecimal {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "nonNegativeInteger");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { minInclusive: 0 };
        } else if (!facets.minInclusive) {
            facets = { ...facets, minInclusive: 0 };
        }
        return super.processValue(value, facets);
    }
}

export class XsdPositiveInteger extends XsdNonNegativeInteger {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "positiveInteger");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { minInclusive: 1 };
        } else if (!facets.minInclusive) {
            facets = { ...facets, minInclusive: 1 };
        }
        return super.processValue(value, facets);
    }
}

const unsignedLongMax = Math.min(18446744073709551615, Number.MAX_SAFE_INTEGER);
export class XsdUnsignedLong extends XsdNonNegativeInteger {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "unsignedLong");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: unsignedLongMax };
        } else if (!facets.minInclusive) {
            facets = { ...facets, maxInclusive: unsignedLongMax };
        }
        return super.processValue(value, facets);
    }
}

export class XsdUnsignedInt extends XsdUnsignedLong {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "unsignedInt");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 4294967295 };
        } else if (!facets.minInclusive) {
            facets = { ...facets, maxInclusive: 4294967295 };
        }
        return super.processValue(value, facets);
    }
}

export class XsdUnsignedShort extends XsdUnsignedInt {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "unsignedShort");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 65535 };
        } else if (!facets.maxInclusive) {
            facets = { ...facets, maxInclusive: 65535 };
        }
        return super.processValue(value, facets);
    }
}

export class XsdUnsignedByte extends XsdUnsignedShort {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType, nativeName || "unsignedByte");
    }

    public processValue(value: any, facets?: IDecimalFacets) {
        if (!facets) {
            facets = { maxInclusive: 255 };
        } else if (!facets.maxInclusive) {
            facets = { ...facets, maxInclusive: 255 };
        }
        return super.processValue(value, facets);
    }
}

const doublePattern = /^[-\+]?(?:([0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][0-9]+)?|INF|NaN)$/;
export class XsdFloat extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "number"], nativeName || "float");
    }

    public processValue(value: any, facets?: IDoubleFacets) {
        if (typeof value === "number") {
            if (value === Number.POSITIVE_INFINITY) {
                value = "INF";
            } else if (value === Number.NEGATIVE_INFINITY) {
                value = "-INF";
            } else {
                value = value.toExponential();
            }
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);
        if (!doublePattern.test(r)) {
            throw [new TypeError("A decimal type needs to be a number (N|N.|N.N|.N|Ne-N|NEN|INF|-INF|NaN).")];
        }
        const n = r === "INF" ? Number.POSITIVE_INFINITY
            : r === "-INF" ? Number.NEGATIVE_INFINITY
            : r === "NaN" ? Number.NaN
            : parseFloat(r);

        const errors: TypeError[] = [];
        if (facets.maxExclusive !== undefined && n >= facets.maxExclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is above the facets maxExclusive of " + JSON.stringify(facets.maxExclusive)));
        }
        if (facets.maxInclusive !== undefined && n > facets.maxInclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is above the facets maxInclusive of " + JSON.stringify(facets.maxInclusive)));
        }
        if (facets.minInclusive !== undefined && n < facets.minInclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is below the facets minInclusive of " + JSON.stringify(facets.minInclusive)));
        }
        if (facets.minExclusive !== undefined && n <= facets.minExclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is below the facets minExclusive of " + JSON.stringify(facets.minExclusive)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}
export class XsdDouble extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "number"], nativeName || "double");
    }

    public processValue(value: any, facets?: IDoubleFacets) {
        if (typeof value === "number") {
            if (value === Number.POSITIVE_INFINITY) {
                value = "INF";
            } else if (value === Number.NEGATIVE_INFINITY) {
                value = "-INF";
            } else {
                value = value.toExponential();
            }
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);
        if (!doublePattern.test(r)) {
            throw [new TypeError("A decimal type needs to be a number (N|N.|N.N|.N|Ne-N|NEN|INF|-INF|NaN).")];
        }
        const n = r === "INF" ? Number.POSITIVE_INFINITY
            : r === "-INF" ? Number.NEGATIVE_INFINITY
            : r === "NaN" ? Number.NaN
            : parseFloat(r);

        const errors: TypeError[] = [];
        if (facets.maxExclusive !== undefined && n >= facets.maxExclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is above the facets maxExclusive of " + JSON.stringify(facets.maxExclusive)));
        }
        if (facets.maxInclusive !== undefined && n > facets.maxInclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is above the facets maxInclusive of " + JSON.stringify(facets.maxInclusive)));
        }
        if (facets.minInclusive !== undefined && n < facets.minInclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is below the facets minInclusive of " + JSON.stringify(facets.minInclusive)));
        }
        if (facets.minExclusive !== undefined && n <= facets.minExclusive) {
            errors.push(new TypeError("Value " + JSON.stringify(n) + " is below the facets minExclusive of " + JSON.stringify(facets.minExclusive)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdNOTATION extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "NOTATION");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (!facets) {
            facets = { pattern: namePattern, whiteSpace: "collapse" };
        } else {
            if (!facets.pattern) {
                facets = { ...facets, pattern: namePattern };
            }
            if (facets.whiteSpace !== "collapse") {
                facets = { ...facets, whiteSpace: "collapse" };
            }
        }
        const r = super.processValue(value, facets);
        const errors: TypeError[] = [];
        const cpos = r.indexOf(":");
        if (cpos !== -1) {
            if (cpos === 0) {
                errors.push(new TypeError("A NOTATION must not start with a colon (:)"));
            } else if (r.lastIndexOf(":") !== cpos) {
                errors.push(new TypeError("A NOTATION must not contain multiple colons (:)"));
            } else if (!namePattern.test(r.substring(cpos + 1))) {
                errors.push(new TypeError("Local part of NOTATION must be a valid NCName"));
            }
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdQName extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "QName");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (!facets) {
            facets = { pattern: namePattern, whiteSpace: "collapse" };
        } else {
            if (!facets.pattern) {
                facets = { ...facets, pattern: namePattern };
            }
            if (facets.whiteSpace !== "collapse") {
                facets = { ...facets, whiteSpace: "collapse" };
            }
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        const cpos = r.indexOf(":");
        if (cpos !== -1) {
            if (cpos === 0) {
                errors.push(new TypeError("A QName must not start with a colon (:)"));
            } else if (r.lastIndexOf(":") !== cpos) {
                errors.push(new TypeError("A QName must not contain multiple colons (:)"));
            } else if (!namePattern.test(r.substring(cpos + 1))) {
                errors.push(new TypeError("Local part of QName must be a valid NCName"));
            }
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdBoolean extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "boolean"], nativeName || "boolean");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        switch (r) {
            case "true":
            case "false":
            case "1":
            case "0":
                break;
            default:
                errors.push(new TypeError("Invalid boolean value: " + JSON.stringify(r)));
                break;
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdBase64Binary extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "base64Binary");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);
        const r2 = r.replace(/\s/g, "");

        const errors: TypeError[] = [];
        if (r2.length % 4 !== 0) {
            errors.push(new TypeError("A base64 value must have a multiple of 4 bytes"));
        }
        if (/[^A-Za-z0-9\+\/=]/.test(r2)) {
            errors.push(new TypeError("Unexpected character in base64 value"));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdHexBinary extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "hexBinary");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);
        const r2 = r.replace(/\s/g, "");

        const errors: TypeError[] = [];
        if (r2.length % 2 !== 0) {
            errors.push(new TypeError("A hex value must have a multiple of 2 bytes"));
        }
        if (/[^A-Fa-f0-9]/.test(r2)) {
            errors.push(new TypeError("Unexpected character in hex value"));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export class XsdAnyURI extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "anyURI");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (r.indexOf("#") !== r.lastIndexOf("#")) {
            errors.push(new TypeError("Only one fragment part is allowed in anyURI: " + JSON.stringify(r)));
        }
        if (/%(?:$|[^A-Fa-f0-9](?:$|[^A-Fa-f0-9]))/.test(r)) {
            errors.push(new TypeError("Percent encoding error in anyURI: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const datePattern = /^-?[0-9]{4,}-[01][0-9]-[0-3][0-9](?:Z|[\+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdDate extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "Date"], nativeName || "date");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "object" && value instanceof Date) {
            value = value.toISOString().replace(/T[0-9][0-9]:[0-9][0-9]:[0-9][0-9](?:\.[0-9]+)?/, "");
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!datePattern.test(r)) {
            errors.push(new TypeError("Date is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const timePattern = /^[0-2][0-9]:[0-6][0-9]:[0-6][0-9](?:\.[0-9]+)?(?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdTime extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "Date"], nativeName || "time");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "object" && value instanceof Date) {
            value = value.toISOString().replace(/^[^T]+T/, "");
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!timePattern.test(r)) {
            errors.push(new TypeError("Time is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const dateTimePattern = /^-?[0-9]{4,}-[01][0-9]-[0-3][0-9]T[0-2][0-9]:[0-6][0-9]:[0-6][0-9](?:\.[0-9]+)?(?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdDateTime extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "Date"], nativeName || "dateTime");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "object" && value instanceof Date) {
            value = value.toISOString();
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!dateTimePattern.test(r)) {
            errors.push(new TypeError("dateTime is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const gYearPattern = /^-?[0-9]{4,}(?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdGYear extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "number"], nativeName || "gYear");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "number") {
            value = value.toFixed(0).replace(/^(-?)([0-9]{1,3})$/, (a, n, x) => n + "0000".substring(x.length) + x);
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!gYearPattern.test(r)) {
            errors.push(new TypeError("gYear is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const gYearMonthPattern = /^-?[0-9]{4,}-[0-1][0-9](?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdGYearMonth extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "gYearMonth");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!gYearMonthPattern.test(r)) {
            errors.push(new TypeError("gYearMonth is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const gMonthPattern = /^--[0-1][0-9](?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdGMonth extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "number"], nativeName || "gMonth");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "number") {
            value = "--" + value.toFixed(0).replace(/^[0-9]$/, (x) => "00".substring(x.length) + x);
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!gMonthPattern.test(r)) {
            errors.push(new TypeError("gMonth is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const gMonthDayPattern = /^--[0-1][0-9]-[01][0-9](?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdGMonthDay extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "gMonthDay");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (!facets.whiteSpace) {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!gMonthDayPattern.test(r)) {
            errors.push(new TypeError("gYear is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const gDayPattern = /^---[0-3][0-9](?:Z|[+\-][0-2][0-9]:[0-6][0-9])?$/;
export class XsdGDay extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string", "number"], nativeName || "gDay");
    }

    public processValue(value: any, facets?: IEnumerableFacets) {
        if (typeof value === "number") {
            value = "---" + value.toFixed(0).replace(/^[0-9]$/, (x) => "00".substring(x.length) + x);
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!gDayPattern.test(r)) {
            errors.push(new TypeError("gMonth is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const durationPattern = /^-?P(?:[0-9]+Y)?(?:[0-9]{4,}M)?(?:[0-9]+D)?(?:T(?:[0-9]+H)?(?:[0-9]+M)?(?:[0-9]+(?:\.[0-9]+)?S)?)?$/;
export class XsdDuration extends XsdAnySimpleType {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "duration");
    }

    public processValue(value: any, facets?: IDurationFacets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        } else if (facets.whiteSpace !== "collapse") {
            facets = { ...facets, whiteSpace: "collapse" };
        }
        const r = super.processValue(value, facets);
        if (!durationPattern.test(r)) {
            throw [new TypeError("Duration is of invalid pattern: " + JSON.stringify(r))];
        }

        // TODO: how to get an intuition about ranges (maxInclusive etc)
        /*
        const errors: TypeError[] = [];
        if (!dayTimeDurationPattern.test(r)) {
            errors.push(new TypeError("dayTimeDuration is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        */
        return r;
    }
}

const dayTimeDurationPattern = /^-?P(?:[0-9]+D)?(?:T(?:[0-9]+H)?(?:[0-9]+M)?(?:[0-9]+(?:\.[0-9]+)S)?)?$/;
export class XsdDayTimeDuration extends XsdDuration {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "dayTimeDuration");
    }

    public processValue(value: any, facets?: IDurationFacets) {
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!dayTimeDurationPattern.test(r)) {
            errors.push(new TypeError("dayTimeDuration is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

const yearMonthDurationPattern = /^-?P(?:[0-9]+Y)?(?:[0-9]{4,}M)?$/;
export class XsdYearMonthDuration extends XsdDuration {
    public constructor(tsType: TSType[] | null = null, nativeName: string | null = null) {
        super(tsType || ["string"], nativeName || "yearMonthDuration");
    }

    public processValue(value: any, facets?: IDurationFacets) {
        const r = super.processValue(value, facets);

        const errors: TypeError[] = [];
        if (!yearMonthDurationPattern.test(r)) {
            errors.push(new TypeError("yearMonthDuration is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}

export namespace XsdNativeDataType  {
    const registeredTypes = new Map<string, XsdAnySimpleType>();
    function registerType<T extends XsdAnySimpleType>(type: T): T {
        if (registeredTypes.has(type.nativeName)) {
            throw new Error("Unable to redefine a native datatype: " + type.nativeName);
        } else {
            registeredTypes.set(type.nativeName, type);
        }
        return type;
    }

    export const anySimpleType = registerType(new XsdAnySimpleType());
    // tslint:disable-next-line:variable-name
    export const string = registerType(new XsdString());
    export const normalizedString = registerType(new XsdNormalizedString());
    export const token = registerType(new XsdToken());
    export const language = registerType(new XsdLanguage());
    export const NMTOKEN = registerType(new XsdNMTOKEN());
    export const NMTOKENS = registerType(new XsdNMTOKENS());
    export const name = registerType(new XsdName());
    // tslint:disable-next-line:variable-name
    export const NCName = registerType(new XsdNCName());
    export const ID = registerType(new XsdID());
    export const IDREF = registerType(new XsdIDREF());
    export const IDREFS = registerType(new XsdIDREFS());
    export const ENTITY = registerType(new XsdENTITY());

    export const decimal = registerType(new XsdDecimal());
    export const integer = registerType(new XsdInteger());
    export const nonPositiveInteger = registerType(new XsdNonPositiveInteger());
    export const negativeInteger = registerType(new XsdNegativeInteger());
    export const long = registerType(new XsdLong());
    export const int = registerType(new XsdInt());
    export const short = registerType(new XsdShort());
    export const byte = registerType(new XsdByte());
    export const nonNegativeInteger = registerType(new XsdNonNegativeInteger());
    export const positiveInteger = registerType(new XsdPositiveInteger());
    export const unsignedLong = registerType(new XsdUnsignedLong());
    export const unsignedInt = registerType(new XsdUnsignedInt());
    export const unsignedShort = registerType(new XsdUnsignedShort());
    export const unsignedByte = registerType(new XsdUnsignedByte());

    export const float = registerType(new XsdFloat());
    export const double = registerType(new XsdDouble());

    export const NOTATION = registerType(new XsdNOTATION());
    // tslint:disable-next-line:variable-name
    export const QName = registerType(new XsdQName());
    // tslint:disable-next-line:variable-name
    export const boolean = registerType(new XsdBoolean());
    export const base64Binary = registerType(new XsdBase64Binary());
    export const hexBinary = registerType(new XsdHexBinary());
    export const anyURI = registerType(new XsdAnyURI());

    export const date = registerType(new XsdDate());
    export const time = registerType(new XsdTime());
    export const dateTime = registerType(new XsdDateTime());
    export const gYear = registerType(new XsdGYear());
    export const gYearMonth = registerType(new XsdGYearMonth());
    export const gMonth = registerType(new XsdGMonth());
    export const gMonthDay = registerType(new XsdGMonthDay());
    export const gDay = registerType(new XsdGDay());
    export const duration = registerType(new XsdDuration());
    export const dayTimeDuration = registerType(new XsdDayTimeDuration());
    export const yearMonthDuration = registerType(new XsdYearMonthDuration());

}
