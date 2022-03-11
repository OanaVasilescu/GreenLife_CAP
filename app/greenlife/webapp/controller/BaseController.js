sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "greenlife/utils/AjaxClient",
    "sap/m/MessageToast",
    "greenlife/utils/URLs",
    "sap/ui/model/json/JSONModel",
],
/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, AjaxClient, MessageToast, URLs, JSONModel) {
    "use strict";

    return Controller.extend("greenlife.controller.BaseController", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        get: function (url, data) {
            var sUrl = this.createUrl(url);

            return AjaxClient.get(sUrl, data);
        },

        post: function (url, data) {
            var sUrl = this.createUrl(url);

            return AjaxClient.post(sUrl, data);
        },

        delete: function (url) {
            var sUrl = this.createUrl(url);

            return AjaxClient.delete(sUrl);
        },

        put: function (url, data) {
            var sUrl = this.createUrl(url);

            return AjaxClient.put(sUrl, data);
        },

        createUrl: function (url) {
            return this.getOwnerComponent().getManifestObject().resolveUri(url);
            // return url;
        },

        messageHandler: function (errorMessageName) {
            let msg = this.getView().getModel("i18n").getResourceBundle().getText(errorMessageName);
            MessageToast.show(msg);
        },

        _getUserProjects: async function () {
            let aProjects;

            await new Promise((resolve, reject) => {
                this.get(URLs.getUser()).then((res) => {
                    resolve(res.user);
                }).catch((err) => {
                    MessageToast.show(err);
                    reject(err);
                });
            }).then(async (res) => {
                await this.get(URLs.getProjectByUserUrl(res)).then(async (projectsData) => {
                    aProjects = projectsData.value;
                    await this.getView().setModel(new JSONModel(aProjects), "projectsModel");
                    await this.getView().getParent().setModel(new JSONModel(aProjects), "projectsModel");
                }).catch((err) => {
                    that.messageHandler("errorGetUserProjects");
                });
            });
        },

        onInputChange: async function (oEvent) { // function used to validate inputs on change (XML)
            let source = oEvent.getSource();
            let sValue;
            let sId = source.getId();
            let sourceId = sId.slice(sId.lastIndexOf("-") + 1);
            if (sourceId !== "taskTypeSelect") 
                sValue = source.getValue();
             else 
                sValue = "Not relevant";
            


            let sValueState = "None";
            let bValid = await this._validateInput(sValue, sId);
            let errorOrWarning;
            if (sourceId == "description" || sourceId == "notes") {
                errorOrWarning = "Warning";
            } else {
                errorOrWarning = "Error";
            }
            if (! bValid) {
                sValueState = errorOrWarning;
            }
            source.setValueState(sValueState);
        },

        _validateInput: async function (sValue, sId) {
            let id = sId.slice(sId.lastIndexOf("-") + 1);
            if (sValue.trim() == "" && id != "description" && id != "notes") { // if the field is empty, return false, else verify for each input type
                return false;
            }
            switch (id) {
                case "projectNameInput":
                    return await this._validateProjectName(sValue.trim());
                case "taskNameInput":
                    return this._validateTaskName(sValue.trim());
                case "taskTypeSelect":
                    return this._validateSelect(sId);
                case "editTitle":
                    return await this._validateProjectName(sValue.trim());
                case "description":
                    return this._validateDescriptionAndNotes(sValue);
                case "notes":
                    return this._validateDescriptionAndNotes(sValue);
                default:
                    return false;
            }
        },

        _validateProjectName: async function (sValue) {
            let isProjectUpdated = this.getView().getModel("projectDetails").getProperty("/isProjectUpdated");
            let allProjects = this.getView().getParent().getModel("projectsModel");
            if (allProjects == undefined) {
                await this._getUserProjects();
                allProjects = this.getView().getParent().getModel("projectsModel"); // Not sure if this is needed or not
            }
            let findTitle = allProjects.getData().find((el) => el.title.trim() === sValue);

            if (findTitle == undefined) 
                return true;
            


            if (isProjectUpdated) {
                let thisProject = this.getView().getModel("projectModel").getData();
                let isSameProject = findTitle.ID === thisProject.ID;
                if (isSameProject) 
                    return true;
                


            }
            return false;
        },

        _validateDescriptionAndNotes: function (sValue) {
            if (sValue.length >= 300) 
                return false;
            


            return true;
        },

        _validateTaskName: function (sValue) {
            let projectTasks = this.getView().getModel("projectModel").getData().tasks;
            if (projectTasks == undefined) {
                return true;
            }

            let findName = projectTasks.find((el) => el.taskName.trim() === sValue);
            if (findName == undefined) 
                return true;
            


            return false;
        },

        _validateSelect: function (sId) {
            if (this.getView().byId(sId).getSelectedItem()) 
                return true;
            


            return false;
        },

        validateInputOnSubmit: async function (aInputs) { // validate inputs on pressing button
            let oView = this.getView();
            if (!Array.isArray(aInputs)) {
                let emptyArray = [];
                emptyArray.push(aInputs); // TODO: if it's not array, make it an array
                aInputs = emptyArray;
            }
            let bNoValidationError = true,
                bIsValid = true;
            for (const sId of aInputs) {
                if (sId !== "taskTypeSelect") {
                    bIsValid = await this._validateInput(oView.byId(sId).getValue(), sId);
                } else {
                    bIsValid = await this._validateInput("Not relevant", sId); // select does not have getValue
                } bNoValidationError = bIsValid && bNoValidationError;
                let errorOrWarning;
                switch (sId) {
                    case "description": errorOrWarning = "Warning";
                        break;
                    case "notes": errorOrWarning = "Warning"
                        break
                    default: errorOrWarning = "Error"
                        break;
                }

                if (! bIsValid) 
                    oView.byId(sId).setValueState(errorOrWarning);
                 else 
                    oView.byId(sId).setValueState("None");
                


            }
            if (bNoValidationError) {
                return true;
            } else {
                return false;
            }
        }
    });
});
