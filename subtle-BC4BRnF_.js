//# allFunctionsCalledOnLoad
//#region src/lib/crypto/subtle.ts
var subtle = typeof window !== "undefined" && "crypto" in window ? window.crypto.subtle : self.crypto.subtle;
//#endregion
export { subtle as t };
