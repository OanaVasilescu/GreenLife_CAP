sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "greenlife/utils/URLs",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (BaseController, JSONModel, URLs, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {
        onInit: function () {
            sap.ui.getCore().byId("container-webapp---App--app").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture.jpg"))

            this.getView().byId("searchTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("scanTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("paperAndCardboard").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("plasticAndPet").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("electro").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("metalAndAlu").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("glass").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("dangerous").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("automoto").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("constructions").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("wood").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("textile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("others").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("paperTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("cardboardTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("boxesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("bottleTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("bulbsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("batteriesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("mobilesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("largeApplianceTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("smallApplianceTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("zincTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("leadTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("steelTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("stainlessTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("ironTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("brassTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("cansTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("capsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("aerosolTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("aluFoilTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("aluCansTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("glassTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("masksTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("fertilizerTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("herbicidesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("pesticidesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("paintTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("solventTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("medicineTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("windshieldTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("eofTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("oilTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("carBatteriesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("polystyreneTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("demWoodTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("bricksTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("palletsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("sawdustTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("furnitureTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("clothesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("preProdTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("bagsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("shoesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("otherTextilesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("toysTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("organicTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("meshTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("tetraPakTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("foodOilTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("opticTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("waterFiltersTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("absTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("tireTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("petTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));
            this.getView().byId("printerTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/suc-texture-blur.jpg"));


            let detailsTitle = "Search how to recycle your old products" // TODO: move to i18n
            let detailsText = "Not sure where to throw something? Go ahead and search here! Choose whether to go through the categories or just scan the product and see the result." // TODO: move to i18n

            this.getView().setModel(new JSONModel({title: detailsTitle, text: detailsText}), "detailsModel")
            this.getView().setModel(new JSONModel({}), "instructionsModel")
        },

        chooseScanOrSearch: function (oEvent) {
            let isAlreadyChosen = false;
            const wizard = this.getView().byId("recycleProductsWizard");
            oEvent.getSource().getParent().getContent().forEach(el => {
                if (el.hasStyleClass("pressedButton")) {
                    isAlreadyChosen = true
                    el.removeStyleClass("pressedButton")
                }
            })
            oEvent.getSource().addStyleClass("pressedButton");

            if (isAlreadyChosen) {
                wizard.discardProgress(this.byId("introStep"), false);
            }

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            this.goToNextStep(id);

            if (id == "searchTile") {
                let detailsTitle = "Choose category" // TODO: move to i18n
                let detailsText = "What's the product made of? \r\nChoose one of the categories and proceed to the next step." // TODO: move to i18n

                this.getView().getModel("detailsModel").setData({title: detailsTitle, text: detailsText})
            }
        },

        chooseCategory: function (oEvent) {
            let isCatAlreadyChosen = this.clearCategoriesAndReturnIsAlreadyChosen();
            const wizard = this.getView().byId("recycleProductsWizard");
            oEvent.getSource().addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            if (isCatAlreadyChosen) {
                wizard.discardProgress(this.byId("categoriesWizardStep"), false);
            }

            this.goToNextStep(id);

            let detailsTitle = "Choose subcategory" // TODO: move to i18n
            let detailsText = "What's the product made of? \r\nChoose one of the subcategories and proceed to the next step." // TODO: move to i18n

            this.getView().getModel("detailsModel").setData({title: detailsTitle, text: detailsText})
        },

        chooseSubcategory: async function (oEvent) {
            let isCatAlreadyChosen = this.clearSubcategoriesAndReturnIsAlreadyChosen();
            const wizard = this.getView().byId("recycleProductsWizard");
            oEvent.getSource().addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            if (isCatAlreadyChosen) {
                wizard.discardProgress(this.byId("categoriesWizardStep"), false);
            }

            await this.getInstructions(id);
            this.getView().byId("detailsBox").setVisible(false);
            this.getView().byId("instructionsBox").setVisible(true);

            debugger;
        },

        goToNextStep: function (id) {
            const wizard = this.getView().byId("recycleProductsWizard");
            switch (id) {
                case "searchTile":
                    this.byId("introStep").setNextStep(this.getView().byId("categoriesWizardStep"));
                    this.clearCategoriesAndReturnIsAlreadyChosen();
                    break;
                case "scanTile":
                    this.byId("introStep").setNextStep(this.getView().byId("scanStep"));
                    sap.ui.require(["sap/ndc/BarcodeScanner"], function (BarcodeScanner) {
                        BarcodeScanner.scan(function (oResult) { /* handle scan result */
                            this.goToScanResult(oResult);
                        }, function (oError) { /* handle scan error */
                        }, function (oResult) { /* handle input dialog change */
                        });
                    });
                    return;
                case "paperAndCardboard":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("paperAndCardboardStep"));
                    break;
                case "plasticAndPet":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("plasticAndPetStep"));
                    break;
                case "electro":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("electroStep"));
                    break;
                case "metalAndAlu":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("metalAndAluStep"));
                    break;
                case "glass":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("glassStep"));
                    break;
                case "dangerous":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("dangerousStep"));
                    break;
                case "automoto":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("automotoStep"));
                    break;
                case "constructions":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("constructionsStep"));
                    break;
                case "wood":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("woodStep"));
                    break;
                case "textile":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("textileStep"));
                    break;
                case "others":
                    this.byId("categoriesWizardStep").setNextStep(this.getView().byId("othersStep"));
                    break;
            }

            wizard.nextStep();
        },

        clearCategoriesAndReturnIsAlreadyChosen: function () {
            let isCatAlreadyChosen = false
            this.getView().byId("categoriesWizardStep").getContent()[0].getItems().forEach(box => box.getItems().forEach(el => {
                if (el.hasStyleClass("pressedButton")) {
                    isCatAlreadyChosen = true
                    el.removeStyleClass("pressedButton")
                }
            }))
            return isCatAlreadyChosen
        },

        clearSubcategoriesAndReturnIsAlreadyChosen: function () {
            let isCatAlreadyChosen = false
            this.getView().byId("categoriesWizardStep").getContent()[0].getItems().forEach(box => box.getItems().forEach(el => {
                if (el.hasStyleClass("pressedButton")) {
                    isCatAlreadyChosen = true
                    el.removeStyleClass("pressedButton")
                }
            }))
            return isCatAlreadyChosen
        },

        goToScanResult: function (oResult) {
            debugger;
        },

        getInstructions: async function (subcategory) {
            this.get(URLs.getInstructionsBySubcategory(subcategory)).then(instructionsData => {
                debugger
            }).catch(err => {
                this.messageHandler("getInstructionsBySubcategoryError")
            })
        }
    });
});
