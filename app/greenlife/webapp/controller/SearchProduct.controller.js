sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs"

], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {

        onInit: function () {
            sap.ui.getCore().byId("container-webapp---App--app").setBackgroundImage("https://images.unsplash.com/photo-1530177150700-84cd9a3b059b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80")

            this.getView().setModel(new JSONModel({backgroundPicture: "https://images.unsplash.com/photo-1530177150700-84cd9a3b059b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"}), "pictureModel")
            this.getView().setModel(new JSONModel({latestSubcategory: null, latestCategory: null, choice: null}), "chosenModel");
        },

        onBeforeRendering: function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.getView().setModel(new JSONModel({title: oResourceBundle.getText("detailsTitle"), text: oResourceBundle.getText("detailsText")}), "detailsModel")
            this.getView().setModel(new JSONModel({
                howToCollectTitle: "<strong>" + oResourceBundle.getText("howToCollectTitle") + "</strong>",
                restrictionsTitle: "<strong>" + oResourceBundle.getText("restrictionsTitle") + "</strong>",
                howToRecycleTitle: "<strong>" + oResourceBundle.getText("howToRecycleTitle") + "</strong>"
            }), "instructionsModel")
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
            let latestCategory = this.getView().getModel("chosenModel").getProperty("/latestCategory");
            let isCatAlreadyChosen = false;
            if (latestCategory != null) {
                latestCategory.removeStyleClass("pressedButton");
                isCatAlreadyChosen = true;
            }
            latestCategory = oEvent.getSource();


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
            let latestSubcategory = this.getView().getModel("chosenModel").getProperty("/latestSubcategory");
            let isSubcatAlreadyChosen = false;
            if (latestSubcategory != null) {
                latestSubcategory.removeStyleClass("pressedButton");
                isSubcatAlreadyChosen = true;
            }
            latestSubcategory = oEvent.getSource();


            let wizardStepId = oEvent.getSource().getParent().sId;
            const wizard = this.getView().byId("recycleProductsWizard");
            oEvent.getSource().addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            if (isSubcatAlreadyChosen) {
                wizard.discardProgress(this.byId(wizardStepId), false);
            }

            let instructionsData = await this.getInstructions(id);

            let instr = instructionsData.value[0];
            if (instr != undefined) {
                this.setInstructions(instr);
            }

            this.setPicture(id);

            this.getView().byId("recycleProductsWizard").setVisible(false);
            this.getView().byId("detailsBox").setVisible(false);

            this.getView().byId("instructionsBox").setVisible(true);
            this.getView().byId("pictureBox").setVisible(true);
        },

        goToNextStep: function (id) {
            const wizard = this.getView().byId("recycleProductsWizard");
            let choice = this.getView().getModel("chosenModel").getProperty("/choice");
            let latestCategory = this.getView().getModel("chosenModel").getProperty("/choice");
            let latestSubcategory = this.getView().getModel("chosenModel").getProperty("/choice");

            switch (id) {
                case "searchTile":
                    this.byId("introStep").setNextStep(this.getView().byId("categoriesWizardStep"));
                    if (choice != null) {
                        choice.removeStyleClass("pressedButton");
                    }
                    if (latestCategory != null) {
                        latestCategory.removeStyleClass("pressedButton");
                    }
                    if (latestSubcategory != null) {
                        latestSubcategory.removeStyleClass("pressedButton");
                    }
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

        setPicture: function (id) {
            debugger
            let picture = this.getView().byId("pictureBox");

            picture.addStyleClass(id);
            picture.addStyleClass("coverTile");
        },

        goToScanResult: function (oResult) {
            debugger;
        },

        setInstructions: function (instr) {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();


            if (instr.howToCollect != undefined) {
                let collect = instr.howToCollect.replaceAll('\\\\n', '\n');
                this.getView().getModel("instructionsModel").setProperty("/howToCollect", collect);
            } else {
                let noKnownCollect = oResourceBundle.getText("noKnownCollect")
                this.getView().getModel("instructionsModel").setProperty("/howToCollect", noKnownCollect);
            }

            if (instr.recyclingInstructions != undefined) {
                let instructions = instr.recyclingInstructions.replaceAll('\\\\n', '\n');
                this.getView().getModel("instructionsModel").setProperty("/howToRecycle", instructions);
            } else {
                let noKnownRecycle = oResourceBundle.getText("noKnownRecycle")
                this.getView().getModel("instructionsModel").setProperty("/howToRecycle", noKnownRecycle);
            }

            if (instr.recyclingRestrictions != undefined) {
                let restrictions = instr.recyclingRestrictions.replaceAll('\\\\n', '\n')
                this.getView().getModel("instructionsModel").setProperty("/restrictions", restrictions);
            } else {
                let noKnownRestriction = oResourceBundle.getText("noKnownRestriction")
                this.getView().getModel("instructionsModel").setProperty("/restrictions", noKnownRestriction);
            }

            this.getView().getModel("instructionsModel").setProperty("/title", instr.name);
        },


        getInstructions: async function (subcategory) {
            return await this.get(URLs.getInstructionsBySubcategory(subcategory)).then(async instructionsData => {
                return instructionsData;
            }).catch(err => {
                this.messageHandler("getInstructionsBySubcategoryError")
            })
        },

        handleWizardCancel: async function () {
            debugger;
            this.getView().getModel("chosenModel").setProperty("/latestSubcategory", null);
            this.getView().getModel("chosenModel").setProperty("/latestCategory", null);
            this.getRouter().navTo("Overview");
        }

    });
});
