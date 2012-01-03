#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)

var Gtk, mywindow, label1;

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
brokenClouds.file = "weather-few-clouds.svg";
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
  label1 = new Gtk.Label({label: "Temperature is " + weather.weatherObservation.temperature + " degrees.\nLooks like there is " + weather.weatherObservation.clouds + " in the sky." + brokenClouds + "\nWindspeed is " + weather.weatherObservation.windSpeed + " m/s"});
} 
  else {
  label1("Failed getting the weather");
}
  weatherwindow.add(label1);
  weatherwindow.add(brokenClouds);
  //show everything you have done
  label1.show();
  brokenClouds.show();

weatherwindow.show();
//and run it
Gtk.main();
