sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "sap/ui/core/Fragment", "greenlife/utils/URLs"
], function (BaseController, JSONModel, Fragment, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.MapPointPage", {

        onInit: function () {
            this.getRouter().getRoute("MapPointPage").attachMatched(this.initPage, this);
            let sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();

            this.getView().setModel(new JSONModel({isEditing: false, data: null}), "editModel");
            this.getView().setModel(new JSONModel(), "pointModel");
            this.getView().setModel(new JSONModel(), "mapPointModel");
            this.getView().setModel(new JSONModel(), "mapModel");
            this.getView().setModel(new JSONModel({}), "materialsModel");


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
                                "name": "Default",
                                "refMapProvider": "Google Maps",
                                "opacity": "1.0",
                                "colBkgnd": "RGB(255,255,255)"
                            },

                        ]
                    },


                ]
            };

            this.getView().setModel(new JSONModel({config: oMapConfig}), "mapConfigModel");


            this.initShellBar();
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
            const sHashParams = this.getRouter().getHashChanger().hash.replace("point/", "");
            this.getMapPoint(sHashParams);
        },

        getMapPoint: async function (sHashParams) {
            return await this.get(URLs.getMapPoints() + "/" + sHashParams).then(async pr => {
                this.getView().getModel("pointModel").setData(pr);
                let sAll = JSON.stringify(pr);
                let decoupledAll = JSON.parse(sAll);
                this.getView().getModel("editModel").setProperty("/data", decoupledAll);
                this.setSelectedComboKeys(pr);

            }).catch(err => {
                this.messageHandler("getPointError")
            })
        },

        setSelectedComboKeys: function (pr) {
            let keys = pr.productTypes.map(el => el.generalProduct.subcategory)
            let combo = this.getView().byId("multiCombo");
            combo.setSelectedKeys(keys)
        },

        pressMap: function (oEvent) {
            let pointModel = this.getView().getModel("mapPointModel");

            pointModel.setProperty("/", [{
                    location: oEvent.getParameter('pos')
                }])
            pointModel.refresh();
        },


        loadMap: function () {
            if (!this.mapDialog) {
                Fragment.load({name: "greenlife.view.fragments.MapChooseLocationDialog", controller: this}).then(function (oDialog) {
                    this.mapDialog = oDialog;

                    this.getView().addDependent(this.mapDialog);

                    this.mapDialog.open();
                }.bind(this));
            } else {
                this.mapDialog.open();
            }

            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.close();
        },

        onDialogClose: function () {
            this.mapDialog.close();
        },


        loadMap: function () {
            if (!this.mapDialog) {
                Fragment.load({name: "greenlife.view.fragments.MapChooseLocationDialog", controller: this}).then(function (oDialog) {
                    this.mapDialog = oDialog;

                    this.getView().addDependent(this.mapDialog);

                    this.mapDialog.open();
                }.bind(this));
            } else {
                this.mapDialog.open();
            }

            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.close();
        },

        onDialogClose: function () {
            this.mapDialog.close();
        },

        openMapDialog: function () {
            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.open();
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

        chooseLocationButtonPress: function (oEvent) {

            let model = this.getView().getModel("mapPointModel");
            let inputModel = this.getView().getModel("editModel");
            let location = model.getData()[0].location;
            const [long, ...rest] = location.split(';');

            let lat = rest[0];
            this.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBJuQmFUNshQD7svm_tjfObJRS-pXwXmLA`).then((res) => {
                let location = res.results[0].formatted_address;
                const [street, ...rest] = location.split(',');
                const [city, ...cityrest] = rest[0].split(" ");

                let county = res.results[0].address_components.find(el => el.long_name.includes('Jud'))
                if (county !== undefined) {
                    const [jud, ...countyname] = county.long_name.split(" ");
                    inputModel.setProperty("/data/county", countyname[0])
                } else {
                    inputModel.setProperty("/data/county", "-");
                };
                inputModel.setProperty("/data/locationAddress", street);
                inputModel.setProperty("/data/city", cityrest[0]);
                inputModel.refresh();


                this.onDialogClose();
            }).catch((err) => {
                console.log(err);
                this.messageHandler("locationError");
            });
        },

        pressEdit: function () {
            this.getView().getModel("editModel").setProperty("/isEditing", true);
        },

        pressCancel: function () {
            this.getView().getModel("editModel").setProperty("/isEditing", false);

            let data = this.getView().getModel("pointModel").getData();
            let sAll = JSON.stringify(data);
            let decoupledAll = JSON.parse(sAll);
            this.getView().getModel("editModel").setProperty("/data", decoupledAll);
        },

        pressSave: function () {
            let data = this.getView().getModel("editModel").getProperty("/data");

            this.prepForUpdate(data);
            this.editPoint(data);
            this.getView().getModel("editModel").setProperty("/isEditing", false);
        },

        editPoint: async function (data) {
            this.put(URLs.getMapPoints() + "/" + data.ID, data).then((res) => {
                this.getMapPoint(res.ID);
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("editPointError")
                return;
            });
        },

        prepForUpdate: function (data) {
            delete data.productTypes;
        }
    })
})
