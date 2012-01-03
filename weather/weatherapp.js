#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)

var Gtk, weatherwindow, label1, label2, label3;

const Soup = imports.gi.Soup;
Gtk = imports.gi.Gtk;
// Initialize the gtk
Gtk.init(null, 0);
//create your window, name it and connect the x to quit function. Remember that window is a taken word
weatherwindow = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
weatherwindow.title = "Todays weather";
weatherwindow.connect("destroy", function(){Gtk.main_quit()});
//some icons
var brokenClouds = new Gtk.Image();
var wind = new Gtk.Image();
brokenClouds.file = "weather-few-clouds.svg";
wind.file = "weather-fog.svg";
//http://gnome-look.org/content/show.php/Humanity+Weather+Icons?content=115099
//some weather
var session = new Soup.SessionSync();
var request = Soup.Message.new('GET', 'http://api.geonames.org/weatherIcaoJSON?ICAO=EFHF&username=ihmissuski');
//http://www.geonames.org/export/JSON-webservices.html
var status = session.send_message(request);
if (status === 200) {
  // Request was OK
  var weatherJSON = request.response_body.data;
  var weather = JSON.parse(weatherJSON);

  //Set some text to your window
  label1 = new Gtk.Label({label: "Temperature is " + weather.weatherObservation.temperature + " degrees."});
  label2 = new Gtk.Label({label: "Looks like there is " + weather.weatherObservation.clouds + " in the sky."});   
  label3 = new Gtk.Label({label: "Windspeed is " + weather.weatherObservation.windSpeed + " m/s"});
} 
  else {
  label1 = new Gtk.Label({label: "Failed getting the weather"});
}
var weather_box = new Gtk.Box ({orientation: Gtk.Orientation.VERTICAL, spacing: 0});
weatherwindow.add(weather_box);
weather_box.pack_start(label1, false, false, 0);

weather_box.pack_start(label2, false, false, 0);
weather_box.pack_start(brokenClouds, false, false, 0);
weather_box.pack_start(label3, false, false, 0);
weather_box.pack_start(wind, false, false, 0);
//show everything you have done
weather_box.show_all();
weatherwindow.show();
//and run it
Gtk.main();
