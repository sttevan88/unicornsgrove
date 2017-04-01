var data;
var filter = {
  free: false,
  crowd:"All"
}

$("#addEvent").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").hide();
    $("#addEvent").hide();
    $("#listEvents").hide();
    $("#create").show();
    $("#details").hide();
});
$("#cancelEvent").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    loopThroughEvents(data.data.event, filter);
});
$("#listEvents").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    $("#details").hide();
    loopThroughEvents(data.data.event, filter);
});
$("#backBtn").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    $("#navbar-filters").show();
});

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


$("#applyBtn").click( function(ev){
    ev.preventDefault();
    filter.free = $("#toggle-free").hasClass("active");
    filter.crowd = $("#crowd")[0].value;
    loopThroughEvents(data.data.event, filter);
});

var showDetails = function( index){
    //ev.preventDefault();
    console.log("piep");
    console.dir(data.data.event[index]);
    $("#eventsList").hide();
    $("#addEvent").hide();
    $("#listEvents").show();
    $("#create").hide();
    var tmpDetails = '';
    $("#details").show();
    $("#navbar-filters").hide();
    //console.dir($(ev.target));
}
var loopThroughEvents = function (events, filter) {
    $("#eventsList").empty();
    var tmpFilter = {
        free:false,
        crowd:false
    };
    for (var i = 0; i < events.length; i++) {
        for (var j = 0; i < events[i].tag; j++) {
            if (filter.free && events[i].tag[j] === "Free"){
                tmpFilter.free = true;
            }
            if (filter.crowd === "All" || filter.crowd === events[i].tag[j]){
                tmpFilter.crowd = true;
            }
        }
        //if (tmpFilter.free && tmpFilter.crowd){
            var eventeventsList = '<div onclick="return showDetails('+i+')" id="event'+i+'"class="event col-sm-6 col-md-4 col-lg-3">' +
            '<div class="thumbnail">' +
            '<div class="row">' +
            '<div class="col-xs-12">' +
            '<img class="event-image pull-left" src="' + events[i].eventImage + '" >' +
            '<h3 class="event-title">' + events[i].title + '</h3>' +
            '<div class="event-timestamp">' + new Date(events[i].timestampBegin) + '</div>' +
            '<div class="clearfix"></div>' +
            '</div>' +
            '<div class="col-xs-12">' +
            '<div class="caption">' +
            '<div class="row">' +
            '<div class="event-description col-xs-12">' + events[i].description + '</div>' +
            '<div class="col-xs-12 hidden-sm">' +
            '<hr>' +
            '</div>' +
            '<div class="event-details col-xs-12">' +
            '<div class="row">' +
            '<div class="event-detail col-xs-12">' +
            '<strong>Venue: </strong>' + events[i].location.name +
            '</div>' +
            '<div class="event-detail col-xs-12">' +
            '<strong>Entry: </strong>' + events[i].price +
            '</div>' +
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
           // }
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
    $("#details").hide();

    if (localStorage.getItem('eventData') !== null && localStorage.getItem('eventData').length > 20) {
        data = JSON.parse(localStorage.getItem('eventData'));
        console.log("get from localStorage %o", data);
        loopThroughEvents(data.data.event, filter);
    } else {
        $.getJSON('js/data/data.json', function (result) {
            data = result;
            console.log("get data from JSON %o", data);
            localStorage.setItem('eventData',JSON.stringify(data));
            loopThroughEvents(data.data.event, filter);
        });
    }
}

init();
