(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./attributes", "./collections", "./common", "./contents", "./helpers", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var attributes_1 = require("./attributes");
    exports.XsdAnyAttribute = attributes_1.XsdAnyAttribute;
    exports.XsdAttribute = attributes_1.XsdAttribute;
    exports.XsdAttributeGroup = attributes_1.XsdAttributeGroup;
    var collections_1 = require("./collections");
    exports.XsdAll = collections_1.XsdAll;
    exports.XsdChoice = collections_1.XsdChoice;
    exports.XsdGroup = collections_1.XsdGroup;
    exports.XsdSequence = collections_1.XsdSequence;
    var common_1 = require("./common");
    exports.XsdAny = common_1.XsdAny;
    exports.XsdAnySimpleType = common_1.XsdAnySimpleType;
    exports.XsdComplexType = common_1.XsdComplexType;
    exports.XsdElement = common_1.XsdElement;
    exports.XsdExtension = common_1.XsdExtension;
    exports.XsdList = common_1.XsdList;
    exports.XsdRestriction = common_1.XsdRestriction;
    exports.XsdSimpleType = common_1.XsdSimpleType;
    exports.XsdType = common_1.XsdType;
    exports.XsdUnion = common_1.XsdUnion;
    var contents_1 = require("./contents");
    exports.XsdComplexContent = contents_1.XsdComplexContent;
    exports.XsdOtherContent = contents_1.XsdOtherContent;
    exports.XsdSimpleContent = contents_1.XsdSimpleContent;
    var helpers_1 = require("./helpers");
    exports.XsdAppinfo = helpers_1.XsdAppinfo;
    exports.XsdAnnotable = helpers_1.XsdAnnotable;
    exports.XsdDocumentation = helpers_1.XsdDocumentation;
    var types_1 = require("./types");
    exports.XsdAnyURI = types_1.XsdAnyURI;
    exports.XsdBase64Binary = types_1.XsdBase64Binary;
    exports.XsdBoolean = types_1.XsdBoolean;
    exports.XsdByte = types_1.XsdByte;
    exports.XsdDate = types_1.XsdDate;
    exports.XsdDateTime = types_1.XsdDateTime;
    exports.XsdDayTimeDuration = types_1.XsdDayTimeDuration;
    exports.XsdDecimal = types_1.XsdDecimal;
    exports.XsdDouble = types_1.XsdDouble;
    exports.XsdDuration = types_1.XsdDuration;
    exports.XsdENTITY = types_1.XsdENTITY;
    exports.XsdENTITIES = types_1.XsdENTITIES;
    exports.XsdFloat = types_1.XsdFloat;
    exports.XsdGDay = types_1.XsdGDay;
    exports.XsdGMonth = types_1.XsdGMonth;
    exports.XsdGMonthDay = types_1.XsdGMonthDay;
    exports.XsdGYear = types_1.XsdGYear;
    exports.XsdHexBinary = types_1.XsdHexBinary;
    exports.XsdID = types_1.XsdID;
    exports.XsdIDREF = types_1.XsdIDREF;
    exports.XsdIDREFS = types_1.XsdIDREFS;
    exports.XsdInt = types_1.XsdInt;
    exports.XsdInteger = types_1.XsdInteger;
    exports.XsdLanguage = types_1.XsdLanguage;
    exports.XsdLong = types_1.XsdLong;
    exports.XsdNativeDataType = types_1.XsdNativeDataType;
    exports.XsdNMTOKEN = types_1.XsdNMTOKEN;
    exports.XsdNMTOKENS = types_1.XsdNMTOKENS;
    exports.XsdName = types_1.XsdName;
    exports.XsdNCName = types_1.XsdNCName;
    exports.XsdNegativeInteger = types_1.XsdNegativeInteger;
    exports.XsdNonNegativeInteger = types_1.XsdNonNegativeInteger;
    exports.XsdNonPositiveInteger = types_1.XsdNonPositiveInteger;
    exports.XsdNormalizedString = types_1.XsdNormalizedString;
    exports.XsdNOTATION = types_1.XsdNOTATION;
    exports.XsdPositiveInteger = types_1.XsdPositiveInteger;
    exports.XsdQName = types_1.XsdQName;
    exports.XsdShort = types_1.XsdShort;
    exports.XsdString = types_1.XsdString;
    exports.XsdTime = types_1.XsdTime;
    exports.XsdToken = types_1.XsdToken;
    exports.XsdUnsignedInt = types_1.XsdUnsignedInt;
    exports.XsdUnsignedLong = types_1.XsdUnsignedLong;
    exports.XsdUnsignedShort = types_1.XsdUnsignedShort;
    exports.XsdYearMonthDuration = types_1.XsdYearMonthDuration;
    function parseDocument(docOrElem) {
        return (__syncRequire ? Promise.resolve().then(() => require("./parser")) : new Promise((resolve_1, reject_1) => { require(["./parser"], resolve_1, reject_1); })).then((parser) => parser.parseDocument(docOrElem));
    }
    exports.parseDocument = parseDocument;
    function ParserErrors() {
        return (__syncRequire ? Promise.resolve().then(() => require("./parser")) : new Promise((resolve_2, reject_2) => { require(["./parser"], resolve_2, reject_2); })).then((parser) => parser.ParseError);
    }
    exports.ParserErrors = ParserErrors;
});
//# sourceMappingURL=index.js.map