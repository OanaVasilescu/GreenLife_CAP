sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.RecyclingMap", {
        onInit: function () {

            let oMapConfig = {
                "MapProvider": [
                    {
                        "Id": "GM",
                        "name": "Google Maps",
                        "minLOD": "1",
                        "maxLOD": "19",
                        "tileX": "256",
                        "tileY": "256",
                        "copyright": "© Google Maps",
                        "Source": [
                            {
                                "id": "a",
                                "url": "https://mt1.googleapis.com/vt?x={X}&y={Y}&z={LOD}&key=AIzaSyBhyd-qk3-ALZmprJSSc2WXt2XUOoqeXjs"

                            }
                        ]
                    }
                ],
                "MapLayerStacks": [
                    {
                        "name": "Default",
                        "MapLayer": [
                            {
                                "name": "Default",
                                "refMapProvider": "Google Maps",
                                "opacity": "1.0",
                                "colBkgnd": "RGB(255,255,255)"
                            }
                        ]
                    }
                ]
            };

            this.getView().setModel(new JSONModel({config: oMapConfig}), "mapConfigModel");

            this.getView().setModel(new JSONModel({}), "materialsModel");

            this.getView().byId("multiCombo").setFilterFunction(function (sTerm, oItem) { // A case-insensitive 'string contains' filter
                var sItemText = oItem.getText().toLowerCase(),
                    sSearchTerm = sTerm.toLowerCase();

                return sItemText.indexOf(sSearchTerm) > -1;
            });
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

            debugger;
        }
    });
});
