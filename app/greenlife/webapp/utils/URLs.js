sap.ui.define([], function () {
    "use strict";
    const origin = "http://localhost:4004";
    const userService = "/greenlife";
    const products = "/Products";
    const generalProducts = "/GeneralProducts";
    const slash = "/";
    const getInstructionsBySubcategory = "/getInstructionsBySubcategory";
    const expandAllProduct = "?&$expand=components($expand=component($expand=productMaterialCode($expand=bin),productType))";
    const getUser = "/getUserData()";
    const sendMail = "/sendMail()"
    return {
        getUser: function () {
            return userService + getUser;
        },
        getInstructionsBySubcategory: function (subcategory) {
            return userService + getInstructionsBySubcategory + `(subcategory='${subcategory}')`;
        },
        sendMail: function () {
            return userService + sendMail;
        }
    }
});
