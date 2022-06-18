sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "greenlife/utils/URLs",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], function (BaseController, JSONModel, Fragment, Device, URLs, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("greenlife.controller.AdminApp", {

        onInit: function () {
            this.getRouter().getRoute("AdminApp").attachMatched(this.initPage, this);
            let sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();

            this.initShellBar();

            this.getView().setModel(new JSONModel(), "submissionsModel")
            this.getView().setModel(new JSONModel(), "mapPointsModel")
            this.getView().setModel(new JSONModel(), "productsModel")
            this.getView().setModel(new JSONModel(), "productsBarcodesModel")
            this.getView().setModel(new JSONModel({locale: sCurrentLocale}), "languageModel");
        },

        initPage: function () {
            this.getView().getModel("submissionsModel").setProperty("/visibility", true)

            this.getSubmissions();

            this.getView().getModel("submissionsModel").refresh();

            this.getMapPoints();
            this.getProducts();
            this.getProductBarcodes();
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
            this.messageHandler("SplitContainermode");
        },

        getSplitAppObj: function () {
            var result = this.byId("adminApp");
            if (! result) {
                this.messageHandler("SplitAppobjectcantbefound");
            }
            return result;
        },

        getSubmissions: async function () {
            this.get(URLs.getSubmissions()).then((res) => {

                if (res.value.length != 0) {
                    res.value = res.value.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    });
                    this.getView().getModel("submissionsModel").setProperty("/items", res.value)
                    this.getView().getModel("submissionsModel").setProperty("/visibility", false)
                    this.getView().getModel("submissionsModel").refresh();
                } else {
                    this.getView().getModel("submissionsModel").setProperty("/visibility", true)
                }
            }).catch((err) => {
                console.log(err);
                this.messageHandler("getSubmissionsError")
            });
        },

        acceptSubmission: function (oEvent) {
            let path = oEvent.getSource().getBindingContext("submissionsModel").getPath();
            let data = this.getView().getModel("submissionsModel").getProperty(path);

            data.approved = "Approved";
            this.prepForUpdate(data);
            if (data.hasOwnProperty("city")) {
                this.updatePoint(data);
            } else {
                this.updateProduct(data);
            }

        },

        rejectSubmission: function (oEvent) {
            let path = oEvent.getSource().getBindingContext("submissionsModel").getPath();
            let data = this.getView().getModel("submissionsModel").getProperty(path);

            data.approved = "Rejected";
            this.prepForUpdate(data);
            if (data.hasOwnProperty("city")) {
                this.updatePoint(data);
            } else {
                this.updateProduct(data);
            }
        },

        getMapPoints: async function () {

            return await this.get(URLs.getMapPoints()).then(async mapPoints => {
                let final = mapPoints.value.filter(el => el.approved == 'Approved');
                this.getView().getModel("mapPointsModel").setData(final);
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getMapPointsError")
            })
        },

        getProducts: async function () {
            return await this.get(URLs.getGeneralProductWithTranslation()).then(async mapPoints => {
                this.getView().getModel("productsModel").setData(mapPoints.value);
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getproductsError")
            })
        },

        getProductBarcodes: async function () {
            return await this.get(URLs.getExpandedProduct()).then(async mapPoints => {
                let final = mapPoints.value.filter(el => el.approved == 'Approved');
                this.getView().getModel("productsBarcodesModel").setData(final);
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getproductsError")
            })
        },

        updatePoint: function (point) {
            this.put(URLs.getMapPoints() + "/" + point.ID, point).then((res) => {
                this.getSubmissions();
                this.getMapPoints();

                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("editPointError")
                return;
            });
        },

        updateProduct: function (product) {
            this.put(URLs.getProducts() + "/" + product.ID, product).then((res) => {
                this.getSubmissions();
                this.getProductBarcodes();

                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("editProductError")
                return;
            });
        },

        prepForUpdate: function (data) { // we remove expanded associations
            delete data.parent;
            delete data.productTypes;
        },

        pressItem: function (oEvent) {
            let productsModel = this.getView().getModel("productsModel");
            let path = oEvent.getSource().getBindingContext("productsModel").getPath()

            let ID = productsModel.getProperty(path).ID;
            this.getRouter().navTo("ObjectPageProducts", {id: ID});
        },


        deleteBarcode: function (oEvent) {
            let productsBarcodesModel = this.getView().getModel("productsBarcodesModel");
            let path = oEvent.getSource().getBindingContext("productsBarcodesModel").getPath()

            let id = productsBarcodesModel.getProperty(path).ID;
            this.delete(URLs.getProducts() + "/" + id).then(res => {
                this.getProductBarcodes();
            }).catch(err => {
                this.messageHandler("deletebarcodeerr")
            })
        },


        editMapPoint: function (oEvent) {
            let mapPointsModel = this.getView().getModel("mapPointsModel");
            let path = oEvent.getSource().getBindingContext("mapPointsModel").getPath()

            let id = mapPointsModel.getProperty(path).ID;

            this.getRouter().navTo("MapPointPage", {id: id});
        },

        deleteMapPoint: function (oEvent) {
            let mapPointsModel = this.getView().getModel("mapPointsModel");
            let path = oEvent.getSource().getBindingContext("mapPointsModel").getPath()

            let id = mapPointsModel.getProperty(path).ID;
            let point = mapPointsModel.getProperty(path);
            point.deleted = true;
            this.prepForUpdate(point);

            this.delete(URLs.getMapPoints() + "/" + id).then(res => {
                this.getMapPoints();
            }).catch(err => {
                this.messageHandler("deletebarcodeerr")
            })
        },


        onSearchProducts: function (oEvent) { // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                if (this.getView().getModel("languageModel").getProperty("/locale") == "ro" || this.getView().getModel("languageModel").getProperty("/locale") == "ro-RO") {
                    debugger;
                    var filter = new Filter("texts/0/name", FilterOperator.Contains, sQuery);
                } else {
                    var filter = new Filter("name", FilterOperator.Contains, sQuery);

                };
                aFilters.push(filter);
            }

            // update list binding
            var oList = this.byId("idPointsTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters, "Application");

        },

        onSearchProductsBarcodes: function (oEvent) { // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter("barcode", FilterOperator.Contains, sQuery);
                aFilters.push(filter);
            }

            // update list binding
            var oList = this.byId("idProductsBarcodesTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters, "Application");
        },

        onSearchProductsBarcodesByName: function (oEvent) { // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter("name", FilterOperator.Contains, sQuery);
                aFilters.push(filter);
            }

            // update list binding
            var oList = this.byId("idProductsBarcodesTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters, "Application");
        },

        onSearchMapPoints: function (oEvent) { // add filter for search
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter("locationAddress", FilterOperator.Contains, sQuery);
                aFilters.push(filter);
            }

            // update list binding
            var oList = this.byId("idProductsTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters, "Application");
        }
    })
})
