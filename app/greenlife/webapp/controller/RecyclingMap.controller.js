sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel',
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.RecyclingMap", {
        onInit: function () {

            let oMapConfig = {
                "MapProvider": [
                    {
                        "Id": "GM",
                        "name": "Google Maps",
                        "minLOD": "1",
                        "maxLOD": "19",
                        "tileX": "256",
                        "tileY": "256",
                        "copyright": "© Google Maps",
                        "Source": [
                            {
                                "id": "a",
                                "url": "https://mt1.googleapis.com/vt?x={X}&y={Y}&z={LOD}&key=AIzaSyBhyd-qk3-ALZmprJSSc2WXt2XUOoqeXjs"

                            }
                        ]
                    }
                ],
                "MapLayerStacks": [
                    {
                        "name": "Default",
                        "MapLayer": [
                            {
                                "name": "Default",
                                "refMapProvider": "Google Maps",
                                "opacity": "1.0",
                                "colBkgnd": "RGB(255,255,255)"
                            }
                        ]
                    }
                ]
            };

            this.getView().setModel(new JSONModel({config: oMapConfig}), "mapConfigModel")
        }
    });
});
