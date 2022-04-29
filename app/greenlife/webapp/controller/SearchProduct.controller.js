sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs"

], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {

        onInit: function () {
            sap.ui.getCore().byId("container-webapp---App--app").setBackgroundImage("https://images.unsplash.com/photo-1550353127-b0da3aeaa0ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80")

            this.getView().setModel(new JSONModel({backgroundPicture: "https://images.unsplash.com/photo-1550353127-b0da3aeaa0ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"}), "pictureModel")
            this.getView().setModel(new JSONModel({latestSubcategory: null, latestCategory: null, choice: null, currentlyPressed: null}), "chosenModel");

            this.getRouter().getRoute("SearchProduct").attachMatched(this.restartChoiceSteps, this);
        },

        onBeforeRendering: function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.getView().setModel(new JSONModel({title: oResourceBundle.getText("detailsTitle"), text: oResourceBundle.getText("detailsText")}), "detailsModel")
            this.getView().setModel(new JSONModel({
                howToCollectTitle: '<strong style="font-size:30px">' + oResourceBundle.getText("howToCollectTitle") + "</strong>",
                restrictionsTitle: '<strong style="font-size:30px">' + oResourceBundle.getText("restrictionsTitle") + "</strong>",
                howToRecycleTitle: '<strong style="font-size:30px">' + oResourceBundle.getText("howToRecycleTitle") + "</strong>"
            }), "instructionsModel")
        },

        chooseScanOrSearch: function (oEvent) {
            this.restartChoiceSteps();
            oEvent.getSource().addStyleClass("pressedButton");

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
            this.discardCategoryStep();
            let latestCategory = oEvent.getSource();
            this.getView().getModel("chosenModel").setProperty("/latestCategory", latestCategory);

            oEvent.getSource().addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);

            this.goToNextStep(id);

            let detailsTitle = "Choose subcategory" // TODO: move to i18n
            let detailsText = "What's the product made of? \r\nChoose one of the subcategories and proceed to the next step." // TODO: move to i18n

            this.getView().getModel("detailsModel").setData({title: detailsTitle, text: detailsText})
        },

        chooseSubcategory: async function (oEvent) {
            debugger
            this.discardSubcategoryStep(oEvent);

            let latestSubcategory = oEvent.getSource();
            this.getView().getModel("chosenModel").setProperty("/latestSubcategory", latestSubcategory);
            debugger;
            oEvent.getSource().addStyleClass("pressedButton");


            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            let instructionsData = await this.getInstructions(id);


            let instr = instructionsData.value[0];
            if (instr != undefined) {
                this.setInstructions(instr);
            }

            this.setPicture(id);

            this.goToNextStep(id);
        },

        goToNextStep: function (id) {
            const wizard = this.getView().byId("recycleProductsWizard");
            let latestCategory = this.getView().getModel("chosenModel").getProperty("/latestCategory");
            let latestSubcategory = this.getView().getModel("chosenModel").getProperty("/latestSubcategory");

            switch (id) {
                case "searchTile":
                    this.byId("introStep").setNextStep(this.getView().byId("categoriesWizardStep"));
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

            this.getView().getModel("instructionsModel").setProperty("/title", '<strong style="font-size:45px">' + instr.name + "</strong>");
            this.getView().getModel("instructionsModel").setProperty("/product", instr.name.toLowerCase());

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
        },

        restartChoiceSteps: function () {
            let choice = this.getView().getModel("chosenModel").getProperty("/latestCategory");
            if (choice) {
                choice.removeStyleClass("pressedButton");
            }

            const wizard = this.getView().byId("recycleProductsWizard");
            wizard.discardProgress(this.byId("introStep"), false);


            this.getView().getModel("chosenModel").setProperty("/choice", null);

            this.discardCategoryStep();
        },

        discardCategoryStep: function () {
            let latestCategory = this.getView().getModel("chosenModel").getProperty("/latestCategory");
            let isCatAlreadyChosen = false;
            if (latestCategory != null) {
                latestCategory.removeStyleClass("pressedButton");
                isCatAlreadyChosen = true;
            }

            const wizard = this.getView().byId("recycleProductsWizard");
            if (isCatAlreadyChosen) {
                wizard.discardProgress(this.byId("categoriesWizardStep"), false);
            }

            this.getView().getModel("chosenModel").setProperty("/latestCategory", null);

            let latestSubcategory = this.getView().getModel("chosenModel").getProperty("/latestSubcategory");
            if (latestSubcategory != null) {
                this.discardSubcategoryStep();
            }
        },

        discardSubcategoryStep: function (oEvent) {
            let latestSubcategory = this.getView().getModel("chosenModel").getProperty("/latestSubcategory");
            let picture = this.getView().byId("pictureBox");

            let isSubcatAlreadyChosen = false;
            if (latestSubcategory) {
                latestSubcategory.removeStyleClass("pressedButton");
                isSubcatAlreadyChosen = true;
                let oldId = latestSubcategory.sId.slice(latestSubcategory.sId.lastIndexOf("-") + 1);
                picture.removeStyleClass(oldId)
            }


            if (oEvent) {
                let wizardStepId = oEvent.getSource().getParent().sId;
                const wizard = this.getView().byId("recycleProductsWizard");
                if (isSubcatAlreadyChosen) {
                    wizard.discardProgress(this.byId(wizardStepId), false);
                }
            }

            this.getView().getModel("chosenModel").setProperty("/latestSubcategory", null);
        }
    });
});
