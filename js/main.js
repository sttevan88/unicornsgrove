var data = {
 "data": {
   "event": [
     {
       "title": "X-B-Liebig: Konzert \"Light the Bob\", \"Chappi Bourgoise\" und \"Itaca\".",
       "description": "enjoy \"Light the Bob\", \"Chappi Bourgoise\" und \"Itaca\".",
       "timestampBegin": "2017-04-01T12:20:00+01:00",
       "timestampEnd": "2017-04-01T12:23:00+01:00",
       "location": {
         "name": "X-B_Liebig",
         "location-id": "xbeliebig",
         "street": "Liebigstrasse 34",
         "city": "Berlin",
         "latitude": "52.518130",
         "longitude": "13.456940"
       },
       "price": "Eintritt: Spende.",
       "tags": {
         "tag": [
           "Musik",
           "Soli"
         ]
       },
       "attendees": {
         "attendendee": [
           "Peter1",
           "matthew27"
         ]
       },
       "public": "false",
       "creator": "user27",
       "timestampOfCreation": "2017-03-21T12:23:00+01:00"
     },
     {
       "title": "Vesper something.",
       "description": "enjoy Zwölf Apostel Kirche",
       "timestampBegin": "2017-04-01T12:20:00+01:00",
       "timestampEnd": "2017-04-01T12:23:00+01:00",
       "location": {
         "name": "Zwölf Apostel Kirche",
         "location-id": "ZwölfApostelKirche",
         "latitude": "52.500664",
         "longitude": "13.358781"
       },
       "price": "Eintritt: 99,-€",
       "tags": {
         "tag": [
           "Irgendwas",
           "Soli"
         ]
       },
       "attendees": {
         "attendendee": [
           "Mona13",
           "matthew27"
         ]
       },
       "public": "true",
       "host": {
         "name": "Stuart",
         "image": "https://unicornsintech.slack.com/files/reaz/F4SCFG509/image_uploaded_from_ios.jpg"
       },
       "creator": "matthew27",
       "timestampOfCreation": "2017-03-01T12:23:00+01:00"
     }
   ]
 }
};
localStorage.setItem('eventData', JSON.stringify(data));

$("#addEvent").click(function(ev){
    ev.preventDefault();
    $("#eventsList").hide();
    $("#addEvent").hide();
    $("#listEvents").hide();
    $("#create").show();
});
$("#cancelEvent").click(function(ev){
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
});
$("#listEvents").click(function(ev){
    ev.preventDefault();
    $("#eventsList").show();
    $("#addEvent").show();
    $("#listEvents").show();
    $("#create").hide();
    loopThroughEvents(data.data.event);
    //displayEvent(data.data.event);
});

var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage


// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));

/*// Store
localStorage.setItem("lastname", "Smith");
// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");*/

$("#createEvent").click(function(ev){
    ev.preventDefault();
    var tmpEvent = {};
    console.dir($("#eventTitle"));
    tmpEvent.title = $("#eventTitle")[0].value;
    tmpEvent.description = $("#eventDescription")[0].value;
    console.dir(tmpEvent);
    console.log("data");
    console.dir(data);
    data.data.event.push(tmpEvent);
    console.dir(data);
});
var loopThroughEvents = function(events){
    $("#eventsList").empty();
    for(var i = 0; i<data.data.event.length; i++){
    var eventeventsList ='<div class="col-md-4">'+
                          '<div class="thumbnail">'+
                            '<div class="row">'+
                              '<div class="col-sm-4 col-md-12">'+
                                '<img class="event-image pull-left" src="https://s-media-cache-ak0.pinimg.com/originals/e9/d8/71/e9d871a35f3c095308e9f7a3daa8d61f.jpg" >'+
                                '<h3 class="event-title">'+data.data.event[i].title+'</h3>'+
                                '<div class="event-timestamp">'+data.data.event[i].timestampBegin+'</div>'+
                                '<div class="clearfix"></div>'+
                              '</div>'+
                              '<div class="col-sm-8 col-md-12">'+
                                '<div class="caption">'+
                                  '<div class="row">'+
                                    '<div class="event-description col-sm-6 col-md-12">'+data.data.event[i].description+'</div>'+
                                    '<hr class="visible-xs visible-lg">'+
                                    '<div class="event-details col-sm-6 col-md-12">'+
                                      '<div class="row">'+
                                        '<div class="col-xs-6 col-sm-12">'+
                                          '<strong>Venue:</strong>'+ data.data.event[i].description +
                                        '</div>'+
                                        '<div class="col-xs-6 col-sm-12">'+
                                          '<strong>Venue:</strong>'+ data.data.event[i].description +
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'+
                              '<div class="attending">Attending <span class="badge">'+data.data.event[i].attendees.attendendee.length+'</span></div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="clearfix">'+
                        '</div>';
    console.log("pieps");
    $( "#eventsList" ).append(eventeventsList);
    }
}
var init = function(){
    $("#create").hide();
    loopThroughEvents(data.data.event);
    if (localStorage.getItem('eventData') === undefined){
        var retrievedObject = localStorage.getItem('eventData');
    } else {

    }
}
init();
