import { XsdAnySimpleType, } from "./common";
export class XsdString extends XsdAnySimpleType {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "string");
    }
    processValue(value, facets) {
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "normalizedString");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { whiteSpace: "replace" };
        }
        else if (!facets.whiteSpace) {
            facets = Object.assign({}, facets, { whiteSpace: "replace" });
        }
        return super.processValue(value, facets);
    }
}
export class XsdToken extends XsdNormalizedString {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "token");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        return super.processValue(value, facets);
    }
}
const languagePattern = /^[a-zA-Z]{1,8}(?:-[a-zA-Z0-9]{1,8})*$/;
export class XsdLanguage extends XsdToken {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "language");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: languagePattern };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: languagePattern });
        }
        return super.processValue(value, facets);
    }
}
// tslint:disable-next-line:variable-name
const NMTOKENPattern = /^[a-zA-Z0-9_:\-\.]+$/;
export class XsdNMTOKEN extends XsdToken {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "NMTOKEN");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: NMTOKENPattern };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: NMTOKENPattern });
        }
        return super.processValue(value, facets);
    }
}
// tslint:disable-next-line:variable-name
const NMTOKENSPattern = /^[a-zA-Z0-9_:\-\.]+(?: [a-zA-Z0-9_:\-\.]+)*$/;
// TODO: XsdList
export class XsdNMTOKENS extends XsdToken {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "NMTOKENS");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: NMTOKENSPattern };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: NMTOKENSPattern });
        }
        return super.processValue(value, facets);
    }
}
const namePattern = /^[a-zA-Z_:][a-zA-Z0-9_:\-\.]*$/;
export class XsdName extends XsdToken {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "name");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: namePattern };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: namePattern });
        }
        return super.processValue(value, facets);
    }
}
export class XsdNCName extends XsdName {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "NCName");
    }
    processValue(value, facets) {
        const r = super.processValue(value, facets);
        if (r.indexOf(":") !== -1) {
            throw [new TypeError("Value " + JSON.stringify(r) + " (inherits from NCName) may not contain a colon (':').")];
        }
        return r;
    }
}
export class XsdID extends XsdNCName {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "ID");
    }
}
export class XsdIDREF extends XsdNCName {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "IDREF");
    }
}
const idrefsPattern = /^[a-zA-Z_:][a-zA-Z0-9_:\-\.]*(?: [a-zA-Z_:][a-zA-Z0-9_:\-\.]*)*$/;
// TODO: XsdList
export class XsdIDREFS extends XsdIDREF {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "IDREFS");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: idrefsPattern };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: idrefsPattern });
        }
        return super.processValue(value, facets);
    }
}
export class XsdENTITY extends XsdNCName {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "ENTITY");
    }
}
const entitiesPattern = idrefsPattern;
// TODO: XsdList
export class XsdENTITIES extends XsdIDREF {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "ENTITIES");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: entitiesPattern };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: entitiesPattern });
        }
        return super.processValue(value, facets);
    }
}
const decimalPattern = /^[-\+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/;
export class XsdDecimal extends XsdAnySimpleType {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "number"], nativeName || "decimal");
    }
    processValue(value, facets) {
        if (typeof value === "number") {
            if (typeof facets.fractionDigits === "number") {
                value = value.toFixed(facets.fractionDigits);
            }
            else {
                value = value.toString();
            }
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        if (!decimalPattern.test(r)) {
            throw [new TypeError("A decimal type needs to be a number (N|N.|N.N|.N).")];
        }
        const n = parseFloat(r);
        const errors = [];
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
            }
            else {
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
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "integer");
    }
    processValue(value, facets) {
        if (typeof value === "number" && !Number.isSafeInteger(value)) {
            throw [new TypeError("The value " + JSON.stringify(value) + " is not a safe integer in this ES implementation.")];
        }
        if (!facets) {
            facets = { pattern: integerPattern, fractionDigits: 0 };
        }
        else if (!facets.pattern) {
            facets = Object.assign({}, facets, { pattern: integerPattern, fractionDigits: 0 });
        }
        else {
            facets = Object.assign({}, facets, { fractionDigits: 0 });
        }
        return super.processValue(value, facets);
    }
}
export class XsdNonPositiveInteger extends XsdDecimal {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "nonPositiveInteger");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 0 };
        }
        else if (!facets.maxInclusive) {
            facets = Object.assign({}, facets, { maxInclusive: 0 });
        }
        return super.processValue(value, facets);
    }
}
export class XsdNegativeInteger extends XsdNonPositiveInteger {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "negativeInteger");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: -1 };
        }
        else if (!facets.maxInclusive) {
            facets = Object.assign({}, facets, { maxInclusive: -1 });
        }
        return super.processValue(value, facets);
    }
}
const longMax = Math.min(Number.MAX_SAFE_INTEGER, 9223372036854775807);
const longMin = Math.max(-9223372036854775808, Number.MIN_SAFE_INTEGER);
export class XsdLong extends XsdDecimal {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "long");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: longMax, minInclusive: longMin };
        }
        else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = Object.assign({}, facets, { maxInclusive: longMax });
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = Object.assign({}, facets, { minInclusive: longMin });
            }
        }
        return super.processValue(value, facets);
    }
}
export class XsdInt extends XsdLong {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "int");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 2147483647, minInclusive: -2147483648 };
        }
        else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = Object.assign({}, facets, { maxInclusive: 2147483647 });
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = Object.assign({}, facets, { minInclusive: -2147483648 });
            }
        }
        return super.processValue(value, facets);
    }
}
export class XsdShort extends XsdInt {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "short");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 32767, minInclusive: -32768 };
        }
        else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = Object.assign({}, facets, { maxInclusive: 32767 });
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = Object.assign({}, facets, { minInclusive: -32768 });
            }
        }
        return super.processValue(value, facets);
    }
}
export class XsdByte extends XsdShort {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "byte");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 127, minInclusive: -128 };
        }
        else {
            if (typeof facets.maxInclusive === "undefined") {
                facets = Object.assign({}, facets, { maxInclusive: 127 });
            }
            if (typeof facets.minInclusive === "undefined") {
                facets = Object.assign({}, facets, { minInclusive: -128 });
            }
        }
        return super.processValue(value, facets);
    }
}
export class XsdNonNegativeInteger extends XsdDecimal {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "nonNegativeInteger");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { minInclusive: 0 };
        }
        else if (!facets.minInclusive) {
            facets = Object.assign({}, facets, { minInclusive: 0 });
        }
        return super.processValue(value, facets);
    }
}
export class XsdPositiveInteger extends XsdNonNegativeInteger {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "positiveInteger");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { minInclusive: 1 };
        }
        else if (!facets.minInclusive) {
            facets = Object.assign({}, facets, { minInclusive: 1 });
        }
        return super.processValue(value, facets);
    }
}
const unsignedLongMax = Math.min(18446744073709551615, Number.MAX_SAFE_INTEGER);
export class XsdUnsignedLong extends XsdNonNegativeInteger {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "unsignedLong");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: unsignedLongMax };
        }
        else if (!facets.minInclusive) {
            facets = Object.assign({}, facets, { maxInclusive: unsignedLongMax });
        }
        return super.processValue(value, facets);
    }
}
export class XsdUnsignedInt extends XsdUnsignedLong {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "unsignedInt");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 4294967295 };
        }
        else if (!facets.minInclusive) {
            facets = Object.assign({}, facets, { maxInclusive: 4294967295 });
        }
        return super.processValue(value, facets);
    }
}
export class XsdUnsignedShort extends XsdUnsignedInt {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "unsignedShort");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 65535 };
        }
        else if (!facets.maxInclusive) {
            facets = Object.assign({}, facets, { maxInclusive: 65535 });
        }
        return super.processValue(value, facets);
    }
}
export class XsdUnsignedByte extends XsdUnsignedShort {
    constructor(tsType = null, nativeName = null) {
        super(tsType, nativeName || "unsignedByte");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { maxInclusive: 255 };
        }
        else if (!facets.maxInclusive) {
            facets = Object.assign({}, facets, { maxInclusive: 255 });
        }
        return super.processValue(value, facets);
    }
}
const doublePattern = /^[-\+]?(?:([0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][0-9]+)?|INF|NaN)$/;
export class XsdFloat extends XsdAnySimpleType {
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "number"], nativeName || "float");
    }
    processValue(value, facets) {
        if (typeof value === "number") {
            if (value === Number.POSITIVE_INFINITY) {
                value = "INF";
            }
            else if (value === Number.NEGATIVE_INFINITY) {
                value = "-INF";
            }
            else {
                value = value.toExponential();
            }
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        if (!doublePattern.test(r)) {
            throw [new TypeError("A decimal type needs to be a number (N|N.|N.N|.N|Ne-N|NEN|INF|-INF|NaN).")];
        }
        const n = r === "INF" ? Number.POSITIVE_INFINITY
            : r === "-INF" ? Number.NEGATIVE_INFINITY
                : r === "NaN" ? Number.NaN
                    : parseFloat(r);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "number"], nativeName || "double");
    }
    processValue(value, facets) {
        if (typeof value === "number") {
            if (value === Number.POSITIVE_INFINITY) {
                value = "INF";
            }
            else if (value === Number.NEGATIVE_INFINITY) {
                value = "-INF";
            }
            else {
                value = value.toExponential();
            }
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        if (!doublePattern.test(r)) {
            throw [new TypeError("A decimal type needs to be a number (N|N.|N.N|.N|Ne-N|NEN|INF|-INF|NaN).")];
        }
        const n = r === "INF" ? Number.POSITIVE_INFINITY
            : r === "-INF" ? Number.NEGATIVE_INFINITY
                : r === "NaN" ? Number.NaN
                    : parseFloat(r);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "NOTATION");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: namePattern, whiteSpace: "collapse" };
        }
        else {
            if (!facets.pattern) {
                facets = Object.assign({}, facets, { pattern: namePattern });
            }
            if (facets.whiteSpace !== "collapse") {
                facets = Object.assign({}, facets, { whiteSpace: "collapse" });
            }
        }
        const r = super.processValue(value, facets);
        const errors = [];
        const cpos = r.indexOf(":");
        if (cpos !== -1) {
            if (cpos === 0) {
                errors.push(new TypeError("A NOTATION must not start with a colon (:)"));
            }
            else if (r.lastIndexOf(":") !== cpos) {
                errors.push(new TypeError("A NOTATION must not contain multiple colons (:)"));
            }
            else if (!namePattern.test(r.substring(cpos + 1))) {
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "QName");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { pattern: namePattern, whiteSpace: "collapse" };
        }
        else {
            if (!facets.pattern) {
                facets = Object.assign({}, facets, { pattern: namePattern });
            }
            if (facets.whiteSpace !== "collapse") {
                facets = Object.assign({}, facets, { whiteSpace: "collapse" });
            }
        }
        const r = super.processValue(value, facets);
        const errors = [];
        const cpos = r.indexOf(":");
        if (cpos !== -1) {
            if (cpos === 0) {
                errors.push(new TypeError("A QName must not start with a colon (:)"));
            }
            else if (r.lastIndexOf(":") !== cpos) {
                errors.push(new TypeError("A QName must not contain multiple colons (:)"));
            }
            else if (!namePattern.test(r.substring(cpos + 1))) {
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "boolean"], nativeName || "boolean");
    }
    processValue(value, facets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "base64Binary");
    }
    processValue(value, facets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const r2 = r.replace(/\s/g, "");
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "hexBinary");
    }
    processValue(value, facets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const r2 = r.replace(/\s/g, "");
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "anyURI");
    }
    processValue(value, facets) {
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "Date"], nativeName || "date");
    }
    processValue(value, facets) {
        if (typeof value === "object" && value instanceof Date) {
            value = value.toISOString().replace(/T[0-9][0-9]:[0-9][0-9]:[0-9][0-9](?:\.[0-9]+)?/, "");
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "Date"], nativeName || "time");
    }
    processValue(value, facets) {
        if (typeof value === "object" && value instanceof Date) {
            value = value.toISOString().replace(/^[^T]+T/, "");
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "Date"], nativeName || "dateTime");
    }
    processValue(value, facets) {
        if (typeof value === "object" && value instanceof Date) {
            value = value.toISOString();
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "number"], nativeName || "gYear");
    }
    processValue(value, facets) {
        if (typeof value === "number") {
            value = value.toFixed(0).replace(/^(-?)([0-9]{1,3})$/, (a, n, x) => n + "0000".substring(x.length) + x);
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "gYearMonth");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "number"], nativeName || "gMonth");
    }
    processValue(value, facets) {
        if (typeof value === "number") {
            value = "--" + value.toFixed(0).replace(/^[0-9]$/, (x) => "00".substring(x.length) + x);
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "gMonthDay");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (!facets.whiteSpace) {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string", "number"], nativeName || "gDay");
    }
    processValue(value, facets) {
        if (typeof value === "number") {
            value = "---" + value.toFixed(0).replace(/^[0-9]$/, (x) => "00".substring(x.length) + x);
        }
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
        }
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "duration");
    }
    processValue(value, facets) {
        if (!facets) {
            facets = { whiteSpace: "collapse" };
        }
        else if (facets.whiteSpace !== "collapse") {
            facets = Object.assign({}, facets, { whiteSpace: "collapse" });
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "dayTimeDuration");
    }
    processValue(value, facets) {
        const r = super.processValue(value, facets);
        const errors = [];
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
    constructor(tsType = null, nativeName = null) {
        super(tsType || ["string"], nativeName || "yearMonthDuration");
    }
    processValue(value, facets) {
        const r = super.processValue(value, facets);
        const errors = [];
        if (!yearMonthDurationPattern.test(r)) {
            errors.push(new TypeError("yearMonthDuration is of invalid pattern: " + JSON.stringify(r)));
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return r;
    }
}
export var XsdNativeDataType;
(function (XsdNativeDataType) {
    const registeredTypes = new Map();
    function registerType(type) {
        if (registeredTypes.has(type.nativeName)) {
            throw new Error("Unable to redefine a native datatype: " + type.nativeName);
        }
        else {
            registeredTypes.set(type.nativeName, type);
        }
        return type;
    }
    XsdNativeDataType.anySimpleType = registerType(new XsdAnySimpleType());
    // tslint:disable-next-line:variable-name
    XsdNativeDataType.string = registerType(new XsdString());
    XsdNativeDataType.normalizedString = registerType(new XsdNormalizedString());
    XsdNativeDataType.token = registerType(new XsdToken());
    XsdNativeDataType.language = registerType(new XsdLanguage());
    XsdNativeDataType.NMTOKEN = registerType(new XsdNMTOKEN());
    XsdNativeDataType.NMTOKENS = registerType(new XsdNMTOKENS());
    XsdNativeDataType.name = registerType(new XsdName());
    // tslint:disable-next-line:variable-name
    XsdNativeDataType.NCName = registerType(new XsdNCName());
    XsdNativeDataType.ID = registerType(new XsdID());
    XsdNativeDataType.IDREF = registerType(new XsdIDREF());
    XsdNativeDataType.IDREFS = registerType(new XsdIDREFS());
    XsdNativeDataType.ENTITY = registerType(new XsdENTITY());
    XsdNativeDataType.decimal = registerType(new XsdDecimal());
    XsdNativeDataType.integer = registerType(new XsdInteger());
    XsdNativeDataType.nonPositiveInteger = registerType(new XsdNonPositiveInteger());
    XsdNativeDataType.negativeInteger = registerType(new XsdNegativeInteger());
    XsdNativeDataType.long = registerType(new XsdLong());
    XsdNativeDataType.int = registerType(new XsdInt());
    XsdNativeDataType.short = registerType(new XsdShort());
    XsdNativeDataType.byte = registerType(new XsdByte());
    XsdNativeDataType.nonNegativeInteger = registerType(new XsdNonNegativeInteger());
    XsdNativeDataType.positiveInteger = registerType(new XsdPositiveInteger());
    XsdNativeDataType.unsignedLong = registerType(new XsdUnsignedLong());
    XsdNativeDataType.unsignedInt = registerType(new XsdUnsignedInt());
    XsdNativeDataType.unsignedShort = registerType(new XsdUnsignedShort());
    XsdNativeDataType.unsignedByte = registerType(new XsdUnsignedByte());
    XsdNativeDataType.float = registerType(new XsdFloat());
    XsdNativeDataType.double = registerType(new XsdDouble());
    XsdNativeDataType.NOTATION = registerType(new XsdNOTATION());
    // tslint:disable-next-line:variable-name
    XsdNativeDataType.QName = registerType(new XsdQName());
    // tslint:disable-next-line:variable-name
    XsdNativeDataType.boolean = registerType(new XsdBoolean());
    XsdNativeDataType.base64Binary = registerType(new XsdBase64Binary());
    XsdNativeDataType.hexBinary = registerType(new XsdHexBinary());
    XsdNativeDataType.anyURI = registerType(new XsdAnyURI());
    XsdNativeDataType.date = registerType(new XsdDate());
    XsdNativeDataType.time = registerType(new XsdTime());
    XsdNativeDataType.dateTime = registerType(new XsdDateTime());
    XsdNativeDataType.gYear = registerType(new XsdGYear());
    XsdNativeDataType.gYearMonth = registerType(new XsdGYearMonth());
    XsdNativeDataType.gMonth = registerType(new XsdGMonth());
    XsdNativeDataType.gMonthDay = registerType(new XsdGMonthDay());
    XsdNativeDataType.gDay = registerType(new XsdGDay());
    XsdNativeDataType.duration = registerType(new XsdDuration());
    XsdNativeDataType.dayTimeDuration = registerType(new XsdDayTimeDuration());
    XsdNativeDataType.yearMonthDuration = registerType(new XsdYearMonthDuration());
})(XsdNativeDataType || (XsdNativeDataType = {}));
//# sourceMappingURL=types.js.map