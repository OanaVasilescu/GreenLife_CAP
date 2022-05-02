sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.RecyclingMap", {
        onInit: function () {
            sap.ui.getCore().byId("container-webapp---App--app").setBackgroundImage("https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");


            let oMapConfig = {
                "MapProvider": [
                    {
                        "name": "GMAP",
                        "Source": [
                            {
                                "id": "s1",
                                "url": "https://mt.google.com/vt/x={X}&y={Y}&z={LOD}"
                            }
                        ]
                    }
                ],
                "MapLayerStacks": [
                    {
                        "name": "DEFAULT",
                        "MapLayer": {
                            "name": "layer1",
                            "refMapProvider": "GMAP",
                            "opacity": "1",
                            "colBkgnd": "RGB(255,255,255)"
                        }
                    }
                ]
            };

            this.getView().setModel(new JSONModel({config: oMapConfig}), "mapConfigModel")
        }
    });
});
