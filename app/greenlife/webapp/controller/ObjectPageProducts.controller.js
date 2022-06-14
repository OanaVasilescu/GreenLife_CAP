sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs"
], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.ObjectPageProducts", {
        onInit: function () {
            this.getRouter().getRoute("ObjectPageProducts").attachMatched(this.initPage, this);

            this.getView().setModel(new JSONModel(), "productModel");
            this.getView().setModel(new JSONModel({isEditing: false, data: null}), "editModel");
        },

        initPage: function () {
            const sHashParams = this.getRouter().getHashChanger().hash.replace("admin/material/", "");
            this.getProduct(sHashParams);
        },

        getProduct: async function (sHashParams) {
            return await this.get(URLs.getGeneralProduct() + "/" + sHashParams + "?&$expand=texts").then(async pr => {
                this.getView().getModel("productModel").setData(pr);

                let sAll = JSON.stringify(pr);
                let decoupledAll = JSON.parse(sAll);
                this.getView().getModel("editModel").setProperty("/data", decoupledAll);

            }).catch(err => {
                this.messageHandler("getProductError")
            })
        },

        pressEdit: function () {
            this.getView().getModel("editModel").setProperty("/isEditing", true);
        },

        pressCancel: function () {
            this.getView().getModel("editModel").setProperty("/isEditing", false);

            let data = this.getView().getModel("productModel").getData();
            let sAll = JSON.stringify(data);
            let decoupledAll = JSON.parse(sAll);
            this.getView().getModel("editModel").setProperty("/data", decoupledAll);
        },

        pressSave: function () {
            let data = this.getView().getModel("editModel").getProperty("/data");

            this.editProduct(data);
            this.getView().getModel("editModel").setProperty("/isEditing", false);
        },

        editProduct: async function (genProduct) {
            this.put(URLs.getGeneralProduct() + "/" + genProduct.ID, genProduct).then((res) => {
                this.getProduct(res.ID);
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("editGeneralProductError")
                return;
            });
        }
    })
})
