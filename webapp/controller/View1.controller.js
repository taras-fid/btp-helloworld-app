sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Dialog, Button, Text, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("sap.btp.helloworldui5.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel({
                inputValue: "",
                items: [
                    { name: "Item 1", value: 10 },
                    { name: "Item 2", value: 20 },
                    { name: "Item 3", value: 30 }
                ],
                total: 0
            });
            this.getView().setModel(oModel);
        },

        onLiveChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            this.getView().getModel().setProperty("/inputValue", sValue);
        },

        onPress: function () {
            var oModel = this.getView().getModel();
            var sInputValue = oModel.getProperty("/inputValue");

            if (!sInputValue || sInputValue.trim() === "") {
                MessageBox.error("Please enter a valid value.");
                return;
            }

            this._showDialog(sInputValue);
        },

        onFilterTable: function (oEvent) {
            var sQuery = oEvent.getParameter("value");
            var oTable = this.byId("dataTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];
            if (sQuery && sQuery.length > 0) {
                aFilters.push(new Filter("name", FilterOperator.Contains, sQuery));
            }
            oBinding.filter(aFilters);
        },

        onCalculateTotal: function () {
            var oModel = this.getView().getModel();
            var aItems = oModel.getProperty("/items");
            var iTotal = aItems.reduce(function (sum, item) {
                return sum + item.value;
            }, 0);

            oModel.setProperty("/total", iTotal);
        },

        _showDialog: function (sMessage) {
            if (!this._oDialog) {
                this._oDialog = new Dialog({
                    title: "Submitted Value",
                    content: new Text({ text: sMessage }),
                    beginButton: new Button({
                        text: "OK",
                        press: function () {
                            this._oDialog.close();
                        }.bind(this)
                    })
                });

                this.getView().addDependent(this._oDialog);
            } else {
                this._oDialog.getContent()[0].setText(sMessage);
            }

            this._oDialog.open();
        }
    });
});
