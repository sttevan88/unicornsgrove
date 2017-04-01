var data;

$("#addEvent").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").hide();
    $("#addEvent").hide();
    $("#listEvents").hide();
    $("#create").show();
});
$("#cancelEvent").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    loopThroughEvents(data.data.event);
});
$("#listEvents").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    loopThroughEvents(data.data.event);
});

// Put the object into storage


// Retrieve the object from storage
//var retrievedObject = localStorage.getItem('testObject');

//console.log('retrievedObject: ', JSON.parse(retrievedObject));

/*// Store
localStorage.setItem("lastname", "Smith");
// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");*/

$("#createEvent").click(function (ev) {
    ev.preventDefault();
    var tmpEvent = {};
    console.dir($("#eventTitle"));
    tmpEvent.title = $("#eventTitle")[0].value;
    tmpEvent.description = $("#eventDescription")[0].value;

    tmpEvent.attendees = {
        attendendee: []
    };
    console.dir(tmpEvent);
    data.data.event.push(tmpEvent);
    console.log("data");
    console.dir(data);
    localStorage.setItem('eventData',JSON.stringify(data));
});
var loopThroughEvents = function (events) {
    $("#eventsList").empty();
    for (var i = 0; i < events.length; i++) {
        var eventeventsList = '<div class="col-md-4">' +
            '<div class="thumbnail">' +
            '<div class="row">' +
            '<div class="col-sm-4 col-md-12">' +
            '<img class="event-image pull-left" src="https://s-media-cache-ak0.pinimg.com/originals/e9/d8/71/e9d871a35f3c095308e9f7a3daa8d61f.jpg" >' +
            '<h3 class="event-title">' + events[i].title + '</h3>' +
            '<div class="event-timestamp">' + events[i].timestampBegin + '</div>' +
            '<div class="clearfix"></div>' +
            '</div>' +
            '<div class="col-sm-8 col-md-12">' +
            '<div class="caption">' +
            '<div class="row">' +
            '<div class="event-description col-sm-6 col-md-12">' + events[i].description + '</div>' +
            '<hr class="visible-xs visible-lg">' +
            '<div class="event-details col-sm-6 col-md-12">' +
            '<div class="row">' +
            '<div class="col-xs-6 col-sm-12">' +
            '<strong>Venue:</strong>' + events[i].description +
            '</div>' +
            '<div class="col-xs-6 col-sm-12">' +
            '<strong>Venue:</strong>' + events[i].description +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="attending">Attending <span class="badge">' + events[i].attendees.attendendee.length + '</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="clearfix">' +
            '</div>';

        console.log("pieps");
        $("#eventsList").append(eventeventsList);
    }
}

$(document).scroll(function() {
  $('.navbar-fixed-top').toggleClass('nav-shadow', $(document).scrollTop() >= 50);
});

$(".btn-toggle").click(function (ev) {
    ev.preventDefault();
    $(this).toggleClass('active');
});

var init = function () {
    $("#create").hide();

    if (localStorage.getItem('eventData') !== undefined && localStorage.getItem('eventData').length > 20) {
        data = JSON.parse(localStorage.getItem('eventData'));
        console.log("get from localStorage %o", data);
        loopThroughEvents(data.data.event);
    } else {
        $.getJSON('js/data/data.json', function (result) {
            data = result;
            console.log("get data from JSON %o", data);
            localStorage.setItem('eventData',JSON.stringify(data));
            loopThroughEvents(data.data.event);
        });
    }
}

init();
