sap.ui.define([
    "sap/ui/core/mvc/Controller", "greenlife/utils/AjaxClient", "sap/m/MessageToast", "greenlife/utils/URLs",
],
/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, AjaxClient, MessageToast, URLs) {
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
            await new Promise((resolve, reject) => {
                this.get(URLs.getUser()).then((res) => {
                    resolve(res.user);
                }).catch((err) => {
                    MessageToast.show(err);
                    reject(err);
                });
            }).then((res) => {
                let isAdmin = false;
                if (res == 'admin') {
                    isAdmin = true;
                }
                this.getOwnerComponent().getModel("userDetailsModel").setProperty("isAdmin", isAdmin);
                this.getView().getModel("userDetailsModel").setProperty("isAdmin", isAdmin);
            });
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
        }
    });
});
