sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.Report", {
        onInit: function () {
            this.getView().setModel(new JSONModel({logo: "pictures/dark-logo.png"}), "photoModel")
            this.getView().setModel(new JSONModel({isAnonymous: false, isReccuring: false, individuals: false, infoAboutVehicle: false}), "visibilityModel")
            let runningOnPhone = sap.ui.Device.system.phone;
            if (! runningOnPhone) {
                this.getView().byId("formVBox").setWidth("50%");
            }
        }
    });
});
