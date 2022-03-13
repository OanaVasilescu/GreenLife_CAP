sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController) {
    "use strict";

    return BaseController.extend("greenlife.controller.Overview", {
        pressSearchProduct: function () {
            this.getRouter().navTo("SearchProduct");
        },
        pressSeeMap: function () {
            this.getRouter().navTo("RecyclingMap");
        }
    });
});
