sap.ui.define([], function () {
    "use strict";
    const origin = "https://d14c7732trial.launchpad.cfapps.us10.hana.ondemand.com/566b1475-e1f8-4eff-b352-455dab32bb7e.glcloud.greenlife/~180622143646+0000~";
    // const origin = "http://localhost:4004"
    const userService = "/greenlife";
    const products = "/Products";
    const expandProduct = "?&$expand=parent"
    const generalProducts = "/GeneralProducts";
    const slash = "/";
    const getInstructionsBySubcategory = "/getInstructionsBySubcategory";
    const expandAllProduct = "?&$expand=components($expand=component($expand=productMaterialCode($expand=bin),productType))";
    const getUser = "/getUserData()";
    const sendMail = "/sendMail";
    const mapPoints = "/MapPoints";
    const getHistory = "/getHistory()"
    const getSubmissions = "/getSubmissions()"
    const expandTexts = "?&$expand=texts";

    const romanianExtension = '?&sap-language=ro';

    return {
        getUser: function () {
            return origin + userService + getUser;
        },
        getInstructionsBySubcategory: function (subcategory, locale) {
            return origin + userService + getInstructionsBySubcategory + `(subcategory='${subcategory}',locale='${locale}')`;
        },
        sendMail: function () {
            return origin + userService + sendMail;
        },
        getMapPoints: function () {
            return origin + userService + mapPoints;
        },
        getProducts: function () {
            return origin + userService + products;
        },

        getExpandedProduct: function () {
            return origin + userService + products + expandProduct;
        },

        getHistory: function () {
            return origin + userService + getHistory;
        },

        getSubmissions: function () {
            return origin + userService + getSubmissions;
        },

        getGeneralProduct: function () {
            return origin + userService + generalProducts;
        },

        getGeneralProductWithTranslation: function () {
            return origin + userService + generalProducts + expandTexts;
        },

        getIDfromCat: function (subcategory) {
            return origin + userService + `/getIDfromCat(subcategory='${subcategory}')`;
        }
    }
});
