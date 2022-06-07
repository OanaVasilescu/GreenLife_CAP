sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/Device",
    "sap/base/Log",
    "greenlife/utils/URLs"
], function (BaseController, JSONModel, Device, Log, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.Submit", {
        onInit: function () {
            this.getRouter().getRoute("Submit").attachMatched(this.initPage, this);


            this.getSplitAppObj().setHomeIcon({'phone': 'phone-icon.png', 'tablet': 'tablet-icon.png', 'icon': 'desktop.ico'});

            Device.orientation.attachHandler(this.onOrientationChange, this);
            this.getView().byId("materialComboBox").setFilterFunction(function (sTerm, oItem) { // A case-insensitive 'string contains' filter
                return oItem.getText().match(new RegExp(sTerm, "i")) || oItem.getKey().match(new RegExp(sTerm, "i"));
            });

            this.getView().setModel(new JSONModel({barcode: null, parts: []}), "productModel");
            this.getView().setModel(new JSONModel(), "materialsModel");
            this.getView().setModel(new JSONModel({scanText: ""}), "scanModel");

            this.getView().setModel(new JSONModel({visibility: true, items: []}), "historyModel")


        },

        onBeforeRendering: function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.getView().getModel("materialsModel").setData({
                material: [
                    {
                        key: "absTile",
                        name: oResourceBundle.getText("abs")
                    },
                    {
                        key: "tireTile",
                        name: oResourceBundle.getText("tire")
                    },
                    {
                        key: "carBatteriesTile",
                        name: oResourceBundle.getText("batteries")
                    },
                    {
                        key: "brassTile",
                        name: oResourceBundle.getText("brass")
                    }, {
                        key: "otherTextilesTile",
                        name: oResourceBundle.getText("otherTextiles")
                    }, {
                        key: "bulbsTile",
                        name: oResourceBundle.getText("lightBulbs")
                    }, {
                        key: "batteriesTile",
                        name: oResourceBundle.getText("batteries")
                    }, {
                        key: "bricksTile",
                        name: oResourceBundle.getText("bricks")
                    }, {
                        key: "printerTile",
                        name: oResourceBundle.getText("print")
                    }, {
                        key: "cardboardTile",
                        name: oResourceBundle.getText("cardboard")
                    }, {
                        key: "cansTile",
                        name: oResourceBundle.getText("cans")
                    }, {
                        key: "capsTile",
                        name: oResourceBundle.getText("metalCaps")
                    }, {
                        key: "organicTile",
                        name: oResourceBundle.getText("organicWaste")
                    }, {
                        key: "largeApplianceTile",
                        name: oResourceBundle.getText("largeAppliance")
                    }, {
                        key: "smallApplianceTile",
                        name: oResourceBundle.getText("smallAppliance")
                    }, {
                        key: "aluCansTile",
                        name: oResourceBundle.getText("aluCans")
                    }, {
                        key: "preProdTile",
                        name: oResourceBundle.getText("preProdTextile")
                    }, {
                        key: "herbicidesTile",
                        name: oResourceBundle.getText("herbicides")
                    }, {
                        key: "opticTile",
                        name: oResourceBundle.getText("opticFiber")
                    }, {
                        key: "waterFiltersTile",
                        name: oResourceBundle.getText("waterFilters")
                    }, {
                        key: "ironTile",
                        name: oResourceBundle.getText("iron")
                    }, {
                        key: "aluFoilTile",
                        name: oResourceBundle.getText("aluFoil")
                    }, {
                        key: "bottleTile",
                        name: oResourceBundle.getText("bottle")
                    }, {
                        key: "polystyreneTile",
                        name: oResourceBundle.getText("polystyrene")
                    }, {
                        key: "bagsTile",
                        name: oResourceBundle.getText("bags")
                    }, {
                        key: "paperTile",
                        name: oResourceBundle.getText("paper")
                    }, {
                        key: "clothesTile",
                        name: oResourceBundle.getText("clothes")
                    }, {
                        key: "stainlessTile",
                        name: oResourceBundle.getText("stainlessSteel")
                    }, {
                        key: "toysTile",
                        name: oResourceBundle.getText("toys")
                    }, {
                        key: "boxesTile",
                        name: oResourceBundle.getText("boxes")
                    }, {
                        key: "meshTile",
                        name: oResourceBundle.getText("mesh")
                    }, {
                        key: "furnitureTile",
                        name: oResourceBundle.getText("furniture")
                    }, {
                        key: "masksTile",
                        name: oResourceBundle.getText("masks")
                    }, {
                        key: "medicineTile",
                        name: oResourceBundle.getText("medicine")
                    }, {
                        key: "steelTile",
                        name: oResourceBundle.getText("steel")
                    }, {
                        key: "windshieldTile",
                        name: oResourceBundle.getText("windshield")
                    }, {
                        key: "palletsTile",
                        name: oResourceBundle.getText("pallets")
                    }, {
                        key: "leadTile",
                        name: oResourceBundle.getText("plumb")
                    }, {
                        key: "pesticidesTile",
                        name: oResourceBundle.getText("pesticides")
                    }, {
                        key: "petTile",
                        name: oResourceBundle.getText("pet")
                    }, {
                        key: "sawdustTile",
                        name: oResourceBundle.getText("sawdust")
                    }, {
                        key: "solventTile",
                        name: oResourceBundle.getText("solvent")
                    }, {
                        key: "glassTile",
                        name: oResourceBundle.getText("glass")
                    }, {
                        key: "tetraPakTile",
                        name: oResourceBundle.getText("tetraPak")
                    }, {
                        key: "mobilesTile",
                        name: oResourceBundle.getText("mobiles")
                    }, {
                        key: "aerosolTile",
                        name: oResourceBundle.getText("aluminumAerosolTubes")
                    }, {
                        key: "oilTile",
                        name: oResourceBundle.getText("oil")
                    }, {
                        key: "demWoodTile",
                        name: oResourceBundle.getText("demWood")
                    }, {
                        key: "eofTile",
                        name: oResourceBundle.getText("eof")
                    }, {
                        key: "paintTile",
                        name: oResourceBundle.getText("paint")
                    }, {
                        key: "zincTile",
                        name: oResourceBundle.getText("zinc")
                    }, {
                        key: "fertilizerTile",
                        name: oResourceBundle.getText("fertilizer")
                    }, {
                        key: "shoesTile",
                        name: oResourceBundle.getText("shoes")
                    }
                ]
            })
        },

        initPage: function () {
            this.getView().getModel("historyModel").setProperty("/visibility", true)

            this.getHistory();
            this.clearPages();
            this.getView().getModel("historyModel").refresh();
        },

        handleChange: function (oEvent) {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            let oValidatedComboBox = oEvent.getSource(),
                sSelectedKey = oValidatedComboBox.getSelectedKey(),
                sValue = oValidatedComboBox.getValue();

            if (! sSelectedKey && sValue) {
                oValidatedComboBox.setValueState('Error');
                oValidatedComboBox.setValueStateText(oResourceBundle.getText("Pleaseenteravalidmaterial!"));
            } else {
                oValidatedComboBox.setValueState('None');
            }
        },

        onExit: function () {
            Device.orientation.detachHandler(this.onOrientationChange, this);
        },

        onOrientationChange: function (mParams) {
            var sMsg = "Orientation now is: " + (
            mParams.landscape ? "Landscape" : "Portrait"
        );
            MessageToast.show(sMsg, {duration: 5000});
        },

        onPressNavToDetail: function () {
            this.getSplitAppObj().to(this.createId("detailDetail"));
        },

        onPressDetailBack: function () {
            this.getSplitAppObj().backDetail();
        },

        onPressMasterBack: function () {
            this.getSplitAppObj().backMaster();
        },

        onPressGoToMaster: function () {
            this.getSplitAppObj().toMaster(this.createId("master2"));
        },

        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitAppObj().toDetail(this.createId(sToPageId));
        },

        onPressModeBtn: function (oEvent) {
            var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

            this.getSplitAppObj().setMode(sSplitAppMode);
            MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
        },

        getSplitAppObj: function () {
            var result = this.byId("SplitAppDemo");
            if (! result) {
                Log.info("SplitApp object can't be found");
            }
            return result;
        },

        onScanSuccess: function (oEvent) {
            if (oEvent.getParameter("cancelled")) {
                this.messageHandler("scanCancelled")
            } else {
                if (oEvent.getParameter("text")) {
                    this.getView().getModel("scanModel").setProperty("/scanText", oEvent.getParameter("text"));
                } else {
                    this.getView().getModel("scanModel").setProperty("/scanText", "");
                }
            }
        },

        onScanError: function (oEvent) {
            this.messageHandler("scanFailed")
        },

        onScanLiveupdate: function (oEvent) { // User can implement the validation about inputting value
        },

        onAfterRendering: function () { // Reset the scan result
            let oScanButton = this.getView().byId('sampleBarcodeScannerButton');
            if (oScanButton) {
                $(oScanButton.getDomRef()).on("click", function () {
                    this.getView().getModel("scanModel").setProperty("/scanText", "");
                });
            }
        },

        submitProduct: async function () {
            let inputField = this.getView().byId("materialInput");
            let comboBox = this.getView().byId("materialComboBox");

            if (this.getView().getModel("scanModel").getProperty("/scanText") == "") {
                this.messageHandler("Pleaseenterabarcode!");
            } else {
                if (comboBox.getSelectedItem() == null) {
                    this.messageHandler("Pleaseenteravalidmaterial!");
                    comboBox.setValueState("Error");
                } else {
                    comboBox.setValueState("None");
                    let product = {
                        barcode: this.getView().getModel("scanModel").getProperty("/scanText"),
                        name: inputField.getValue(),
                        parentkey: comboBox.getSelectedKey()
                    }
                    await this.submitProductCall(product);
                    this.getHistory();

                }
            }
        },

        submitProductCall: async function (product) {
            let inputField = this.getView().byId("materialInput");
            let comboBox = this.getView().byId("materialComboBox");

            this.post(URLs.getProducts(), product).then((res) => {
                inputField.setValue("");
                comboBox.setSelectedItem(null);
                this.getView().getModel("scanModel").setProperty("/scanText", "");

                this.messageHandler("submitProductOk")
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("submitProductError")
                return;
            });
        },

        getHistory: async function () {
            this.get(URLs.getHistory()).then((res) => {
                if (res.value.length != 0) {
                    res.value = res.value.sort((a, b) => {
                        debugger;
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    });
                    this.getView().getModel("historyModel").setProperty("/items", res.value)
                    this.getView().getModel("historyModel").setProperty("/visibility", false)
                    this.getView().getModel("historyModel").refresh();
                }
            }).catch((err) => {
                console.log(err);
                this.messageHandler("getHistoryError")
            });
        },

        clearPages: function () {}

    });
});
