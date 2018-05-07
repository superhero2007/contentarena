/**
 * Created by JuanCruz on 4/1/2018.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SellForm from "./components/SellForm";
import store from './store';

const sellForm = document.getElementById('sell-form-container');

ReactDOM.render(
    <Provider store={store}>
        <SellForm {...sellForm.dataset } step={1} />
    </Provider>,
    sellForm
);

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Model = ContentArena.Model || {};
    ContentArena.Form = ContentArena.Form || {};
    ContentArena.Test = ContentArena.Test || {};

    $('#license-file-selector-hidden').checkFileType({
        allowedExtensions: [ 'pdf', 'doc', 'docx'],
        success: function() {
        },
        error: function() {
            $('<div />').html('File type not allowed. Please upload a .pdf, .doc or .docx file').dialog();
        }
    });

    $('#event-file-selector-hidden').checkFileType({
        allowedExtensions: ['jpg', 'jpeg','png', 'pdf', 'doc', 'docx'],
        success: function() {
            var targetId = "#" + $(this).attr("ref");
            $( targetId ).val($(this).val());
        },
        error: function() {
            var targetId = "#" + $(this).attr("ref");
            $( targetId ).attr("placeholder", "Allowed: .png, .jpg, .pdf, .doc, .docx").val("");
            $(this).val("");
            $('<div />').html('File type not allowed').dialog();
        }
    });

    $(document).on('click', "#download-csv-sheet", function() {
        window.location = envhosturl + "bundles/app/data/content-details.csv";
    });

    $('.website').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

    /**
     * Renders all the tooltips
     */
    $( document ).tooltip();

    $(".has-datepicker").datepicker();

    $(".optional").hide();
});