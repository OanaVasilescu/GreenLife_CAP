sap.ui.define([], function () {
    "use strict";
    const adminService = "/admin";
    const userService = "greenlife";
    const products = "/Products";
    return {
        getAllProducts: function () {
            return userService + products;
        }
    }
});
