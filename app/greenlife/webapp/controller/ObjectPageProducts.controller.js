sap.ui.define([
    "greenlife/controller/BaseController", 'sap/ui/model/json/JSONModel', "greenlife/utils/URLs",
], function (BaseController, JSONModel, URLs) {
    "use strict";

    return BaseController.extend("greenlife.controller.ObjectPageProducts", {
        onInit: function () {
            this.getRouter().getRoute("ObjectPageProducts").attachMatched(this.initPage, this);

            this.getView().setModel(new JSONModel(), "productModel");
            this.getView().setModel(new JSONModel({isEditing: false, data: null}), "editModel");
        },

        initPage: function () {
            const sHashParams = this.getRouter().getHashChanger().hash.replace("admin/material/", "");
            this.getProduct(sHashParams);
        },

        getProduct: async function (sHashParams) {
            return await this.get(URLs.getGeneralProduct() + "/" + sHashParams + "?&$expand=texts").then(async pr => {
                this.getView().getModel("productModel").setData(pr);

                let sAll = JSON.stringify(pr);
                let decoupledAll = JSON.parse(sAll);
                this.getView().getModel("editModel").setProperty("/data", decoupledAll);

            }).catch(err => {
                this.messageHandler("getProductError")
            })
        },

        pressEdit: function () {
            this.getView().getModel("editModel").setProperty("/isEditing", true);
        },

        pressCancel: function () {
            this.getView().getModel("editModel").setProperty("/isEditing", false);

            let data = this.getView().getModel("productModel").getData();
            let sAll = JSON.stringify(data);
            let decoupledAll = JSON.parse(sAll);
            this.getView().getModel("editModel").setProperty("/data", decoupledAll);
        },

        pressSave: function () {
            let data = this.getView().getModel("editModel").getProperty("/data");

            this.editProduct(data);
            this.getView().getModel("editModel").setProperty("/isEditing", false);
        },

        editProduct: async function (genProduct) {
            this.put(URLs.getGeneralProduct() + "/" + genProduct.ID, genProduct).then((res) => {
                this.getProduct(res.ID);
                return;
            }).catch((err) => {
                console.log(err);
                this.messageHandler("editGeneralProductError")
                return;
            });
        },

        translateTitleToRomanian: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data");
            let title = data.name;

            let translate = await this.translateTextButtonPress(title, "en", "ro");

            if (translate != undefined) {
                this.getView().getModel("editModel").setProperty("/data/texts/0/name", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateTitleToEnglish: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data/texts/0");
            let title = data.name;

            let translate = await this.translateTextButtonPress(title, "ro", "en");

            if (translate != undefined) {
                this.getView().getModel("editModel").setProperty("/data/name", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateCollectToRomanian: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data");
            let howToCollect = data.howToCollect;

            let translate = await this.translateTextButtonPress(howToCollect, "en", "ro");

            if (translate != undefined) {
                this.getView().getModel("editModel").setProperty("/data/texts/0/howToCollect", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateCollectToEnglish: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data/texts/0");
            let title = data.howToCollect;

            let translate = await this.translateTextButtonPress(title, "ro", "en");

            if (translate != undefined) {
                this.getView().getModel("editModel").setProperty("/data/howToCollect", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateInstructionToRomanian: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data");
            let recyclingInstructions = data.recyclingInstructions;

            let translate = await this.translateTextButtonPress(recyclingInstructions, "en", "ro");
            if (translate != undefined) {

                this.getView().getModel("editModel").setProperty("/data/texts/0/recyclingInstructions", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateInstructionToEnglish: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data/texts/0");
            let title = data.recyclingInstructions;

            let translate = await this.translateTextButtonPress(title, "ro", "en");
            if (translate != undefined) {

                this.getView().getModel("editModel").setProperty("/data/recyclingInstructions", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateRestrictionsToRomanian: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data");
            let recyclingRestrictions = data.recyclingRestrictions;

            let translate = await this.translateTextButtonPress(recyclingRestrictions, "en", "ro");

            if (translate != undefined) {
                this.getView().getModel("editModel").setProperty("/data/texts/0/recyclingRestrictions", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },

        translateRestrictionsToEnglish: async function () {
            let data = this.getView().getModel("editModel").getProperty("/data/texts/0");
            let recyclingRestrictions = data.recyclingRestrictions;

            let translate = await this.translateTextButtonPress(recyclingRestrictions, "ro", "en");
            if (translate != undefined) {
                this.getView().getModel("editModel").setProperty("/data/recyclingRestrictions", translate[0].translatedText)
            } else {
                this.messageHandler('textCouldNotBeTranslated');
            }
        },


        translateTextButtonPress: async function (text, srcLanguage, targetLanguage) {
            let response;
            // this.translateText(text);
            await this.post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBJuQmFUNshQD7svm_tjfObJRS-pXwXmLA&q=' + text + '&target=' + targetLanguage + '&source=' + srcLanguage).then(res => {
                response = res.data.translations;
            }).catch(err => {
                response = null;
                this.messageHandler("translateError");
            })

            return response;
        }
    })
})
