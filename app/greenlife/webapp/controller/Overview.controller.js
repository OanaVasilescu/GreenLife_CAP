sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.Overview", {
        onInit: function () {
            this.getView().setModel(new JSONModel({succulent: "https://images.unsplash.com/flagged/photo-1568005242833-d0f5f61da402?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80", file: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80"}), "photoModel")
            this.getView().byId("bckgImage").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-background.jpg"));

            this.getView().byId("bckgImagePlantBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/plant-texture.jpg"));
            this.getView().byId("bckgImagePlantAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/plant-texture.jpg"));
            this.getView().byId("bckgImagePlantSmallOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/plant-texture.jpg"));


            this.getView().byId("bckgImageWaterBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-texture.jpg"));
            this.getView().byId("bckgImageWaterOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-texture.jpg"));
            this.getView().byId("bckgImageWaterAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-texture.jpg"));

            // this.getView().byId("bckgImageLandBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/land-texture.jpg"));
            // this.getView().byId("bckgImageLandOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/land-texture.jpg"));
            // this.getView().byId("bckgImageLandAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/land-texture.jpg"));

            this.getView().byId("bckgImageMountainBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/mountain-texture.jpg"));
            this.getView().byId("bckgImageMountainOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/mountain-texture.jpg"));
            this.getView().byId("bckgImageMountainAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/mountain-texture.jpg"));

            this.getView().byId("logoImage").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/dark-logo.png"));

            this.getView().byId("seeRecyclingMapBox").attachEvent("press", (oEvent) => {
                this.pressSeeMap()
            })

            let runningOnPhone = sap.ui.Device.system.phone;
            if (runningOnPhone) {
                this.getView().byId("mobilePage").setVisible(true);
                this.getView().byId("webPage").setVisible(false);
            } else {
                this.getView().byId("mobilePage").setVisible(false);
                this.getView().byId("webPage").setVisible(true);
            }
        },

        pressSearchProduct: function (oEvent) {
            this.getRouter().navTo("SearchProduct");
        },

        pressSeeMap: function () {
            this.getRouter().navTo("RecyclingMap");
        },

        pressReport: function () {
            this.getRouter().navTo("Report");
        },

        pressSubmitData: function () {
            this.getRouter().navTo("Submit");
        }
    });
});
