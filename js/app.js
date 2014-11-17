/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {
    function createMap(center, zoom) {
        var mapElem = document.getElementById('map');
        var mapOptions = {
            center: center,
            zoom: zoom

        };



        var map = new google.maps.Map(mapElem, mapOptions);

        var marker = new google.maps.Marker({
            position: center,
            map: map,
            animation: google.maps.Animation.DROP
        });

        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<h2>Here I am!</h2>');
        google.maps.event.addListener(marker, 'click', function() {

            infoWindow.open(map, marker); //the map u want to put, and which element you want to anchor it to.
            map.panTo(marker.getPosition());
        });

    }//createMap

    function onGeoSuccess(position) {
        var center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        createMap(center, 14);
    }// on geo success

    function onGeoError(error) {
        alert('YOU DENIED IT!');
    }//on Geo error

    var uwCords = {
        lat: 47.655,
        lng: -122.3080
    };

    if(navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true //to activate the device's GPS!
        });

    } //some old web does not have this feature
    else {
        createMap(uwCords, 14);
    }



});