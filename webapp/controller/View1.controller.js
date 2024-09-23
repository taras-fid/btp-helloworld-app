sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
 /** @param {typeof sap.ui.core.mvc.Controller} Controller */
function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("sap.btp.helloworldui5.controller.View1", {
        onInit: function () {
        },
        onPress: function () {
            MessageBox.alert("You have been alerted!");
        }
    });
});
