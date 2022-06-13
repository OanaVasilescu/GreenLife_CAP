sap.ui.define([], function () {
    "use strict";
    const origin = "https://d14c7732trial-dev-recycling-app-srv.cfapps.us10.hana.ondemand.com";
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
            return userService + getUser;
        },
        getInstructionsBySubcategory: function (subcategory) {
            return userService + getInstructionsBySubcategory + `(subcategory='${subcategory}')`;
        },
        sendMail: function () {
            return userService + sendMail;
        },
        getMapPoints: function () {
            return userService + mapPoints;
        },
        getProducts: function () {
            return userService + products;
        },

        getHistory: function () {
            return userService + getHistory;
        }
    }
});
