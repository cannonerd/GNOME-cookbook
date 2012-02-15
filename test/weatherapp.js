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
    var appwindow = new Gtk.ApplicationWindow({ application: this.application, window_position: Gtk.WindowPosition.CENTER, hide_titlebar_when_maximized: true, title: _("WeatherApp") });
    this.application.add_window(appwindow);
    this.application.connect('activate', Lang.bind(this, this._initToolbar));
    this.application.connect('activate', Lang.bind(this, this._initMenu));

    this.entry = new Gtk.Entry();
    this.entry.set_width_chars(4);
    this.entry.set_max_length(4);
    var label4 = new Gtk.Label({label: "Enter ICAO station for weather: "});
    var button1 = new Gtk.Button({label: "search!"});

    //some weather
    this.entry.connect("key_press_event", function(widget, event) {
      // FIXME: Get weather on enter (key 13)
      if (this.entry.get_text().length === 4) {
        // Enough is enough
        this._getWeatherForStation();
      }
      return false;
    });

    button1.connect("clicked", function(){
      this._getWeatherForStation();
    });
    
    },

    _getWeatherForStation: function() {
      var station = entry.get_text();

      var GeoNames = new WeatherService.GeoNames(station); //"EFHF";

      GeoNames.getWeather(function(error, weather) {
        //this here works bit like signals. This code will be run when we have weather.
        if (error) { 
          label2.set_text("Suggested ICAO station does not exist Try EFHF");
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
    },
    
    _initMenus: function() {
    let quitAction = new Gio.SimpleAction({ name: 'quit' });
	  quitAction.connect('activate', Lang.bind(this,function() {this._mainWindow.window.destroy();
	  }));
	  this.application.add_action(quitAction);
	  let menu = new Gio.Menu();
	  menu.append(_("Quit"), 'app.quit');

    this.application.set_app_menu(menu);
    },
     
    _initToolbar: function() {
    //toolbar-stuff
    var mytoolbar = new Gtk.Toolbar();
    mytoolbar.get_style_context().add_class(Gtk.STYLE_CLASS_PRIMARY_TOOLBAR); 
    mytoolbar.set_style(Gtk.ToolbarStyle.ICONS);
    mytoolbar.show();
    var buttonOpen = new Gtk.ToolButton.new_from_stock(Gtk.STOCK_OPEN);
    buttonOpen.connect('clicked', Lang.bind(this, this._initButton));
    },
    
    _initButton: function () {let clickedAction = new Gio.SimpleAction({ name: 'clicked' });
    clickedAction.connect("button-clicked", Lang.bind(this,function() {print("KLIKS!");}));
    //TODO: open a list of ICAO stations
    buttonOpen.add.action(clickedAction);
    }
};

var myApp = new Application();
