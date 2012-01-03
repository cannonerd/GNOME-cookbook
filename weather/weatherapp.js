#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)

var Gtk, mywindow, label1, label2, label3;

const Soup = imports.gi.Soup;
Gtk = imports.gi.Gtk;
// Initialize the gtk
Gtk.init(null, 0);
//create your window, name it and connect the x to quit function. Remember that window is a taken word
weatherwindow = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
weatherwindow.title = "Todays weather";
weatherwindow.connect("destroy", function(){Gtk.main_quit()});
//some weather
var session = new Soup.SessionSync();
var request = Soup.Message.new('GET', 'http://api.geonames.org/weatherIcaoJSON?ICAO=EFHF&username=ihmissuski');
var status = session.send_message(request);
if (status === 200) {
  // Request was OK
  var weatherJSON = request.response_body.data;
  var weather = JSON.parse(weatherJSON);

  //Set some text to your window
  label1 = new Gtk.Label({label: "Temperature is " + weather.weatherObservation.temperature + " degrees. Sky is " + weather.weatherObservation.clouds + ". Windspeed is " + weather.weatherObservation.windSpeed + " m/s"});
} 
  else {
  label1("Failed getting the weather");
}
  weatherwindow.add(label1);
  //show everything you have done
  label1.show();

weatherwindow.show();
//and run it
Gtk.main();
