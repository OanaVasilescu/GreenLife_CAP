sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "greenlife/utils/URLs",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function (BaseController, JSONModel, URLs, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("greenlife.controller.SearchProduct", {
        onInit: function () {
            this.getRouter().getRoute("SearchProduct").attachPatternMatched(this._getProductList, this);
            this.getView().setModel(new JSONModel(), "productInstructionsModel");
        },

        _getProductList: async function () {
            await this.get(URLs.getAllProducts()).then(async (data) => {
                await this.getView().setModel(new JSONModel(data.value), "productsModel");
            }).catch((err) => { // TODO: if 404 ignore;
                this.messageHandler("getProductsErr");
            });
        },

        onFilterProducts: function (oEvent) { // build filter array
            let aFilter = [];
            let sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
            }

            let list = this.byId("productsLayout");
            let binding = list.getBinding("content");
            binding.filter(aFilter);
        },

        onPressProduct: async function (oEvent) {
            let pathToProduct = oEvent.getSource().getBindingContext("productsModel").sPath;
            let product = this.getView().getModel("productsModel").getProperty(pathToProduct);
            await this.getRecyclingInstructions(product.ID);
            if (!this.recyclingDialog) {
                this.recyclingDialog = this.loadFragment({name: "greenlife.view.fragments.ProductRecyclingDialog"});
            }
            this.recyclingDialog.then(function (dialog) {
                dialog.open();
            });
        },

        onCloseRecyclingDialog: function () {
            debugger;
            this.byId("recyclingDialog").close();
        },

        getRecyclingInstructions: async function (productId) {
            await this.get(URLs.getProductWithInstructions(productId)).then(async (data) => {
                this.getView().getModel("productInstructionsModel").setData(data);
            }).catch((err) => {
                this.messageHandler("productInstructionsError");
            });
        }
    });
});
