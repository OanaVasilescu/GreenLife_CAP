sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs", "sap/ui/core/Fragment"
], function (BaseController, JSONModel, URLs, Fragment) {
    "use strict";

    return BaseController.extend("greenlife.controller.Report", {
        onInit: function () {
            this.getRouter().getRoute("Report").attachMatched(this.clearFields, this);

            this.getView().setModel(new JSONModel({logo: "pictures/dark-logo.png"}), "photoModel")
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

                let mail = this.formatMail(data);

                this.get(URLs.sendMail(), {data: mail}).then((res) => {
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

        onDialogClose: function () {
            this._oDialog.close();
        },

        formatMail: function (data) {
            let htmlText = "";
            if (data.isAnonymous) {
                htmlText = "<p>This data is sent anonymously through the <strong>GreenLife - Report Crime</strong> app</p> <p><br></p>"
            } else {
                htmlText = `<p>This data is sent by ${
                    data.firstName
                } ${
                    data.lastname
                }  through the <strong>GreenLife - Report Crime</strong> app</p> <p><br></p>`;

                htmlText = htmlText + "<p> Contact information:</p>"
                htmlText = htmlText + `<p> Email: ${
                    data.emailAdress
                } </p>`;
                htmlText = htmlText + `<p> Phone: ${
                    data.phoneNumber
                } </p>`;
                htmlText = htmlText + "<p><br></p>  <p><br></p>";
            };

            htmlText = htmlText + `<p>Description: ${
                data.problemDescription
            }</p>`;

            htmlText = htmlText + `<p>Location<strong>: ${
                data.adress
            }, ${
                data.city
            }, ${
                data.county
            }</strong></p>`

            if (data.individuals) {
                htmlText = htmlText + `<p>There are a number of <strong>${
                    data.individualsData.length
                } individuals</strong> reported to be seen. Here is all data available of them:</p>`;
                let index = 1;
                for (let ind of data.individualsData) {
                    htmlText = htmlText + `<p>
                        <strong>Individual ${index}</strong> - <em>${
                        ind.personDescription
                    }</em>
                    </p> `;

                    htmlText = htmlText + "<ul>"
                    if (ind.firstName) {
                        htmlText = htmlText + `<li>
                            <strong>First name: </strong>
                            <em>${
                            ind.firstName
                        }</em>
                        </li>`
                    }
                    if (ind.lastName) {
                        htmlText = htmlText + `<li>
                        <strong>Last name: </strong>
                        <em>${
                            ind.lastName
                        }</em>
                    </li>`
                    }
                    if (ind.address) {
                        htmlText = htmlText + `<li>
                        <strong>Address: </strong>
                        <em>${
                            ind.address
                        }</em>
                    </li>`
                    }
                    if (ind.city) {
                        htmlText = htmlText + `<li>
                        <strong>City: </strong>
                        <em>${
                            ind.city
                        }</em>
                    </li>`
                    }

                    if (ind.county) {
                        htmlText = htmlText + `<li>
                        <strong>County: </strong>
                        <em>${
                            ind.county
                        }</em>
                    </li>`
                    }
                    if (ind.age) {
                        htmlText = htmlText + `<li>
                        <strong>Age: </strong>
                        <em>${
                            ind.age
                        }</em>
                    </li>`
                    }

                    if (ind.gender) {
                        htmlText = htmlText + `<li>
                        <strong>Gender: </strong>
                        <em>${
                            ind.gender
                        }</em>
                    </li>`
                    }
                    if (ind.infoAboutVehicle) {
                        htmlText = htmlText + `<p>
                        <strong>Vehicle driven</strong> - <em>${
                            ind.vehicledescription
                        }</em>
                    </p> `;

                        htmlText = htmlText + "<ul>"
                        if (ind.brand) {
                            htmlText = htmlText + `<li>
                            <strong>Car brand: </strong>
                            <em>${
                                ind.brand
                            }</em>
                        </li>`
                        }
                        if (ind.year) {
                            htmlText = htmlText + `<li>
                            <strong>Year: </strong>
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
                            <strong>Licence plate: </strong>
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

        }
    });
});
