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

            this.getView().byId("bckgImageLandBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/land-texture.jpg"));
            this.getView().byId("bckgImageLandOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/land-texture.jpg"));
            this.getView().byId("bckgImageLandAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/land-texture.jpg"));

            this.getView().byId("bckgImageMountainBefore").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/mountain-texture.jpg"));
            this.getView().byId("bckgImageMountainOn").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/mountain-texture.jpg"));
            this.getView().byId("bckgImageMountainAfter").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/mountain-texture.jpg"));

            this.getView().byId("logoImage").setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/dark-logo.png"));

            this.getView().byId("seeRecyclingMapBox").attachEvent("press", (oEvent) => {
                this.pressSeeMap()
            })

        },

        pressSearchProduct: function (oEvent) {
            this.getRouter().navTo("SearchProduct");
        },
        pressSeeMap: function () {
            this.getRouter().navTo("RecyclingMap");
        }
    });
});
