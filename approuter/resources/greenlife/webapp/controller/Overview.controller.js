sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.Overview", {
        onInit: function () {
            let oRouter = this.getRouter();
            oRouter.getRoute("RouteOverview").attachPatternMatched(this.getUserData, this);
            this.getView().setModel(new JSONModel(), "userDetailsModel");
        },

        pressSearchProduct: function () {
            debugger;
            this.getRouter().navTo("SearchProduct");
        },
        pressSeeMap: function () {
            this.getRouter().navTo("RecyclingMap");
        }
    });
});
