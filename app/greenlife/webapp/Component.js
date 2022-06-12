sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "greenlife/model/models",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment",
], function (UIComponent, Device, models, JSONModel, Fragment) {
    "use strict";

    return UIComponent.extend("greenlife.Component", {
        metadata: {
            manifest: "json"
        },

        /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
        init: function () { // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            // enable routing
            this.getRouter().initialize();

            // this.setModel(models.createServiceModel(), "service");

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // try {
            //     this._createLaunchpadButton();
            // } catch (err) {
            //     console.log("create button:", err);
            // }

            let oRenderer = sap.ushell.Container.getRenderer("fiori2");

            // if (oRenderer) {
            //     oRenderer.addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem", {
            //         id: "myTestLink",
            //         ariaLabel: resources.i18n.getText("testLink.label"),
            //         target: "#SearchProduct",
            //         icon: "sap-icon://overflow"
            //     }, true, true);

            //     oRenderer.addUserAction({
            //         controlType: "sap.m.Button",
            //         oControlProperties: {
            //             id: "exampleButton",
            //             text: "Example Button",
            //             icon: "sap-icon://refresh",
            //             press: function () {
            //                 alert("Example Button was pressed!");
            //             }
            //         },
            //         bIsVisible: true,
            //         bCurrentState: true
            //     })

            //     oRenderer.addHeaderItem({
            //         id: "myTestButton",
            //         ariaLabel: resources.i18n.getText("testButton.label"),
            //         ariaHaspopup: "dialog",
            //         icon: "sap-icon://action-settings",
            //         tooltip: resources.i18n.getText("testButton.tooltip"),
            //         text: resources.i18n.getText("testButton.text"),
            //         press: this.handleTestButtonPress
            //     }, true, true);
            // }

            sap.ui.core.IconPool.registerFont({collectionName: "brands-icons", fontFamily: "fa-brands-400", fontURI: this.getManifestObject().resolveUri("./icons_awesome/webfonts"), lazy: false});
            sap.ui.core.IconPool.registerFont({collectionName: "regular-icons", fontFamily: "fa-regular-400", fontURI: this.getManifestObject().resolveUri("./icons_awesome/webfonts"), lazy: false});
            sap.ui.core.IconPool.registerFont({collectionName: "solid-icons", fontFamily: "fa-solid-900", fontURI: this.getManifestObject().resolveUri("./icons_awesome/webfonts"), lazy: false});

        },

        handleTestButtonPress: function (oEvent) {
            debugger;
        }
    });
});
