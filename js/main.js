var data;
var filter = {
  free: false,
  taget_group: {
    men: false,
    women: false,
    lgbt: false    
  }
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
    loopThroughEvents(data.data.event);
});
$("#listEvents").click(function (ev) {
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    $("#details").hide();
    loopThroughEvents(data.data.event);
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
    tmpEvent.title = $("#eventTitle")[0].value;
    tmpEvent.description = $("#eventDescription")[0].value;

    tmpEvent.attendees = {
        attendendee: []
    };
    data.data.event.push(tmpEvent);
    localStorage.setItem('eventData',JSON.stringify(data));
    $('#details').empty();
    let detailsPage = '<div class="col-xs-12 col-md-8 col-md-offset-2">'+
          '<div class="row">'+
            '<div class="col-xs-12">'+

            '</div>'+
          '</div>'+
          '<div class="row"><div class="col-xs-12"><p><h3 class="event-title">'+tmpEvent.title+
                  '<button id="backBtn" class="btn btn-default pull-right">Back</button>'+
                '</h3>'+
                '<img class="event-image" src="'+tmpEvent.eventImage+'">'+
              '</p></div><div class="col-xs-12"><div class="panel panel-info"><div class="panel-body">'+
                  '<div class="col-xs-12"><div class="row"><div class="event-time col-sm-6"><strong>Begin: </strong> '+ new Date(tmpEvent.timestampBegin) +
                      '</div><div class="event-time col-sm-6"><strong>End: </strong> '+ new Date(tmpEvent.timestampEnd) +
                      '</div><div class="event-detail col-sm-6"><strong>Venue: </strong>' + tmpEvent.description +
                      '</div><div class="event-detail col-sm-6"><strong>Entry: </strong>' + tmpEvent.price+
                      '</div></div></div></div></div></div><div class="col-xs-12"><div class="attending pull-right">Attending <span class="badge">'+
                       tmpEvent.attendees.attendendee.length +'</span></div><div class="caption"><div class="row"><div class="event-description col-xs-12">'+ tmpEvent.description +
                       '</div></div></div></div></div></div>'
    $("#details").append(eventeventsList);
});



var applyFilter = function(){
  console.log('aAAAAAAAAAA')
}

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
    for (var i = 0; i < events.length; i++) {
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
