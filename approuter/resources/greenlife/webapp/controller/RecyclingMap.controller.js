sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController) {
    "use strict";

    return BaseController.extend("greenlife.controller.RecyclingMap", {
        onInit: function () {
            let isAdmin = this.getOwnerComponent().getModel("userDetailsModel").getProperty("isAdmin");
            this.getView().setModel(new JSONModel({isAdmin: isAdmin}), "userDetailsModel");
        }
    });
});
