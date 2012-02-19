#!/usr/bin/gjs
Gtk = imports.gi.Gtk;
//Import stuff needed by your Example here


/*-------------------------------------------*/
Gtk.init(null, 0);
//Initialize stuff imported and needed by your example Here


/*-------------------------------------------*/
myW = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL, default_width: 100});
myW.title = "TestForm";
myW.connect("destroy", function(){Gtk.main_quit()});
var grid = new Gtk.Grid({border_width:10});
myW.add(grid);
//plase Example Here:

var toolbar = new Gtk.Toolbar();
toolbar.get_style_context().add_class(Gtk.STYLE_CLASS_PRIMARY_TOOLBAR);
toolbar.set_style(Gtk.ToolbarStyle.ICONS);
var buttonOpen = new Gtk.ToolButton.new_from_stock(Gtk.STOCK_OPEN);
toolbar.set_hexpand(true);
buttonOpen.connect("clicked", function() {
  //TODO: open a list of ICAO stations
  print("KLIKS!");
});
toolbar.insert(buttonOpen, 0)
//var label = new Gtk.Label({label: "This is window that has a toolbar"});
grid.attach(toolbar,1,1,1,1);
//grid.attach_next_to(label, toolbar,3,1,1);
/*-------------------------------------------*/
myW.show_all();
Gtk.main();
