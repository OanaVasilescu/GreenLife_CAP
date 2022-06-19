sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/Device",
    "sap/base/Log",
    "sap/ui/core/Fragment",
    "greenlife/utils/URLs"
], function (BaseController, JSONModel, Device, Log, Fragment, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.Submit", {
        onInit: function () {
            this.getRouter().getRoute("Submit").attachMatched(this.initPage, this);
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
            this.getSplitAppObj().setHomeIcon({'phone': 'phone-icon.png', 'tablet': 'tablet-icon.png', 'icon': 'desktop.ico'});

            Device.orientation.attachHandler(this.onOrientationChange, this);
            this.getView().byId("materialComboBox").setFilterFunction(function (sTerm, oItem) { // A case-insensitive 'string contains' filter
                return oItem.getText().match(new RegExp(sTerm, "i")) || oItem.getKey().match(new RegExp(sTerm, "i"));
            });

            this.getView().setModel(new JSONModel({barcode: null, parts: []}), "productModel");
            this.getView().setModel(new JSONModel(), "materialsModel");
            this.getView().setModel(new JSONModel({scanText: ""}), "scanModel");
            this.getView().setModel(new JSONModel({}), "mapModel");
            this.getView().setModel(new JSONModel([]), "mapPointModel");

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
            let yellow = this.getOwnerComponent().getManifestObject().resolveUri("./pictures/mapPins/yellow.png")

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


            this.getView().setModel(new JSONModel({locationAddress: "", city: "", administeredBy: "", county: ""}), "inputModel");

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
                        key: "brassTile",
                        name: oResourceBundle.getText("brass")
                    },
                    {
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
            this.getHistory();
            this.clearPages();
            this.getView().getModel("historyModel").setProperty("/visibility", true)
            if (this.getRouter().getHashChanger().hash !== "submit") {
                const sHashParams = this.getRouter().getHashChanger().hash.replace("submit/", "");
                if (sHashParams == "points") {
                    this.getSplitAppObj().toDetail(this.createId("MapBinsPage"));
                } else {
                    this.getSplitAppObj().toDetail(this.createId("ProductsBarcodesPage"));
                    if (sHashParams != "barcode") {
                        this.getView().getModel("scanModel").setProperty("/scanText", sHashParams)
                        this.getView().getModel("scanModel").refresh()
                    }
                }
            } else {
                this.getSplitAppObj().toDetail(this.createId("historyPage"));
            }

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
                        name: inputField.getValue()
                    }
                    let id = await this.getIDfromCat(comboBox.getSelectedKey());

                    product.parent_ID = id;

                    await this.submitProductCall(product);
                    this.getHistory()
                }
            }
        },

        getIDfromCat: async function (subcategory) {
            let ID;
            await this.get(URLs.getIDfromCat(subcategory)).then(async res => {
                ID = res.value[0];
            }).catch(async err => {
                ID = null;
            })

            return ID
        },


        submitProductCall: async function (product) {
            this.post(URLs.getProducts(), product).then((res) => {
                this.clearPages();
                this.messageHandler("submitProductOk")
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("submitProductError")
                return;
            });
        },

        submitPoint: async function () {
            if (await this.validateInputOnSubmit(["addressPointInput", "cityPointInput", "countyPointInput", "administeredPointInput"])) {
                if (this.getView().byId("multiCombo").getSelectedKeys().length == 0) {
                    this.getView().byId("multiCombo").setValueState("Error");
                    this.messageHandler("pleaseCompleteFields");
                    return;
                }

                let pointData = this.getView().getModel("inputModel").getData();

                pointData.productNames = this.getView().byId("multiCombo").getSelectedKeys();
                pointData.rewardType = this.getView().byId("rewardSelect").getSelectedKey();

                let coordinatesModel = this.getView().getModel("mapPointModel");
                let response;

                if (coordinatesModel.getData().length == 0) {
                    response = await this.getLocationCoordinatesFromAddress(pointData);
                }


                if (response == undefined) {} else if (response == 0 || response.results[0].formatted_address == "Romania") {
                    this.getView().byId("addressPointInput").setValueState("Error");

                    this.messageHandler("pleaseEnterValidAddress");
                    return;
                }

                if (response != undefined) {

                    pointData.longitude = response.results[0].geometry.location.lng
                    pointData.latitude = response.results[0].geometry.location.lat

                    const [locationAddress, ...rest] = response.results[0].formatted_address.split(',')
                    pointData.locationAddress = locationAddress;
                    pointData.city = rest[0];
                } else {
                    const [long, ...rest] = coordinatesModel.getData()[0].location.split(';')

                    pointData.longitude = long;
                    pointData.latitude = rest[0];
                };

                pointData.longitude = pointData.longitude.toString();
                pointData.latitude = pointData.latitude.toString();


                await this.submitPointCall(pointData);

                this.getHistory();
            } else {
                this.getView().getModel("inputModel").refresh();
                this.messageHandler("pleaseCompleteFields");
            }
        },

        submitPointCall(point) {
            this.post(URLs.getMapPoints(), point).then((res) => {
                this.clearPages();
                this.messageHandler("submitPointOk")
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("submitPointError")
                return;
            });
        },

        getHistory: async function () {
            this.get(URLs.getHistory()).then((res) => {

                if (res.value.length != 0) {
                    res.value = res.value.sort((a, b) => {
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

        pressMap: function (oEvent) {
            let pointModel = this.getView().getModel("mapPointModel");

            pointModel.setProperty("/", [{
                    location: oEvent.getParameter('pos')
                }])
            pointModel.refresh();
        },

        chooseLocationButtonPress: function () {

            let model = this.getView().getModel("mapPointModel");
            let inputModel = this.getView().getModel("inputModel");
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
                    inputModel.setProperty("/county", countyname[0])
                } else {
                    inputModel.setProperty("/county", "-");
                };
                inputModel.setProperty("/locationAddress", street);
                inputModel.setProperty("/city", cityrest[0]);
                inputModel.refresh();

                this.validateInputOnSubmit(['cityPointInput', "addressPointInput", "countyPointInput"]);
                this.onDialogClose();
            }).catch((err) => {
                console.log(err);
                this.messageHandler("locationError");
            });
        },

        getLocationCoordinatesFromAddress: async function (pointData) {
            let address = pointData.locationAddress.split(' ').join('+');
            let response;
            await this.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${
                pointData.city
            },+${
                pointData.county
            },+romania&key=AIzaSyBJuQmFUNshQD7svm_tjfObJRS-pXwXmLA`).then(async (res) => {

                response = res;
            }).catch(async (err) => {
                this.messageHandler("thisIsNotALocation");
                response = 0;
            })

            return response;
        },

        clearPages: function () {

            let inputModel = this.getView().getModel("inputModel");

            inputModel.setProperty("/locationAddress", "");
            inputModel.setProperty("/city", "");
            inputModel.setProperty("/county", "");
            inputModel.setProperty("/administeredBy", "");
            inputModel.refresh()

            let inputField = this.getView().byId("materialInput");
            let comboBox = this.getView().byId("materialComboBox");
            inputField.setValue("");
            comboBox.setSelectedItem(null);
            this.getView().getModel("scanModel").setProperty("/scanText", "");
            this.getView().getModel("scanModel").refresh();

            let multiCombo = this.getView().byId("multiCombo");
            let rewardSelect = this.getView().byId("rewardSelect");

            multiCombo.setSelectedItems([]);
            rewardSelect.setSelectedKey('none')
        }
    });
});
