'use strict'

angular.module('yoStormApp')
    .service('HourFormat', function() {
        this.apply = function(hour) {
        var hourFormatted; 
        switch (hour) {
        case 6:
        hourFormatted = "6 am";
        break;
        case 7:
        hourFormatted = "7 am";
        break;
        case 8:
        hourFormatted = "8 am";
        break;
        case 9:
        hourFormatted = "9 am";
        break;
        case 10:
        hourFormatted = "10 am";
        break;
        case 11:
        hourFormatted = "11 am";
        break;
        case 12:
        hourFormatted = "12 pm";
        break;
        case 13:
        hourFormatted = "1 pm";
        break;
        case 14:
        hourFormatted = "2 pm";
        break;
        case 15:
        hourFormatted = "3 pm";
        break;
        case 16:
        hourFormatted = "4 pm";
        break;
        case 17:
        hourFormatted = "5 pm";
        break;
        case 18:
        hourFormatted = "6 pm";
        break;
        case 19:
        hourFormatted = "7 pm";
        break;
        case 20:
        hourFormatted = "8 pm";
        break;
        case 21:
        hourFormatted = "9 pm";
        break;
        case 22:
        hourFormatted = "10 pm";
        break;
        }
        return hourFormatted;
    }
});

       