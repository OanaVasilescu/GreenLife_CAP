sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.Overview", {
        onInit: function () {
            this.getView().byId("bckgImage").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-background.jpg"));

            this.getView().byId("bckgImagePlantBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/plant-texture.jpg"));
            this.getView().byId("bckgImagePlantAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/plant-texture.jpg"));
            this.getView().byId("bckgImagePlantSmallOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/plant-texture.jpg"));


            this.getView().byId("bckgImageWaterBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-texture.jpg"));
            this.getView().byId("bckgImageWaterOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-texture.jpg"));
            this.getView().byId("bckgImageWaterAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/water-texture.jpg"));

            this.getView().byId("logoImage").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/dark-logo.png"));
        },

        pressSearchProduct: function () {
            this.getRouter().navTo("SearchProduct");
        },
        pressSeeMap: function () {
            this.getRouter().navTo("RecyclingMap");
        }
    });
});
