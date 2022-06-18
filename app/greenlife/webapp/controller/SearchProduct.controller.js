sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs", "sap/m/MessageBox",


], function (BaseController, JSONModel, URLs, MessageBox) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {

        onInit: async function () {
            this.initShellBar();

            this.getView().setModel(new JSONModel({backgroundPicture: "https://images.unsplash.com/photo-1550353127-b0da3aeaa0ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"}), "pictureModel")
            this.getView().setModel(new JSONModel({latestSubcategory: null, latestCategory: null, choice: null, currentlyPressed: null}), "chosenModel");

            this.getRouter().getRoute("SearchProduct").attachMatched(this.restartChoiceSteps, this);
            await this.loadAllFragments();
            this.addSpecificStyleClasses();

            let runningOnPhone = sap.ui.Device.system.phone;
            this.getView().setModel(new JSONModel({isPhone: runningOnPhone}), "phoneModel");
        },


        loadAllFragments: async function () {
            let categoriesStep = this.getView().byId("categoriesWizardStep");
            let runningOnPhone = sap.ui.Device.system.phone;


            await this.loadFragment({name: "greenlife.view.fragments.CategoryLargeTiles"}).then(async (fragmentLarge) => {
                await this.loadFragment({name: "greenlife.view.fragments.CategorySmallTiles"}).then(async function (fragmentSmall) {
                    if (runningOnPhone) {
                        await categoriesStep.addContent(new sap.m.HBox({wrap: "Wrap"}).addItem(fragmentLarge[0]).addItem(fragmentLarge[1]).addItem(fragmentLarge[2]).addItem(fragmentLarge[3]).addItem(fragmentLarge[4]).addItem(fragmentSmall[0]).addItem(fragmentSmall[0]).addItem(fragmentSmall[1]).addItem(fragmentSmall[2]).addItem(fragmentSmall[3]).addItem(fragmentSmall[4]).addItem(fragmentSmall[5]));
                    } else {
                        await categoriesStep.addContent(new sap.m.VBox().addItem(new sap.m.HBox("largeTiles").addItem(fragmentLarge[0]).addItem(fragmentLarge[1]).addItem(fragmentLarge[2]).addItem(fragmentLarge[3]).addItem(fragmentLarge[4])).addItem(new sap.m.HBox().addItem(fragmentSmall[0]).addItem(fragmentSmall[0]).addItem(fragmentSmall[1]).addItem(fragmentSmall[2]).addItem(fragmentSmall[3]).addItem(fragmentSmall[4]).addItem(fragmentSmall[5])));
                    }
                });
            });

            let metalStep = this.getView().byId("metalAndAluStep");
            await this.loadFragment({name: "greenlife.view.fragments.MetalLargeTiles"}).then(async (fragmentLarge) => {
                await this.loadFragment({name: "greenlife.view.fragments.MetalSmallTiles"}).then(async function (fragmentSmall) {
                    if (runningOnPhone) {
                        await metalStep.addContent(new sap.m.HBox().addItem(new sap.m.VBox("largeTilesMetal").addItem(fragmentLarge[0]).addItem(fragmentLarge[1]).addItem(fragmentLarge[2]).addItem(fragmentLarge[3]).addItem(fragmentLarge[4])).addItem(new sap.m.VBox().addItem(fragmentSmall[0]).addItem(fragmentSmall[0]).addItem(fragmentSmall[1]).addItem(fragmentSmall[2]).addItem(fragmentSmall[3]).addItem(fragmentSmall[4]).addItem(fragmentSmall[5])));
                    } else {
                        await metalStep.addContent(new sap.m.VBox().addItem(new sap.m.HBox("largeTilesMetal").addItem(fragmentLarge[0]).addItem(fragmentLarge[1]).addItem(fragmentLarge[2]).addItem(fragmentLarge[3]).addItem(fragmentLarge[4])).addItem(new sap.m.HBox().addItem(fragmentSmall[0]).addItem(fragmentSmall[0]).addItem(fragmentSmall[1]).addItem(fragmentSmall[2]).addItem(fragmentSmall[3]).addItem(fragmentSmall[4]).addItem(fragmentSmall[5])));
                    }
                });
            });

            await this.loadFragment({name: "greenlife.view.fragments.VBoxForInstructions"}).then(async (fragmentInstructions) => {
                if (runningOnPhone) {
                    await this.getView().byId("PhoneVBox").addItem(fragmentInstructions);
                } else {
                    await this.getView().byId("desktopVBox").addItem(fragmentInstructions);
                }
            })
        },

        addSpecificStyleClasses: function () {
            let steps = this.getView().byId("recycleProductsWizard").getSteps();

            if (sap.ui.Device.system.phone) {
                this.getView().byId("detailsBoxTitle").addStyleClass("sapUiSmallMarginTop")
                this.getView().byId("detailsBoxText").addStyleClass("sapUiSmallMarginBottom")
                this.getView().byId("detailsBoxTitle").addStyleClass("sapUiSmallMarginBeginEnd")
                this.getView().byId("detailsBoxText").addStyleClass("sapUiSmallMarginBeginEnd")

                steps.forEach(step => {
                    step.addStyleClass("sapUiSmallMargin");
                });
            } else {
                this.getView().byId("detailsBoxTitle").addStyleClass("sapUiLargeMarginTop")
                this.getView().byId("detailsBoxText").addStyleClass("sapUiLargeMarginBottom")
                this.getView().byId("detailsBoxTitle").addStyleClass("sapUiLargeMarginBeginEnd")
                this.getView().byId("detailsBoxText").addStyleClass("sapUiLargeMarginBeginEnd")

                steps.forEach(step => {
                    step.addStyleClass("sapUiLargeMarginBegin");
                });
            }
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
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.restartChoiceSteps();

            let choice = oEvent.getSource();
            this.getView().getModel("chosenModel").setProperty("/choice", choice);
            choice.addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);
            this.goToNextStep(id);

            if (id == "searchTile") {
                let detailsTitle = oResourceBundle.getText("chooseCat");
                let detailsText = oResourceBundle.getText("chooseCatText")

                this.getView().getModel("detailsModel").setData({title: detailsTitle, text: detailsText})
            }
        },

        chooseCategory: function (oEvent) {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.discardCategoryStep();
            let latestCategory = oEvent.getSource();
            this.getView().getModel("chosenModel").setProperty("/latestCategory", latestCategory);

            oEvent.getSource().addStyleClass("pressedButton");

            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);

            this.goToNextStep(id);

            let detailsTitle = oResourceBundle.getText("chooseSubCat");
            let detailsText = oResourceBundle.getText("chooseSubCatText");

            this.getView().getModel("detailsModel").setData({title: detailsTitle, text: detailsText})
        },

        chooseSubcategory: async function (oEvent) {
            this.discardSubcategoryStep(oEvent);

            let latestSubcategory = oEvent.getSource();
            this.getView().getModel("chosenModel").setProperty("/latestSubcategory", latestSubcategory);
            oEvent.getSource().addStyleClass("pressedButton");


            let fullId = oEvent.getSource().getId();
            let id = fullId.slice(fullId.lastIndexOf("-") + 1);


            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.open();
            let instructionsData = await this.getInstructions(id);
            this.getView().byId("fixflexLayout").setVertical(false);

            let instr = instructionsData.value[0];
            if (instr != undefined) {
                this.setInstructions(instr);
            }

            // this.getView().byId("recycleProductsFixFlex").addStyleClass("fixFlexHorizontal");
            // this.getView().byId("recycleProductsFixFlex").setVertical(false);

            this.setPicture(id);

            busyDialog.close();
            this.goToNextStep(id)
        },

        goToNextStep: function (id) {
            const wizard = this.getView().byId("recycleProductsWizard");

            switch (id) {
                case "searchTile":
                    this.byId("introStep").setNextStep(this.getView().byId("categoriesWizardStep"));
                    break;
                case "scanTile":
                    this.byId("introStep").setNextStep(this.getView().byId("scanStep"));
                    sap.ui.require(["sap/ndc/BarcodeScanner"], (BarcodeScanner) => {
                        BarcodeScanner.scan((oResult) => { /* handle scan result */
                            if (oResult.cancelled) {
                                this.messageHandler("scanCancelled")
                            } else {
                                if (oResult.text) {
                                    this.goToScanResult(oResult);
                                } else {
                                    this.messageHandler("scanCancelled")
                                }
                            }
                        }, function (oError) {
                            this.messageHandler("scanFailed")
                        }, function (oResult) {
                            /* handle input dialog change */
                            // debugger;
                            // no need for anything here
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

        goToScanResult: async function (oResult) {

            let result = await this.getInstructionsByBarcode(oResult.text);

            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            debugger;
            if (result == null) {
                MessageBox.error(oResourceBundle.getText("ProductNotFound"), {
                    actions: [
                        oResourceBundle.getText("SubmitBarcode"), MessageBox.Action.OK
                    ],
                    emphasizedAction: oResourceBundle.getText("SubmitBarcode"),
                    onClose: (sAction) => {
                        if (sAction == 'OK') {
                            this.restartChoiceSteps();
                        } else {
                            this.pressSubmitMissing();
                        }
                    }
                });
            } else {
                let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
                busyDialog.open();
                this.getView().byId("fixflexLayout").setVertical(false);

                let instr = result.value[0];
                if (instr != undefined) {
                    this.setInstructions(instr);
                }

                // this.getView().byId("recycleProductsFixFlex").addStyleClass("fixFlexHorizontal");
                // this.getView().byId("recycleProductsFixFlex").setVertical(false);

                this.setPicture(result.value[0].subcategory);
                debugger;

                busyDialog.close();
                this.getView().getModel("chosenModel").setProperty("/latestSubcategory", true);


                this.byId("introStep").setNextStep(this.getView().byId("instructionStep"));

                const wizard = this.getView().byId("recycleProductsWizard");
                wizard.nextStep();
                // this.goToNextStep(result.value[0].subcategory);
                debugger;
            }

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
            let sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();

            return await this.get(URLs.getInstructionsBySubcategory(subcategory, sCurrentLocale)).then(async instructionsData => {
                return instructionsData;
            }).catch(err => {
                this.messageHandler("getInstructionsBySubcategoryError")
            })
        },


        getInstructionsByBarcode: async function (barcode) {
            let sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
            let resp;
            await this.get(URLs.getInstructionsByBarcode(barcode, sCurrentLocale)).then(async instructionsData => {
                resp = instructionsData;
            }).catch(err => {
                resp = null
            })

            return resp;
        },

        restartChoiceSteps: function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.getView().getModel("detailsModel").setProperty("/title", oResourceBundle.getText("detailsTitle"));
            this.getView().getModel("detailsModel").setProperty("/text", oResourceBundle.getText("detailsText"));

            let choice = this.getView().getModel("chosenModel").getProperty("/choice");
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
            if (latestSubcategory && latestSubcategory !== true) {
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

            this.getView().byId("fixflexLayout").setVertical(true);
            this.getView().getModel("chosenModel").setProperty("/latestSubcategory", null);
        },

        goToMapPoints: function (oEvent) {
            let chosenModel = this.getView().getModel("chosenModel");
            let id = chosenModel.getData().latestSubcategory.sId;
            let subcategory = id.slice(id.lastIndexOf("-") + 1);

            this.getRouter().navTo("RecyclingMap", {material: subcategory});
        },

        pressSubmitMissing: function () {
            this.getRouter().navTo("Submit", {page: 'barcode'});
        }
    });
});
