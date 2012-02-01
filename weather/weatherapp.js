#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)

var Gtk, weatherwindow, label1, label2, label3;

const WeatherService = imports.geonames;
//Bring your own library from same folder (as set in GJS_PATH). If using autotools .desktop will take care of this

Gtk = imports.gi.Gtk;
// Initialize the gtk
Gtk.init(null, 0);
//create your window, name it and connect the x to quit function. Remember that window is a taken word
weatherwindow = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
weatherwindow.title = "Todays weather";
//Window only accepts one widget and a title. Further structure with Gtk.boxes of similar
weatherwindow.connect("destroy", function(){Gtk.main_quit()});
//We initialize the icon here, but deside the file later in geonames.js.
var weatherIcon = new Gtk.Image();

//Set some labels to your window
label1 = new Gtk.Label({label: ""});
label2 = new Gtk.Label({label: "Looking in the sky..."});   
label3 = new Gtk.Label({label: ""});
//TODO: rethink the boxes
var weather_box = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
weatherwindow.add(weather_box);

var icao_box = new Gtk.Box ({orientation: Gtk.Orientation.HORIZONTAL, spacing: 0});
var labelicon_box = new Gtk.Box ({orientation: Gtk.Orientation.HORIZONTAL, spacing: 0});
weather_box.add(icao_box);
weather_box.add(labelicon_box);
var entry = new Gtk.Entry();
entry.set_width_chars(5);
var label4 = new Gtk.Label({label: "Enter ICAO station for weather: "});
var button1 = new Gtk.Button({label: "search!"});
icao_box.add(label4, false, false, 0);
icao_box.add(entry, false, false, 0);
icao_box.add(button1, false, false, 0);
var weather_label = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
var weather_icon = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
labelicon_box.pack_start(weather_label, false, false, 0);
labelicon_box.pack_start(weather_icon, true, true, 0);
weather_label.add(label1, false, false, 0);
weather_label.add(label2, false, false, 0);
weather_label.add(label3, false, false, 0);
weather_icon.add(weatherIcon, true, true, 0);
//show everything you have done
icao_box.show_all();
labelicon_box.show_all();
weather_box.show_all();
weather_label.show_all();
weather_icon.show_all();
weatherwindow.show();

//some weather

var station;
var GeoNames;
button1.connect("clicked", function(){
station = entry.get_text();

GeoNames = new WeatherService.GeoNames(station); //"EFHF";

GeoNames.getWeather(function(error, weather) {
  //this here works bit like signals. This code will be run when we have weather.
  if (error) { 
  //TODO: show error somehow
  return; }
  weatherIcon.file = GeoNames.getIcon(weather);
  
  label1.set_text("Temperature is " + weather.weatherObservation.temperature + " degrees.");
  if (weather.weatherObservation.weatherCondition !== "n/a"){
    label2.set_text("Looks like there is " + weather.weatherObservation.weatherCondition + " in the sky.");
    }
  else {
    label2.set_text("Looks like there is " + weather.weatherObservation.clouds + " in the sky.");
  }
  label3.set_text("Windspeed is " + weather.weatherObservation.windSpeed + " m/s")
  // ...
});

});

//and run it
Gtk.main();

//TODO: A map that shows every weather station(at first just ICAOs) with a small wind arrow pointing the wind direction. Clicking on the stations will show you that stations weather. Somewhat a be your own meteorologis app.
