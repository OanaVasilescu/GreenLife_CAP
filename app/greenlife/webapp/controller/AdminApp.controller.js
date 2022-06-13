sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "greenlife/utils/URLs"
], function (BaseController, JSONModel, Fragment, Device, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.AdminApp", {

        onInit: function () {
            this.getRouter().getRoute("AdminApp").attachMatched(this.initPage, this);

            this.getView().setModel(new JSONModel(), "submissionsModel")
            this.getView().setModel(new JSONModel(), "mapPointsModel")
            this.getView().setModel(new JSONModel(), "productsModel")
            this.getView().setModel(new JSONModel(), "productsBarcodesModel")
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
            if (data.hasOwnProperty(city)) {
                this.updatePoint(data);
            } else {
                this.updateProduct(data);
            }
        },

        getMapPoints: async function () {
            return await this.get(URLs.getMapPoints()).then(async mapPoints => {
                this.getView().getModel("mapPointsModel").setData(mapPoints.value);
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getMapPointsError")
            })
        },

        getProducts: async function () {
            return await this.get(URLs.getGeneralProduct()).then(async mapPoints => {
                this.getView().getModel("productsModel").setData(mapPoints.value);
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getproductsError")
            })
        },

        getProductBarcodes: async function () {
            return await this.get(URLs.getExpandedProduct()).then(async mapPoints => {
                this.getView().getModel("productsBarcodesModel").setData(mapPoints.value);
                return mapPoints;
            }).catch(err => {
                this.messageHandler("getproductsError")
            })
        },

        updatePoint: function (point) {
            this.put(URLs.getMapPoints() + "/" + point.ID, point).then((res) => {
                this.getSubmissions();
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
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("editProductError")
                return;
            });
        },

        prepForUpdate: function (data) { // we remove expanded associations
            delete data.productTypes;
        }
    })
})
