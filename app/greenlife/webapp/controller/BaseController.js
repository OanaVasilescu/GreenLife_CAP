sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "greenlife/utils/AjaxClient",
    "sap/m/MessageToast",
    "greenlife/utils/URLs",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment",
    "sap/ui/Device",
],
/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, AjaxClient, MessageToast, URLs, JSONModel, Fragment, Device) {
    "use strict";

    return Controller.extend("greenlife.controller.BaseController", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        get: function (url, data) {
            var sUrl = this.createUrl(url);

            return AjaxClient.get(sUrl, data);
        },

        post: function (url, data) {
            var sUrl = this.createUrl(url);

            return AjaxClient.post(sUrl, data);
        },

        delete: function (url) {
            var sUrl = this.createUrl(url);

            return AjaxClient.delete(sUrl);
        },

        put: function (url, data) {
            var sUrl = this.createUrl(url);

            return AjaxClient.put(sUrl, data);
        },

        createUrl: function (url) {
            return this.getOwnerComponent().getManifestObject().resolveUri(url);
            // return url;
        },

        getUserData: async function () {
            let isAdmin = false;
            await new Promise((resolve, reject) => {
                this.get(URLs.getUser()).then((res) => {
                    resolve(res.user);
                }).catch((err) => {
                    MessageToast.show(err);
                    reject(err);
                });
            }).then(async (res) => {
                if (res == 'oana.vasilescu@sap.com' || res == 'greenlife.recycling.app@gmail.com' || res == 'admin') {
                    isAdmin = true;
                }
                // this.getOwnerComponent().getModel("userDetailsModel").setProperty("isAdmin", isAdmin);
                // return isAdmin;
                // await this.getView().getModel("userDetailsModel").setProperty("isAdmin", isAdmin);
            });

            return isAdmin;
        },

        handleCancel: async function () {
            this.getRouter().navTo("RouteOverview");
        },

        messageHandler: function (errorMessageName) {
            let msg = this.getView().getModel("i18n").getResourceBundle().getText(errorMessageName);
            MessageToast.show(msg);
        },

        onInputChange: async function (oEvent) { // function used to validate inputs on change (XML)
            let source = oEvent.getSource();
            let sValue;
            let sId = source.getId();
            let sourceId = sId.slice(sId.lastIndexOf("-") + 1);
            if (sourceId !== "taskTypeSelect") 
                sValue = source.getValue();
             else {
                sValue = "Not relevant";
            }
            let sValueState = "None";
            let bValid = await this._validateInput(sValue, sId);
            let errorOrWarning;
            if (sourceId == "description" || sourceId == "notes") {
                errorOrWarning = "Warning";
            } else {
                errorOrWarning = "Error";
            }
            if (! bValid) {
                sValueState = errorOrWarning;
            }
            source.setValueState(sValueState);
        },

        _validateInput: async function (sValue, sId) {
            let id = sId.slice(sId.lastIndexOf("-") + 1);
            if (sValue.trim() == "" && id != "description" && id != "notes") { // if the field is empty, return false, else verify for each input type
                return false;
            }
            switch (id) {
                case "firstName":
                    return this._validateName(sValue.trim());
                case "lastName":
                    return this._validateName(sValue.trim());
                case "phoneInput":
                    return this._validatePhone(sValue.trim());
                case "emailInput":
                    return this._validateEmail(sValue.trim());
                case "placeDescriptionInput":
                    return this._validateNotEmpty(sValue.trim());
                case "addressInput":
                    return this._validateNotEmpty(sValue.trim());
                case "cityInput":
                    return this._validateNotEmpty(sValue.trim());
                case "countyInput":
                    return this._validateNotEmpty(sValue.trim());
                case "addressPointInput":
                    return this._validateNotEmpty(sValue.trim());
                case "cityPointInput":
                    return this._validateNotEmpty(sValue.trim());
                case "countyPointInput":
                    return this._validateNotEmpty(sValue.trim());
                case "administeredPointInput":
                    return this._validateNotEmpty(sValue.trim());
                default:
                    return false;
            }
        },

        _validateName: function (sValue) {
            if (/[^a-z]/i.test(sValue)) {
                return false;
            }
            if (sValue.length < 3) {
                return false;
            }

            return true;
        },

        _validatePhone: function (sValue) {
            if (sValue.length < 9) {
                return false;
            }
            return true;
        },

        _validateEmail: function (sValue) {
            const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (! sValue.match(regexEmail)) {
                return false;
            }
            return true;
        },

        _validateNotEmpty: function (sValue) {
            if (sValue.length < 1) {
                return false;
            }
            return true;
        },

        validateInputOnSubmit: async function (aInputs) { // validate inputs on pressing button
            let oView = this.getView();
            if (!Array.isArray(aInputs)) {
                let emptyArray = [];
                emptyArray.push(aInputs); // TODO: if it's not array, make it an array
                aInputs = emptyArray;
            }
            let bNoValidationError = true,
                bIsValid = true;
            for (const sId of aInputs) {
                if (sId !== "taskTypeSelect") {
                    bIsValid = await this._validateInput(oView.byId(sId).getValue(), sId);
                } else {
                    bIsValid = await this._validateInput("Not relevant", sId); // select does not have getValue
                };
                bNoValidationError = bIsValid && bNoValidationError;

                if (! bIsValid) 
                    oView.byId(sId).setValueState("Error");
                 else {
                    oView.byId(sId).setValueState("None");
                }
            }
            if (bNoValidationError) {
                return true;
            } else {
                return false;
            }
        },

        initShellBar: async function () {
            let oResourceBundle = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView())).getModel('i18n').getResourceBundle();


            this.getView().setModel(new JSONModel(), "userDetailsModel");
            let isAdmin = await this.getUserData();
            let oModel = new JSONModel({
                    "items": [
                        {
                            "src": "sap-icon://home",
                            "title": oResourceBundle.getText("Home"),
                            "subTitle": oResourceBundle.getText("CentralHome"),
                            "visible": true
                        },
                        {
                            "src": "sap-icon://search",
                            "title": oResourceBundle.getText("searchProductTileTitle"),
                            "subTitle": oResourceBundle.getText("searchProductTileSubTitle"),
                            "visible": true
                        },
                        {
                            "src": "sap-icon://map-2",
                            "title": oResourceBundle.getText("mapTileTitle"),
                            "subTitle": oResourceBundle.getText("mapTileSubTitle"),
                            "visible": true
                        },
                        {
                            "src": "sap-icon://home-share",
                            "title": oResourceBundle.getText("reportTileTitle"),
                            "subTitle": oResourceBundle.getText("reportTileSubTitle"),
                            "visible": true
                        }, {
                            "src": "sap-icon://add-document",
                            "title": oResourceBundle.getText("submitTileTitle"),
                            "subTitle": oResourceBundle.getText("submitTileSubTitle"),
                            "visible": true
                        }, {
                            "src": "sap-icon://key-user-settings",
                            "title": oResourceBundle.getText("adminAppTileTitle"),
                            "subTitle": oResourceBundle.getText("adminAppTileSubTitle"),
                            "visible": isAdmin
                        }
                    ]
                }),
                oView = this.getView();
            this.getView().setModel(oModel);

            if (!this._pPopover) {
                this._pPopover = Fragment.load({id: oView.getId(), name: "greenlife.view.fragments.Nav", controller: this}).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    if (Device.system.phone) {
                        oPopover.setEndButton(new Button({text: "Close", type: "Emphasized", press: this.fnClose.bind(this)}));
                    }
                    return oPopover;
                }.bind(this));
            }
        },

        fnChange: function (oEvent) {
            let src = oEvent.getParameter("itemPressed").getId();
            src = src.substr(src.length - 1);

            switch (src) {
                case '0':
                    this.getRouter().navTo("RouteOverview");
                    break;

                case '1':
                    this.getRouter().navTo("SearchProduct");
                    break;

                case '2':
                    this.getRouter().navTo("RecyclingMap");
                    break;

                case '3':
                    this.getRouter().navTo("Report");
                    break;

                case '4':
                    this.getRouter().navTo("Submit");
                    break;
                case '5':
                    this.getRouter().navTo("AdminApp");
                    break;
                default:
                    this.getRouter().navTo("RouteOverview");
                    break;
            }
        },

        fnOpen: function (oEvent) {
            var oButton = oEvent.getParameter("button");
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },

        fnClose: function () {
            this._pPopover.then(function (oPopover) {
                oPopover.close();
            });
        }
    });
});
