sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs"
], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.ObjectPageProducts", {
        onInit: function () {
            this.getRouter().getRoute("ObjectPageProducts").attachMatched(this.initPage, this);

            this.getView().setModel(new JSONModel(), "productModel");
            this.getView().setModel(new JSONModel({isEditing: false}), "editModel");


        },

        initPage: function () {
            const sHashParams = this.getRouter().getHashChanger().hash.replace("admin/material/", "");
            this.getProduct(sHashParams);
        },

        getProduct: async function (sHashParams) {
            return await this.get(URLs.getGeneralProduct() + "/" + sHashParams + "?&$expand=texts").then(async pr => {
                debugger;
                this.getView().getModel("productModel").setData(pr);
            }).catch(err => {
                this.messageHandler("getProductError")
            })
        },

        pressEdit: function () {
            this.getView().getModel().setProperty("/isEditing", true);
        },

        pressCancel: function () {
            this.getView().getModel().setProperty("/isEditing", false);
        }
    })
})
