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
var grid = new Gtk.Grid();
myW.add(grid);
//plase Example Here:


grid.add(/*example thing*/);
/*-------------------------------------------*/
myW.show_all();
Gtk.main();
