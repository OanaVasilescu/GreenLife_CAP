sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs", "sap/ui/core/Fragment"
], function (BaseController, JSONModel, URLs, Fragment) {
    "use strict";

    return BaseController.extend("greenlife.controller.Report", {
        onInit: function () {
            this.initShellBar();

            this.getRouter().getRoute("Report").attachMatched(this.clearFields, this);

            this.getView().setModel(new JSONModel({logo: this.getOwnerComponent().getManifestObject().resolveUri("pictures/dark-logo.png")}), "photoModel")
            this.getView().setModel(new JSONModel({
                isAnonymous: false,
                isReccuring: false,
                individuals: false,
                firstName: '',
                lastname: null,
                phoneNumber: null,
                emailAdress: null,
                adress: null,
                city: null,
                county: null,
                problemDescription: null
            }), "dataModel")

            this.getView().setModel(new JSONModel({
                individuals: [
                    {
                        firstName: "",
                        lastName: "",
                        phone: "",
                        address: "",
                        city: "",
                        county: "",
                        age: "",
                        race: "",
                        gender: "",
                        personDescription: "",
                        infoAboutVehicle: false,
                        vehicledescription: "",
                        brand: "",
                        year: "",
                        model: "",
                        color: "",
                        licencePlate: ""
                    }
                ]
            }), "individualsModel");

            let runningOnPhone = sap.ui.Device.system.phone;
            if (! runningOnPhone) {
                this.getView().byId("formVBox").setWidth("50%");
            } else {
                this.getView().byId("formVBox").setWidth("100%");

                this.getView().byId("locationRB").setColumns(1);
                this.getView().byId("timeRB").setColumns(1);
            }

            this.getView().setModel(new JSONModel({}), "mapModel");
            this.getView().setModel(new JSONModel([]), "mapPointModel");
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
                                "url": "https://mt1.googleapis.com/vt?x={X}&y={Y}&z={LOD}&key=AIzaSyBJuQmFUNshQD7svm_tjfObJRS-pXwXmLA",
                                // "url": "https://mt1.googleapis.com/vt?x={X}&y={Y}&z={LOD}&key=AIzaSyBhyd-qk3-ALZmprJSSc2WXt2XUOoqeXjs&center=48.21416667591101,-120.77405956241938&zoom=8&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d&size=480x360"
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
                            },

                        ]
                    },


                ]
            };

            this.getView().setModel(new JSONModel({config: oMapConfig}), "mapConfigModel");
        },

        addIndividual: function () {
            let individuals = this.getView().getModel("individualsModel").getData().individuals;

            individuals.push({
                firstName: "",
                lastName: "",
                phone: "",
                address: "",
                city: "",
                county: "",
                age: "",
                gender: "",
                personDescription: "",
                infoAboutVehicle: false,
                vehicledescription: "",
                brand: "",
                year: "",
                model: "",
                color: "",
                licencePlate: ""
            })
            this.getView().getModel("individualsModel").refresh();
        },

        removeIndividualFragment: function (oEvent) {
            let path = oEvent.getSource().getBindingContext("individualsModel").getPath();
            let arrayIndex = path.substr(path.length - 1);
            let model = this.getView().getModel("individualsModel");

            if (model.getProperty("/individuals").length == 1) {
                this.getView().getModel("dataModel").setProperty("/individuals", false);
                this.clearIndividuals();
                return
            }

            model.getProperty("/individuals").splice(arrayIndex, 1);
            model.refresh();
            return;
        },

        submitData: async function () {
            let input = this.getInputIds();
            if (await this.validateInputOnSubmit(input)) {
                let data = this.getView().getModel("dataModel").getData();
                let individuals = this.getView().getModel("individualsModel").getData().individuals;
                data.individualsData = individuals;

                if (data.isReccuring) {
                    data.happensEvery = this.getView().byId("timeRB").getSelectedButton().getCustomData()[0].getValue()
                }

                data.locationType = this.getView().byId("locationRB").getSelectedButton().getCustomData()[0].getValue()

                let mail = this.formatMail(data);

                this.post(URLs.sendMail(), {text: mail}).then((res) => {
                    this.clearFields();
                    this.handleOpenDialog();
                }).catch((err) => {
                    console.log(err);
                    this.messageHandler("submitMailError")
                });
            } else {
                this.messageHandler("invalidInput")
            }
        },

        getIndividualProperties: function () {
            return [
                "firstName",
                "lastName",
                "phone",
                "address",
                "city",
                "county",
                "age",
                "gender",
                "personDescription",
                "vehicledescription",
                "brand",
                "year",
                "model",
                "color",
                "licencePlate"
            ]
        },

        getDataModelProperties: function () {
            return [
                "firstName",
                "lastname",
                "phoneNumber",
                "emailAdress",
                "adress",
                "city",
                "county",
                "problemDescription"
            ]
        },

        getInputIds: function () {

            if (this.getView().getModel("dataModel").getData().isAnonymous) {
                this.getView().byId("firstName").setValueState("None");
                this.getView().byId("lastName").setValueState("None");
                this.getView().byId("phoneInput").setValueState("None");
                this.getView().byId("emailInput").setValueState("None");


                return ["placeDescriptionInput", "addressInput", "cityInput", "countyInput"]
            }
            return [
                "firstName",
                "lastName",
                "phoneInput",
                "emailInput",
                "placeDescriptionInput",
                "addressInput",
                "cityInput",
                "countyInput"
            ]
        },


        clearFields: function () {
            this.clearIndividuals();

            let dataModel = this.getView().getModel("dataModel");

            let dataModelProperties = this.getDataModelProperties();
            for (let property of dataModelProperties) {
                property = "/" + property;
                dataModel.setProperty(property, "");
            }
            dataModel.setProperty("/isAnonymous", false);
            dataModel.setProperty("/isReccuring", false);
            dataModel.setProperty("/individuals", false);

            return
        },

        clearIndividuals: function () {
            let individualsModel = this.getView().getModel("individualsModel");

            let individuals = individualsModel.getProperty("/individuals");
            while (individuals.length !== 1) {
                individuals.pop();
            };

            let properties = this.getIndividualProperties();
            for (let property of properties) {
                individuals[0][property] = ""
            }
            individuals[0].infoAboutVehicle = false;

            individualsModel.refresh();
        },

        handleOpenDialog: function () { // create value help dialog
            if (!this._oDialog) {
                Fragment.load({name: "greenlife.view.fragments.ReportDialog", controller: this}).then(function (oDialog) {
                    this._oDialog = oDialog;

                    this.getView().addDependent(this._oDialog);

                    this._oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },

        onDialogIllClose: function () {
            this._oDialog.close();
        },

        formatMail: function (data) {
            let htmlText = "";
            if (data.isAnonymous) {
                htmlText = "<p>Aceste date sunt trimise in mod anomin prin intermediul aplicatiei <strong>GreenLife - Report Crime</strong></p> <p><br></p>"
            } else {
                htmlText = `<p>Aceste date sunt trimise de catre ${
                    data.firstName
                } ${
                    data.lastname
                }  prin intermediul aplicatiei <strong>GreenLife - Report Crime</strong></p> <p><br></p>`;

                htmlText = htmlText + "<p> Informatii de contact:</p>"
                htmlText = htmlText + `<p> Email: ${
                    data.emailAdress
                } </p>`;
                htmlText = htmlText + `<p> Telefon: ${
                    data.phoneNumber
                } </p>`;
                htmlText = htmlText + "<p><br></p>  <p><br></p>";
            };

            htmlText = htmlText + `<p>Descrierea locului sau a activitatii: ${
                data.problemDescription
            }</p>`;

            htmlText = htmlText + `<p>Locatia<strong>: ${
                data.adress
            }, ${
                data.city
            }, ${
                data.county
            }</strong></p>`

            htmlText = htmlText + `<p>Locatia este  ${
                data.locationType
            }. </p>`;

            if (data.isReccuring) {
                htmlText = htmlText + `<p>Aceasta activitate este una recurenta, care se intampla de obicei  ${
                    data.happensEvery
                }</p> <p><br></p>`
            }

            if (data.individuals) {
                htmlText = htmlText + `<p>Exista un numar de <strong>${
                    data.individualsData.length
                } indivizi</strong> raportati a fi implicati. Acestea sunt toate datele disponibile despre ei:</p>`;
                let index = 1;
                for (let ind of data.individualsData) {
                    htmlText = htmlText + `<p>
                        <strong>Individ ${index}</strong> - <em>${
                        ind.personDescription
                    }</em>
                    </p> `;

                    htmlText = htmlText + "<ul>"
                    if (ind.firstName) {
                        htmlText = htmlText + `<li>
                            <strong>Prenume: </strong>
                            <em>${
                            ind.firstName
                        }</em>
                        </li>`
                    }
                    if (ind.lastName) {
                        htmlText = htmlText + `<li>
                        <strong>Nume: </strong>
                        <em>${
                            ind.lastName
                        }</em>
                    </li>`
                    }
                    if (ind.address) {
                        htmlText = htmlText + `<li>
                        <strong>Adresa: </strong>
                        <em>${
                            ind.address
                        }</em>
                    </li>`
                    }
                    if (ind.city) {
                        htmlText = htmlText + `<li>
                        <strong>Oras: </strong>
                        <em>${
                            ind.city
                        }</em>
                    </li>`
                    }

                    if (ind.county) {
                        htmlText = htmlText + `<li>
                        <strong>Judet: </strong>
                        <em>${
                            ind.county
                        }</em>
                    </li>`
                    }
                    if (ind.age) {
                        htmlText = htmlText + `<li>
                        <strong>Varsta: </strong>
                        <em>${
                            ind.age
                        }</em>
                    </li>`
                    }

                    if (ind.gender) {
                        htmlText = htmlText + `<li>
                        <strong>Sex: </strong>
                        <em>${
                            ind.gender
                        }</em>
                    </li>`
                    }
                    if (ind.infoAboutVehicle) {
                        htmlText = htmlText + `<p>
                        <strong>Informatii despre vehicul</strong> - <em>${
                            ind.vehicledescription
                        }</em>
                    </p> `;

                        htmlText = htmlText + "<ul>"
                        if (ind.brand) {
                            htmlText = htmlText + `<li>
                            <strong>Marca mașinii: </strong>
                            <em>${
                                ind.brand
                            }</em>
                        </li>`
                        }
                        if (ind.year) {
                            htmlText = htmlText + `<li>
                            <strong>An fabricatie: </strong>
                            <em>${
                                ind.year
                            }</em>
                        </li>`
                        }
                        if (ind.model) {
                            htmlText = htmlText + `<li>
                            <strong>Model: </strong>
                            <em>${
                                ind.model
                            }</em>
                        </li>`
                        }
                        if (ind.licencePlate) {
                            htmlText = htmlText + `<li>
                            <strong>Numar de inmatriculare: </strong>
                            <em>${
                                ind.licencePlate
                            }</em>
                        </li>`
                        };
                        htmlText = htmlText + "</ul>"
                    };

                    htmlText = htmlText + "</ul>";

                    index++;
                }
            }

            htmlText = htmlText.replace(/\s+/g, ' ').trim();

            return htmlText;

        },

        pressMap: function (oEvent) {
            let pointModel = this.getView().getModel("mapPointModel");

            pointModel.setProperty("/", [{
                    location: oEvent.getParameter('pos')
                }])
            pointModel.refresh();
        },


        loadMap: function () {
            if (!this.mapDialog) {
                Fragment.load({name: "greenlife.view.fragments.MapChooseLocationDialog", controller: this}).then(function (oDialog) {
                    this.mapDialog = oDialog;

                    this.getView().addDependent(this.mapDialog);

                    this.mapDialog.open();
                }.bind(this));
            } else {
                this.mapDialog.open();
            }

            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.close();
        },

        onDialogClose: function () {
            this.mapDialog.close();
        },

        openMapDialog: function () {
            let busyDialog = this.byId("BusyDialog"); // set page busy while everything loads
            busyDialog.open();
            let position;
            if (navigator.geolocation) {
                const success = (pos => { // Location found, show map with these coordinates
                    position = `${
                        pos.coords.longitude
                    };${
                        pos.coords.latitude
                    }`;
                    this.getView().getModel("mapModel").setProperty("/center", position)
                    this.getView().getModel("mapModel").setProperty("/initialZoom", 17)

                    this.loadMap();
                })
                const fail = (error => {
                    position = "21.24281;45.75142" // Failed to find location, show default map
                    this.getView().getModel("mapModel").setProperty("/center", position)
                    this.getView().getModel("mapModel").setProperty("/initialZoom", 13)

                    this.loadMap();
                })
                // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
                navigator.geolocation.getCurrentPosition(success, fail, {
                    maximumAge: 500000,
                    enableHighAccuracy: true,
                    timeout: 6000
                })
            } else {
                position = "21.24281;45.75142";
                this.getView().getModel("mapModel").setProperty("/center", position);
                this.getView().getModel("mapModel").setProperty("/initialZoom", 13)

                this.loadMap();
            }
        },

        chooseLocationButtonPress: function (oEvent) {

            let model = this.getView().getModel("mapPointModel");
            let inputModel = this.getView().getModel("dataModel");
            let location = model.getData()[0].location;
            const [long, ...rest] = location.split(';');

            let lat = rest[0];
            this.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBJuQmFUNshQD7svm_tjfObJRS-pXwXmLA`).then((res) => {
                let location = res.results[0].formatted_address;
                const [street, ...rest] = location.split(',');
                const [city, ...cityrest] = rest[0].split(" ");

                let county = res.results[0].address_components.find(el => el.long_name.includes('Jud'))
                if (county !== undefined) {
                    const [jud, ...countyname] = county.long_name.split(" ");
                    inputModel.setProperty("/county", countyname)
                } else {
                    inputModel.setProperty("/county", "-");
                };
                inputModel.setProperty("/adress", street);
                inputModel.setProperty("/city", cityrest[0]);
                inputModel.refresh();


                this.onDialogClose();
            }).catch((err) => {
                console.log(err);
                this.messageHandler("locationError");
            });
        }
    });
});
