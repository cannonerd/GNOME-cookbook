#!/usr/bin/gjs
Gtk = imports.gi.Gtk;
Gtk.init(null, 0);
myW = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
myW.title = "Button";
myW.connect("destroy", function(){Gtk.main_quit()});
grid = new Gtk.Grid();
myW.add(grid);
var button = new Gtk.Button({label: "Button"});
this.label = new Gtk.Label({label: ""});
//the signal that connects the click of the button to a event
button.connect("clicked", function(widget, event) {
  //clicking the button will make this happen
  this.label.set_text("Clicking a button makes things happen");
});
grid.attach(button, 1, 1, 1, 1);
grid.attach_next_to(this.label, button, 3, 1, 1);
myW.show_all();
Gtk.main();
