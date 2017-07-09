var events1 = [
    /*{
        'Date': new Date(2017, 6, 7),
        'Title': 'Doctor appointment at 3:25pm.'
    }, {
        'Date': new Date(2017, 6, 18),
        'Title': 'New Garfield movie comes out!',
        'Link': 'https://garfield.com'
    }, {
        'Date': new Date(2017, 6, 27),
        'Title': '25 year anniversary',
        'Link': 'https://www.google.com.au/#q=anniversary+gifts'
    },*/
    {
        "name": "Flag Day",
        "date": "2017-07-14",
        "observed": "2017-07-14",
        "public": false
    }, {
        "name": "Father's Day",
        "date": "2017-07-19",
        "observed": "2017-07-19",
        "public": false
    }, {
        "name": "Helen Keller Day",
        "date": "2017-07-27",
        "observed": "2016-06-27",
        "public": false
    }
];


/*This is a function to calculate future date base on one date + integer number of days*/

function addDates(startDate, noOfDaysToAdd) {
    var count = 0;
    while (count < noOfDaysToAdd) {
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        if (endDate.getDay() != 0 && endDate.getDay() != 6) {
            //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
            count++;
        }
    }
    return startDate;
}




console.log('evnet1--' + events1);
let events = [];
let tempEvents;
let date;
let daysToAdd;
let datesRange;

function callEndpoint(startDate,countryCode) {
    var inputDate = startDate.split('/', 3);
    var month = inputDate[0];
    var day = inputDate[1];
    var year = inputDate[2];
    var url = 'https://holidayapi.com/v1/holidays?key=e6d65dce-6edf-41f4-acdb-d7008f75a17d&country='+ countryCode+'&year=' + year + '&month=' + month;// + '&day=' + day + '&upcoming=true';



    $.getJSON(url, function(data, status, xhr) {
        //Errors
        // 400 Something is wrong on your end
        // 401 Unauthorized(did you remember your API key ? )
        // 402 Payment required(only historical data available is free)
        // 403 Forbidden(this API is HTTPS - only)
        // 429 Rate limit exceeded
        // 500 OH NOES!!~!Something is wrong on our end

        if (status == "success") {
            tempEvents = data['holidays'];
            console.log('--------=' + tempEvents);

            console.log(tempEvents);
            console.log('evnet2--' + tempEvents);
            var settings = {};
            var element = document.getElementById('caleandar');
            caleandar(element, tempEvents, settings);
        } else if (status == 400) {
            alert("Something is wrong on your end");
        } else if (status == 401) {
            alert("did you remember your API key?");
        } else if (status == 402) {
            alert("only historical data available is free");
        } else if (status == 403) {
            alert("this API is HTTPS-only");
        } else if (status == 500) {
            alert("Something is wrong on our end");
        }

    });


}



function validateForm() {
    var startDate = document.getElementById('startDate').value;
    var numberDays = document.getElementById('numberDays').value;
    var countryCode = document.getElementById('countryCode').value;
    if ((startDate == "") && (numberDays == "") && (countryCode == "")) {
        alert("Plese check the inputs");
        return false;
    } else {
        date = new Date(startDate);
        daysToAdd = numberDays;
        datesRange = date + " -- " + addDates(date, daysToAdd)
        document.getElementById('dates').innerHTML = datesRange;
        callEndpoint(startDate,countryCode);
        return false; // avoid to execute the actual submit of the form.
    }

}
