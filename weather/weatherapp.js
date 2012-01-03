#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)

var Gtk, weatherwindow, label1, label2, label3;

const GeoNames = imports.geonames;
//Bring your own library from same folder (as set in GJS_PATH). If using autotools .desktop will take care of this

Gtk = imports.gi.Gtk;
// Initialize the gtk
Gtk.init(null, 0);
//create your window, name it and connect the x to quit function. Remember that window is a taken word
weatherwindow = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
weatherwindow.title = "Todays weather";
//Window only accepts one widget and a title. Further structure with Gtk.boxes of similar
weatherwindow.connect("destroy", function(){Gtk.main_quit()});
//some icons
//TODO: clouds/conditon image selector probably as its own library
var weatherIcon = new Gtk.Image();

//Set some labels to your window
label1 = new Gtk.Label({label: ""});
label2 = new Gtk.Label({label: "Looking in the sky..."});   
label3 = new Gtk.Label({label: ""});
//TODO: rethink the boxes
var weather_box = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
weatherwindow.add(weather_box);
weather_box.pack_start(label1, false, false, 0);
weather_box.pack_start(label2, false, false, 0);
weather_box.pack_start(weatherIcon, false, false, 0);
weather_box.pack_start(label3, false, false, 0);
//show everything you have done
weather_box.show_all();
weatherwindow.show();

//some weather
//TODO: ask for ICAO code, link to the get button click.
var icao = "RPLL"; //"EFHF";
GeoNames.getWeather(icao, function(weather) {
//this here works bit like signals. This code will be run when we have weather.
  weatherIcon.file = GeoNames.getIcon(weather);
  
  label1.set_text("Temperature is" + weather.weatherObservation.temperature + " degrees.");
  label2.set_text("Looks like there is " + weather.weatherObservation.clouds + " in the sky.");   
  label3.set_text("Windspeed is " + weather.weatherObservation.windSpeed + " m/s")
  // ...
});

//and run it
Gtk.main();
