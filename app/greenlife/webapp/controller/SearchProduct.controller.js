sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs"

], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {
        onInit: function () {
            sap.ui.getCore().byId("container-webapp---App--app").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"))

            this.getView().byId("searchTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("scanTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("paperAndCardboard").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("plasticAndPet").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("electro").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("metalAndAlu").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("glass").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("dangerous").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("automoto").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("constructions").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("wood").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("textile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("others").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("paperTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("cardboardTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("boxesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("bottleTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("bulbsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("batteriesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("mobilesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("largeApplianceTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("smallApplianceTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("zincTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("leadTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("steelTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("stainlessTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("ironTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("brassTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("cansTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("capsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("aerosolTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("aluFoilTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("aluCansTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("glassTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("masksTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("fertilizerTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("herbicidesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("pesticidesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("paintTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("solventTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("medicineTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("windshieldTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("eofTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("oilTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("carBatteriesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("polystyreneTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("demWoodTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("bricksTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("palletsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("sawdustTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("furnitureTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("clothesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("preProdTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("bagsTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("shoesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("otherTextilesTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("toysTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("organicTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("meshTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("tetraPakTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("foodOilTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("opticTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("waterFiltersTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("absTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("tireTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("petTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
            this.getView().byId("printerTile").setBackgroundImage(this.getOwnerComponent().getManifestObject().resolveUri("pictures/wallBackground.jpg"));
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
            let wizardStepId = oEvent.getSource().getParent().sId;
            let isSubcatAlreadyChosen = this.clearSubcategoriesAndReturnIsAlreadyChosen(oEvent.getSource().getParent().getContent());
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

        setPicture: function (id) {
            debugger
            let picture = this.getView().byId("pictureBox");
            switch (id) {
                case "printerTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/printer.jpg"));
                    break;
                case "petTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/pet.jpg"));
                    break;
                case "tireTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/tires.jpg"));
                    break;
                case "absTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/abs.jpg"));
                    break;
                case "waterFiltersTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/waterFilter.jpg"));
                    break;
                case "opticTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/opticFiber.jpg"));
                    break;
                case "foodOilTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/foodOil.jpg"));
                    break;
                case "tetraPakTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/tetraPak.jpg"));
                    break;
                case "meshTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/mesh.jpg"));
                    break;
                case "organicTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/organicWaste.jpg"));
                    break;
                case "toysTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/toys.jpg"));
                    break;
                case "otherTextilesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/otherTextiles.jpg"));
                    break;
                case "shoesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/shoes.jpg"));
                    break;

                case "bagsTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/bags.jpg"));
                    break;
                case "preProdTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/preProd.jpg"));
                    break;
                case "clothesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/clothes.jpg"));
                    break;
                case "furnitureTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/furniture.jpg"));
                    break;
                case "sawdustTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/sawdust.jpg"));
                    break;
                case "palletsTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/pallets.jpg"));
                    break;
                case "bricksTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/bricks.jpg"));
                    break;
                case "demWoodTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/demolitionWood.jpg"));
                    break;
                case "polystyreneTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/polystyrene.jpg"));
                    break;
                case "carBatteriesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/carBattery.jpg"));
                    break;
                case "oilTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/carOil.jpg"));
                    break;
                case "eofTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/eof.jpg"));
                    break;

                case "windshieldTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/windshield.jpg"));
                    break;
                case "medicineTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/medicine.jpg"));
                    break;
                case "solventTile": // picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/.jpg"));
                    break;
                case "paintTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/paint.jpg"));
                    break;
                case "pesticidesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/pesticide.jpg"));
                    break;
                case "herbicidesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/herbicides.jpg"));
                    break;
                case "fertilizerTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/fertilizer.jpg"));
                    break;
                case "masksTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/masks.jpg"));
                    break;
                case "glassTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/glass.jpg"));
                    break;
                case "aluCansTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/aluCans.jpg"));
                    break;
                case "aluFoilTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/aluFoil.jpg"));
                    break;
                case "aerosolTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/aerosol.jpg"));
                    break;

                case "capsTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/caps.jpg"));
                    break;
                case "cansTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/cans.jpg"));
                    break;
                case "ironTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/iron.jpg"));
                    break;
                case "stainlessTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/stainlessSteel.jpg"));
                    break;
                case "steelTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/steel.jpg"));
                    break;
                case "leadTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/lead.jpg"));
                    break;
                case "zincTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/zinc.jpg"));
                    break;
                case "smallApplianceTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/mixer.jpg"));
                    break;
                case "largeApplianceTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/fridge.jpg"));
                    break;
                case "mobilesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/mobile.jpg"));
                    break;
                case "batteriesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/batteries.jpg"));
                    break;
                case "bulbsTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/bulbs.jpg"));
                    break;

                case "bottleTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/bottles.jpg"));
                    break;
                case "boxesTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/boxes.jpg"));
                    break;
                case "cardboardTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/cardboard.jpg"));
                    break;
                case "paperTile": picture.setSrc(this.getOwnerComponent().getManifestObject().resolveUri("pictures/materials/paper.jpg"));
                    break;
            }
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

        clearSubcategoriesAndReturnIsAlreadyChosen: function (subcategoryParent) {
            let isSubcatAlreadyChosen = false
            subcategoryParent.forEach(el => {
                if (el.hasStyleClass("pressedButton")) {
                    isSubcatAlreadyChosen = true
                    el.removeStyleClass("pressedButton")
                }
            })
            return isSubcatAlreadyChosen
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
        }

    });
});
