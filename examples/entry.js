#!/usr/bin/gjs
Gtk = imports.gi.Gtk;
//Import stuff needed by your Example here


/*-------------------------------------------*/
Gtk.init(null, 0);
//Initialize stuff imported and needed by your example Here


/*-------------------------------------------*/
myW = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
myW.title = "TestForm";
myW.connect("destroy", function(){Gtk.main_quit()});
grid = new Gtk.Grid();
myW.add(grid);
//plase Example Here:

var entry = new Gtk.Entry({text: "Write something here"});
entry.set_width_chars(50);
var label = new Gtk.Label({label: "This is an etry widget: "});
var connectionbutton = new Gtk.Button({label: "It's contents are connected to the label after this button"});
this.resultlabel = new Gtk.Label({
  label: "The contents of the entry will be here after you click the button"
});
connectionbutton.connect("clicked", function(widget, event) {
  var whatWasTyped = entry.get_text();
  this.resultlabel.set_text(whatWasTyped); 
});

grid.attach(label, 1, 1, 1, 1);
grid.attach_next_to(entry,label,1,1,1);
grid.attach_next_to(connectionbutton,label,3,1,1);
grid.attach_next_to(resultlabel,entry,3,1,1);
/*-------------------------------------------*/
myW.show_all();
Gtk.main();
