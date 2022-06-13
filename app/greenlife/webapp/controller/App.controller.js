sap.ui.define([
    "greenlife/controller/BaseController",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "greenlife/utils/URLs"
], function (BaseController, JSONModel, Fragment, Device, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.App", {

        onInit: async function () {
            let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();


            this.getView().setModel(new JSONModel(), "userDetailsModel");
            let isAdmin = await this.getUserData();
            let oModel = new JSONModel({
                    "items": [
                        {
                            "src": "sap-icon://home",
                            "title": oResourceBundle.getText("Home"),
                            "subTitle": oResourceBundle.getText("CentralHome"),
                            "visible": true
                        },
                        {
                            "src": "sap-icon://search",
                            "title": oResourceBundle.getText("searchProductTileTitle"),
                            "subTitle": oResourceBundle.getText("searchProductTileSubTitle"),
                            "visible": true
                        },
                        {
                            "src": "sap-icon://map-2",
                            "title": oResourceBundle.getText("mapTileTitle"),
                            "subTitle": oResourceBundle.getText("mapTileSubTitle"),
                            "visible": true
                        },
                        {
                            "src": "sap-icon://home-share",
                            "title": oResourceBundle.getText("reportTileTitle"),
                            "subTitle": oResourceBundle.getText("reportTileSubTitle"),
                            "visible": true
                        }, {
                            "src": "sap-icon://add-document",
                            "title": oResourceBundle.getText("submitTileTitle"),
                            "subTitle": oResourceBundle.getText("submitTileSubTitle"),
                            "visible": true
                        }, {
                            "src": "sap-icon://key-user-settings",
                            "title": oResourceBundle.getText("adminAppTileTitle"),
                            "subTitle": oResourceBundle.getText("adminAppTileSubTitle"),
                            "visible": isAdmin
                        }
                    ]
                }),
                oView = this.getView();
            this.getView().setModel(oModel);

            if (!this._pPopover) {
                this._pPopover = Fragment.load({id: oView.getId(), name: "greenlife.view.fragments.Nav", controller: this}).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    if (Device.system.phone) {
                        oPopover.setEndButton(new Button({text: "Close", type: "Emphasized", press: this.fnClose.bind(this)}));
                    }
                    return oPopover;
                }.bind(this));
            }


        },

        fnChange: function (oEvent) {
            let src = oEvent.getParameter("itemPressed").getId();

            switch (src) {
                case '__item0-__switch0-0':
                    this.getRouter().navTo("RouteOverview");
                    break;

                case '__item0-__switch0-1':
                    this.getRouter().navTo("SearchProduct");
                    break;

                case '__item0-__switch0-2':
                    this.getRouter().navTo("RecyclingMap");
                    break;

                case '__item0-__switch0-3':
                    this.getRouter().navTo("Report");
                    break;

                case '__item0-__switch0-4':
                    this.getRouter().navTo("Submit");
                    break;
                case '__item0-__switch0-5':
                    this.getRouter().navTo("AdminApp");
                    break;
                default:
                    this.getRouter().navTo("RouteOverview");
                    break;
            }
        },

        fnOpen: function (oEvent) {
            var oButton = oEvent.getParameter("button");
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oButton);
            });
        },

        fnClose: function () {
            this._pPopover.then(function (oPopover) {
                oPopover.close();
            });
        }
    });
});
