#!/usr/bin/gjs
Gtk = imports.gi.Gtk;
Gtk.init(null, 0);
myW = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
myW.title = "Button";
myW.connect("destroy", function(){Gtk.main_quit()});
grid = new Gtk.Grid();
myW.add(grid);
this.pbar = new Gtk.ProgressBar();
function foo(){
  this.pbar.pulse();
}
var button = new Gtk.Button({label: "Button"});
button.connect("clicked", foo);
grid.attach(button, 1, 1, 1, 1);
grid.attach_next_to(pbar, button, 3,1,1);
myW.show_all();
Gtk.main();
