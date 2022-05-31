sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("greenlife.controller.Report", {
        onInit: function () {
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

            let IndividualsForm = this.createIndividualFragment("/individuals/0");
            this.getView().byId("individualsFragmentVBox").addItem(IndividualsForm)


            let runningOnPhone = sap.ui.Device.system.phone;
            if (! runningOnPhone) {
                this.getView().byId("formVBox").setWidth("50%");
            } else {
                this.getView().byId("formVBox").setWidth("100%");

                this.getView().byId("locationRB").setColumns(1);
                this.getView().byId("timeRB").setColumns(1);
            }
        },

        addIndividual: function () { // this.loadFragment({name: "greenlife.view.fragments.IndividualsForm"}).then((IndividualsForm) => {
            let individuals = this.getView().getModel("individualsModel").getData().individuals;
            let pathToIndividual = "/individuals/" + individuals.length;

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
            let IndividualsForm = this.createIndividualFragment(pathToIndividual);
            this.getView().byId("individualsFragmentVBox").addItem(IndividualsForm)
            // })
        },

        createIndividualFragment: function (pathToIndividual) {
            let container = new sap.m.VBox();

            container.setBackgroundDesign("Solid");
            container.addStyleClass("sapUiMediumMarginTop");
            container.addStyleClass("sapUiContentPadding");

            let box = new sap.m.HBox({justifyContent: "SpaceBetween", width: "100%"});
            let box2 = new sap.m.VBox().addItem(new sap.m.Title({text: "{i18n>individual}"})).addItem(new sap.m.Text({text: "{i18n>ifAnyInfo}"}))

            box.addItem(box2).addItem(new sap.m.Button({icon: "sap-icon://sys-cancel-2", type: "Transparent"}))

            container.addItem(box);


            box = new sap.m.VBox().addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/firstName}`, placeholder: "{i18n>firstName}"})).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/lastName}`, placeholder: "{i18n>lastname}"})).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/phone}`, placeholder: "{i18n>phoneNumber}"})).addStyleClass("sapUiMediumMarginTop")
            container.addItem(box);


            box = new sap.m.VBox().addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/age}`, placeholder: "{i18n>age}"})).addItem(new sap.m.Select({
                width: "100%",
                items: [
                    new sap.ui.core.Item(
                        {text: "{i18n>genderUnknown}"}
                    ),
                    new sap.ui.core.Item(
                        {text: "{i18n>male}"}
                    ),
                    new sap.ui.core.Item(
                        {text: "{i18n>female}"}
                    )
                ]
            })).addItem(new sap.m.Label({text: "{i18n>describePerson}"}).addStyleClass("sapUiMediumMarginTop")).addItem(new sap.m.TextArea({placeholder: "{i18n>enterText}", growing: true, growingMaxLines: 7, width: "100%"})).addStyleClass("sapUiMediumMarginTop")
            container.addItem(box);

            box = new sap.m.VBox().addItem(new sap.m.Label({text: "{i18n>infoAboutVehicle}", wrapping: true})).addItem(new sap.m.Switch({state: `{individualsModel>${pathToIndividual}/infoAboutVehicle}`, customTextOn: "Yes", customTextOff: "No"})).addStyleClass("sapUiMediumMarginTop")
            container.addItem(box);


            box = new sap.m.VBox({
                visible: `{individualsModel>${pathToIndividual}/infoAboutVehicle}`,
                items: [
                    new sap.m.Title(
                        {text: "{i18n>vehicleInfo}"}
                    ),
                    new sap.m.VBox(
                        {
                            items: [
                                new sap.m.Text(
                                    {
                                        text: "{i18n>vehicledescription}",
                                        wrapping: true
                                    },
                                ),
                                new sap.m.TextArea(
                                    {
                                        placeholder: "{i18n>enterText}",
                                        value: `{individualsModel>${pathToIndividual}/vehicledescription}`,
                                        growing: true,
                                        growingMaxLines: 7,
                                        width: "100%"
                                    }
                                )
                            ]
                        }
                    ).addStyleClass("sapUiMediumMarginTop"),
                    new sap.m.VBox(
                        {
                            width: "100%",
                            items: [
                                new sap.m.HBox(
                                    {
                                        width: "100%",
                                        alignContent: "SpaceBetween",
                                        items: [
                                            new sap.m.VBox(
                                                {width: "100%"}
                                            ).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/brand}`, placeholder: "{i18n>brand}"})).addStyleClass("sapUiTinyMarginEnd"),
                                            new sap.m.VBox(
                                                {width: "100%"}
                                            ).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/year}`, placeholder: "{i18n>year}"})).addStyleClass("sapUiTinyMarginEnd"),
                                            new sap.m.VBox(
                                                {width: "100%"}
                                            ).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/model}`, placeholder: "{i18n>model}"}))
                                        ]
                                    }
                                ),
                                new sap.m.HBox(
                                    {
                                        items: [
                                            new sap.m.VBox(
                                                {width: "100%"}
                                            ).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/color}`, placeholder: "{i18n>color}"})).addStyleClass("sapUiTinyMarginEnd"),
                                            new sap.m.VBox(
                                                {width: "100%"}
                                            ).addItem(new sap.m.Input({value: `{individualsModel>${pathToIndividual}/licencePlate}`, placeholder: "{i18n>licencePlate}"}))
                                        ]
                                    }
                                )
                            ]
                        }
                    )
                ]
            }).addStyleClass("sapUiMediumMarginTop")
            container.addItem(box);


            return container;
        },

        submitData: function () {
            let data = this.getView().getModel("dataModel").getData();
            let individuals = this.getView().getModel("individualsModel").getData().individuals;

            debugger;
        }
    });
});
