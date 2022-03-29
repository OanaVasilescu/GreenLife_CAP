sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.App", {
        onInit: function () {
            let oRouter = this.getRouter();
            oRouter.getRoute("RouteOverview").attachPatternMatched(this.getUserData, this);
            this.getView().setModel(new JSONModel(), "userDetailsModel");
        },

        onSideNavButtonPress: function () {
            let toolPage = this.byId("appTool");
            let isSideExpanded = toolPage.getSideExpanded();
            this._setToggleButtonTooltip(isSideExpanded);
            toolPage.setSideExpanded(! toolPage.getSideExpanded());
        },

        _setToggleButtonTooltip: function (bSideExpanded) {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            let oToggleButton = this.byId('sideNavigationToggleButton');
            let menuTooltipText = oResourceBundle.getText(bSideExpanded ? "expandMenuButtonText" : "collpaseMenuButtonText");
            oToggleButton.setTooltip(menuTooltipText);
        }
    });
});
