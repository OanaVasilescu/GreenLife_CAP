sap.ui.define([
    "sap/ui/core/UIComponent", "sap/ui/Device", "greenlife/model/models", 'sap/ui/model/json/JSONModel',
], function (UIComponent, Device, models, JSONModel) {
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

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            sap.ui.core.IconPool.registerFont({collectionName: "brands-icons", fontFamily: "fa-brands-400", fontURI: this.getManifestObject().resolveUri("./icons_awesome/webfonts"), lazy: false});
            sap.ui.core.IconPool.registerFont({collectionName: "regular-icons", fontFamily: "fa-regular-400", fontURI: this.getManifestObject().resolveUri("./icons_awesome/webfonts"), lazy: false});
            sap.ui.core.IconPool.registerFont({collectionName: "solid-icons", fontFamily: "fa-solid-900", fontURI: this.getManifestObject().resolveUri("./icons_awesome/webfonts"), lazy: false});

        }
    });
});
