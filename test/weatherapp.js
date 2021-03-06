#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)
const WeatherService = imports.geonames;
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
const Lang = imports.lang;
const _ = imports.gettext.gettext;

function Application() {
  this._init();
}
Application.prototype = {
  _init: function() {
    this.application = new Gtk.Application({application_id: 'org.gnome.weatherapp'});
    var appwindow = new Gtk.ApplicationWindow({
      application: this.application, 
      window_position: Gtk.WindowPosition.CENTER, 
      hide_titlebar_when_maximized: true, 
      title: _("WeatherApp")
    });
 
    this.application.add_window(appwindow);
    /*
    this._initToolbar();
    this._initMenus();
    */
   /* this.entry = new Gtk.Entry();
    this.entry.set_width_chars(4);
    this.entry.set_max_length(4);
    
    this.label1 = new Gtk.Label({label: ""});
    this.label2 = new Gtk.Label({label: "Looking in the sky..."});   
    this.label3 = new Gtk.Label({label: ""});
    this.label4 = new Gtk.Label({label: "Enter ICAO station for weather: "});
    this.button1 = new Gtk.Button({label: "search!"});

    //some weather
    this.entry.connect("key_press_event", function(widget, event) {
      // FIXME: Get weather on enter (key 13)
      if (this.entry.get_text().length === 4) {
        // Enough is enough
        this._getWeatherForStation();
      }
      return false;
    });

    this.button1.connect("clicked", function(){
      this._getWeatherForStation();
    });                                                  */
    
  },

  _getWeatherForStation: function() {
    var station = entry.get_text();

    var GeoNames = new WeatherService.GeoNames(station); //"EFHF";

    GeoNames.getWeather(Lang.bind(this, function(error, weather) {
      //this here works bit like signals. This code will be run when we have weather.
      if (error) { 
        this.label2.set_text("Suggested ICAO station does not exist Try EFHF");
      }
      weatherIcon.file = GeoNames.getIcon(weather);
      
      this.label1.set_text("Temperature is " + weather.weatherObservation.temperature + " degrees.");
      if (weather.weatherObservation.weatherCondition !== "n/a"){
        this.label2.set_text("Looks like there is " + weather.weatherObservation.weatherCondition + " in the sky.");
      }
      else {
        this.label2.set_text("Looks like there is " + weather.weatherObservation.clouds + " in the sky.");
      }
      this.label3.set_text("Windspeed is " + weather.weatherObservation.windSpeed + " m/s")
      // ...
    }));
  },
  
  _initMenus: function() {
      this.label5 = new Gtk.Label({label: "this is a menu"});
    },
   
  _initToolbar: function() {
      this.label6= new Gtk.Label({label: "this is a toolbar"});
   },
  
  _initButton: function () {
      this.label7 = new Gtk.Label({label: "this is a button function"});
  }
};

var myApp = new Application();
