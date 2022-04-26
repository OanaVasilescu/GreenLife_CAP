sap.ui.define([], function () {
    "use strict";
    const origin = "http://localhost:4004";
    const adminService = "/admin";
    const userService = "/greenlife";
    const products = "/Products";
    const slash = "/";
    // const cat = "/cat";
    const expandAllProduct = "?&$expand=components($expand=component($expand=productMaterialCode($expand=bin),productType))";
    const getUser = "/getUserData()";
    return {
        getAllProducts: function () {
            return userService + products;
        },
        getProductWithInstructions: function (productId) {
            return userService + products + slash + productId + expandAllProduct;
        },
        getUser: function () {
            return userService + getUser;
        },
        getInstructionsBySubcategory: function (subcategory) {
            return userService + products + slash + subcategory;
        }
    }
});
