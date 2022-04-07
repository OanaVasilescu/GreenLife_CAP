sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "greenlife/utils/URLs",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (BaseController, JSONModel, URLs, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {

        chooseCategory: function (oEvent) {
            let isCatAlreadyChosen = false;
            const wizard = this.getView().byId("recycleProductsWizard");

            oEvent.getSource().getParent().getParent().getItems().forEach(box => box.getItems().forEach(el => {
                if (el.hasStyleClass("pressedButton")) {
                    isCatAlreadyChosen = true
                    el.removeStyleClass("pressedButton")
                }
            }))
            oEvent.getSource().addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            if (isCatAlreadyChosen) {
                wizard.discardProgress(this.byId("categoriesWizardStep"), false);
            }

            switch (id) {
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

        }
    });
});
