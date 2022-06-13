sap.ui.define([], function () {
    "use strict";
    const origin = "https://d14c7732trial.launchpad.cfapps.us10.hana.ondemand.com/5f6fcd7a-e8d2-412c-8fb0-3df8906d3120.glcloud.greenlife/~130622104223+0000~";
    const userService = "/greenlife";
    const products = "/Products";
    const generalProducts = "/GeneralProducts";
    const slash = "/";
    const getInstructionsBySubcategory = "/getInstructionsBySubcategory";
    const expandAllProduct = "?&$expand=components($expand=component($expand=productMaterialCode($expand=bin),productType))";
    const getUser = "/getUserData()";
    const sendMail = "/sendMail()";
    const mapPoints = "/MapPoints";
    const getHistory = "/getHistory()"

    return {
        getUser: function () {
            return origin + userService + getUser;
        },
        getInstructionsBySubcategory: function (subcategory) {
            return origin + userService + getInstructionsBySubcategory + `(subcategory='${subcategory}')`;
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

        getHistory: function () {
            return origin + userService + getHistory;
        }
    }
});
