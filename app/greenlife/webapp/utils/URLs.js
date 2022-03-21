sap.ui.define([], function () {
    "use strict";
    const origin = "http://localhost:4004";
    const adminService = "/admin";
    const userService = "/greenlife";
    const products = "/Products";
    return {
        getAllProducts: function () {
            return origin + userService + products;
        }
    }
});
