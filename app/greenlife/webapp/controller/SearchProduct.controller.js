sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "greenlife/utils/URLs",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (BaseController, JSONModel, URLs, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {
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
        },

        chooseSubcategory: function (oEvent) {
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

                case "paperTile":
                    break;
                case "cardboardTile":
                    break;
                case "petTile":
                    break;
                case "boxesTile":
                    break;
                case "bottleTile":
                    break;
                case "printerTile":
                    break;
                case "bulbsTile":
                    break;
                case "batteriesTile":
                    break;
                case "mobilesTile":
                    break;
                case "largeApplianceTile":
                    break;
                case "smallApplianceTile":
                    break;
                case "zincTile":
                    break;
                case "leadTile":
                    break;
                case "steelTile":
                    break;
                case "stainlessTile":
                    break;
                case "castTile":
                    break;
                case "ironTile":
                    break;

                case "brassTile":
                    break;
                case "cansTile":
                    break;
                case "capsTile":
                    break;
                case "aerosolTile":
                    break;
                case "aluFoilTile":
                    break;
                case "aluCansTile":
                    break;
                case "glassTile":
                    break;
                case "masksTile":
                    break;
                case "fertilizerTile":
                    break;
                case "herbicidesTile":
                    break;
                case "pesticidesTile":
                    break;
                case "paintTile":
                    break;
                case "solventTile":
                    break;
                case "medicineTile":
                    break;
                case "tireTile":
                    break;
                case "windshieldTile":
                    break;
                case "eofTile":
                    break;
                case "oilTile":
                    break;
                case "carBatteriesTile":
                    break;
                case "polystyreneTile":
                    break;
                case "demWoodTile":
                    break;
                case "bricksTile":
                    break;
                case "palletsTile":
                    break;
                case "sawdustTile":
                    break;
                case "furnitureTile":
                    break;
                case "clothesTile":
                    break;
                case "preProdTile":
                    break;
                case "bagsTile":
                    break;
                case "shoesTile":
                    break;
                case "otherTextilesTile":
                    break;
                case "toysTile":
                    break;
                case "organicTile":
                    break;
                case "meshTile":
                    break;
                case "tetraPakTile":
                    break;
                case "foodOilTile":
                    break;
                case "opticTile":
                    break;
                case "waterFiltersTile":
                    break;
                case "absTile":
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

        goToScanResult: function (oResult) {
            debugger;
        }
    });
});
