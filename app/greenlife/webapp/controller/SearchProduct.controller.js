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
        },

        _getProductList: async function () {
            await this.get(URLs.getAllProducts()).then(async (data) => {
                await this.getView().setModel(new JSONModel(data), "productsModel");
            }).catch((err) => {
                this.messageHandler("getProductsErr");
            });
        },

        onFilterInvoices: function (oEvent) { // build filter array
            let aFilter = [];
            let sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            // filter binding
            // var oList = this.byId("invoiceList");
            // var oBinding = oList.getBinding("items");
            // oBinding.filter(aFilter);
            debugger;
        }
    });
});
