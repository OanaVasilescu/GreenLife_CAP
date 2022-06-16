sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "sap/ui/core/Fragment", "greenlife/utils/URLs"
], function (BaseController, JSONModel, Fragment, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.RecyclingMap", {
        onInit: function () {
            this.getRouter().getRoute("RecyclingMap").attachMatched(this.initPage, this);
            this.initShellBar();

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
                                "id": "f80448073cb888a8",
                                "url": "https://mt1.googleapis.com/vt?x={X}&y={Y}&z={LOD}&key=AIzaSyBJuQmFUNshQD7svm_tjfObJRS-pXwXmLA",
                                // "url": "https://mt1.googleapis.com/vt?x={X}&y={Y}&z={LOD}&key=AIzaSyBhyd-qk3-ALZmprJSSc2WXt2XUOoqeXjs&center=48.21416667591101,-120.77405956241938&zoom=8&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d&size=480x360"
                            }
                        ]
                    }
                ],
                "MapLayerStacks": [
                    {
                        "name": "Default",
                        "MapLayer": [
                            {
                                "name": "f80448073cb888a8",
                                "refMapProvider": "Google Maps",
                                "opacity": "1.0",
                                "colBkgnd": "RGB(255,255,255)"
                            },

                        ]
                    }
                ]
            };

            this.getView().setModel(new JSONModel({config: oMapConfig}), "mapConfigModel");

            this.getView().setModel(new JSONModel({}), "materialsModel");
            this.getView().setModel(new JSONModel({}), "mapModel");
            this.getView().setModel(new JSONModel(), "mapPointsModel");
            this.getView().setModel(new JSONModel(), "mapPointDialogModel");


            let pic = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/location-icon-png-4224.png")
            let black = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/black.png")
            let blue = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/blue.png")
            let brown = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/brown.png")
            let dark_blue = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/dark_blue.png")
            let gray = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/gray.png")
            let dark_green = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/dark_green.png")
            let green64 = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/green64.png")
            let orange = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/orange.png")
            let pink = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/pink.png")
            let purple = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/purple.png")
            let red = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/red.png")
            let turqoise = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/turqoise.png")
            let white = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/white.png")
            let yellow = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/yellow64.png")

            this.getView().setModel(new JSONModel({
                redPin: pic,
                black: black,
                blue: blue,
                brown: brown,
                dark_blue: dark_blue,
                gray: gray,
                dark_green: dark_green,
                green: green64,
                orange: orange,
                pink: pink,
                purple: purple,
                red: red,
                turqoise: turqoise,
                white: white,
                yellow: yellow
            }), "pinModel");

            this.getView().byId("multiCombo").setFilterFunction(function (sTerm, oItem) { // A case-insensitive 'string contains' filter
                var sItemText = oItem.getText().toLowerCase(),
                    sSearchTerm = sTerm.toLowerCase();

                return sItemText.indexOf(sSearchTerm) > -1;
            });
        },

        onBeforeRendering: function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            this.getView().getModel("mapPointsModel").setSizeLimit(1000)
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

        initPage: async function () { // this.addClustering();
            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.open();

            await this.getMapPoints();


            if (this.getRouter().getHashChanger().hash !== "map") {
                const sHashParams = this.getRouter().getHashChanger().hash.replace("map/", "");

                this.getView().byId("multiCombo").setSelectedKeys([sHashParams]);
                this.onSearch();
            }
            this.getLocation();
        },

        getLocation: function () {
            let position;
            if (navigator.geolocation) {
                const success = (pos => { // Location found, show map with these coordinates
                    position = `${
                        pos.coords.longitude
                    };${
                        pos.coords.latitude
                    }`;
                    this.getView().getModel("mapModel").setProperty("/center", position)
                    this.getView().getModel("mapModel").setProperty("/initialZoom", 17)

                    this.loadMap();
                })
                const fail = (error => {
                    position = "21.24281;45.75142" // Failed to find location, show default map
                    this.getView().getModel("mapModel").setProperty("/center", position)
                    this.getView().getModel("mapModel").setProperty("/initialZoom", 13)

                    this.loadMap();
                })
                // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
                navigator.geolocation.getCurrentPosition(success, fail, {
                    maximumAge: 500000,
                    enableHighAccuracy: true,
                    timeout: 6000
                })
            } else {
                position = "21.24281;45.75142";
                this.getView().getModel("mapModel").setProperty("/center", position);
                this.getView().getModel("mapModel").setProperty("/initialZoom", 13)

                this.loadMap();
            }
        },

        loadMap: function () {
            Fragment.load({name: "greenlife.view.fragments.Map", controller: this}).then((map) => {
                this.getView().byId("mapContainer").setFlexContent(map)
            });

            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.close();
        },

        getMapPoints: async function () {
            return await this.get(URLs.getMapPoints()).then(async mapPoints => {
                this.getView().getModel("mapPointsModel").setData(mapPoints);
                this.getView().getModel("mapPointsModel").setProperty("/visible", mapPoints.value)
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getMapPointsError")
            })
        },

        pressPin: function (oEvent) {
            const path = oEvent.getSource().getBindingContext("mapPointsModel").getPath();
            let mapPointsModel = this.getView().getModel("mapPointsModel");
            const pointData = mapPointsModel.getProperty(path);

            let mapPointDialogModel = this.getView().getModel("mapPointDialogModel");

            let sPointData = JSON.stringify(pointData);
            let point = JSON.parse(sPointData);
            mapPointDialogModel.setProperty("/data", point);
            mapPointDialogModel.refresh();


            if (!this.mapPointDialog) {
                Fragment.load({name: "greenlife.view.fragments.MapPointDialog", controller: this}).then(function (oDialog) {
                    this.mapPointDialog = oDialog;

                    this.getView().addDependent(this.mapPointDialog);

                    this.mapPointDialog.open();
                }.bind(this));
            } else {
                this.mapPointDialog.open();
            }
        },

        onDialogClose: function () {
            this.mapPointDialog.close();
        },

        pressSubmitMissing: function () {
            this.getRouter().navTo("Submit", {page: 'points'});
        },

        onSearch: function (oEvent) {
            let materials = this.getView().byId("multiCombo").getSelectedKeys();
            let city = this.getView().byId("citySelect").getSelectedKey()
            let reward = this.getView().byId("rewardSelect").getSelectedKey()
            let pointsModel = this.getView().getModel("mapPointsModel");


            let all = pointsModel.getProperty("/value");
            let sAll = JSON.stringify(all);
            let decoupledAll = JSON.parse(sAll);

            pointsModel.setProperty('/visible', decoupledAll);


            let visible = pointsModel.getProperty('/visible');

            visible = visible.filter(el => {
                if (materials.length == 0 && city == "all" && reward == "irrelevant") {
                    return true;
                }

                let foundMaterial;
                try {
                    foundMaterial = el.productTypes.some(type => materials.includes(type.generalProduct.subcategory))
                } catch {
                    foundMaterial = true;
                }

                if (materials.length == 0) {
                    foundMaterial = true;
                }
            


            let foundCity = el.city.toLocaleLowerCase() == city;
            if (city == "all") {
                foundCity = true;
            }


            let bool = reward == 'yes';
            let foundReward = el.reward == bool;

            if (reward == "irrelevant") {
                foundReward = true;
            }


            if (foundMaterial && foundCity && foundReward) {
                return true;
            } else {
                return false;
            }
        })

        pointsModel.setProperty('/visible', visible);
        pointsModel.refresh();
    },

    openUrl: function (url, newTab) { // Require the URLHelper and open the URL in a new window or tab (same as _blank):

        sap.ui.require(["sap/m/library"], ({URLHelper}) => URLHelper.redirect(url, newTab));

    }
});});
