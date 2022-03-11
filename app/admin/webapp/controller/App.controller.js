sap.ui.define(["admin/controller/BaseController"], function (BaseController) {
    "use strict";

    return BaseController.extend("admin.controller.App", {
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
