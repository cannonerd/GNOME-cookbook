#!/usr/bin/gjs
Gtk = imports.gi.Gtk;
Gtk.init(null, 0);
myW = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL, default_width: 100});
myW.title = "TestForm";
myW.connect("destroy", function(){Gtk.main_quit()});
var grid = new Gtk.Grid();
myW.add(grid);
//plase Example Here:
var combo = new Gtk.ComboBox({border_width: 100, expand: true});
var label = new Gtk.Label({label: "label"});
var image = new Gtk.Image();
image.new_from_file("sus100.png");
combo.add(label);
//combo.add(image);
grid.add(combo);
myW.show_all();
Gtk.main();
