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


        messageHandler: function (errorMessageName) {
            let msg = this.getView().getModel("i18n").getResourceBundle().getText(errorMessageName);
            MessageToast.show(msg);
        }
    });
});
