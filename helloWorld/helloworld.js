#!/usr/bin/gjs
//The previous line is a hash bang tells how to run the script.
// Note that the script has to be executable (run in terminal in the right folder: chmod +x scriptname)

var Gtk, mywindow, label;

Gtk = imports.gi.Gtk;
// Initialize the gtk
Gtk.init(null, 0);
//create your window, name it and connect the x to quit function. Remember that window is a taken word
mywindow = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
mywindow.title = "Hello World!";
mywindow.connect("destroy", function(){Gtk.main_quit()});
//Set some text to your window
label = new Gtk.Label({label: "Hello World"});
mywindow.add(label);
//show everything you have done
label.show();
mywindow.show();
//and run it
Gtk.main();
