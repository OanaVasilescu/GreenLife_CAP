sap.ui.define([
    "admin/greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "admin/greenlife/utils/URLs"
], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("admin.greenlife.controller.Overview", {
        onInit: function () {
            this.getRouter().getRoute("RouteOverview").attachMatched(this.initPage, this);

            this.getView().setModel(new JSONModel(), "historyModel")

        },

        initPage: function () {
            this.getView().getModel("historyModel").setProperty("/visibility", true)

            this.getHistory();
            this.clearPages();
            this.getView().getModel("historyModel").refresh();
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
            MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
        },

        getSplitAppObj: function () {
            var result = this.byId("adminApp");
            if (! result) {
                this.messageHandler("SplitAppobjectcantbefound");
            }
            return result;
        },

        getHistory: async function () {
            this.get(URLs.getHistory()).then((res) => {

                if (res.value.length != 0) {
                    res.value = res.value.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt)
                    });
                    this.getView().getModel("historyModel").setProperty("/items", res.value)
                    this.getView().getModel("historyModel").setProperty("/visibility", false)
                    this.getView().getModel("historyModel").refresh();
                }
            }).catch((err) => {
                console.log(err);
                this.messageHandler("getHistoryError")
            });
        },


        clearPages: function () {
            debugger;
        }
    });
});
