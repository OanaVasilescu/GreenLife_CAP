sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "admin/utils/AjaxClient",
    "sap/m/MessageToast",
    "admin/utils/URLs",
    "sap/ui/model/json/JSONModel",
],
/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, AjaxClient, MessageToast, URLs, JSONModel) {
    "use strict";

    return Controller.extend("admin.controller.BaseController", {
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

        messageHandler: function (errorMessageName) {
            let msg = this.getView().getModel("i18n").getResourceBundle().getText(errorMessageName);
            MessageToast.show(msg);
        }
    });
});
