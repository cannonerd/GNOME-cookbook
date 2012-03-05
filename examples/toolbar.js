#!/usr/bin/gjs
Gtk = imports.gi.Gtk;
Gtk.init(null, 0);

myW = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL, default_width: 200});
myW.title = "Toolbar";
myW.connect("destroy", function(){Gtk.main_quit()});
var grid = new Gtk.Grid({border_width:10});
myW.add(grid);
var toolbar = new Gtk.Toolbar();
toolbar.get_style_context().add_class(Gtk.STYLE_CLASS_PRIMARY_TOOLBAR);
toolbar.set_style(Gtk.ToolbarStyle.ICONS);
var buttonOpen = new Gtk.ToolButton.new_from_stock(Gtk.STOCK_OPEN);
toolbar.set_hexpand(true);
buttonOpen.connect("clicked", function() {
  var dialog = new Gtk.Dialog({title:"Dialog", deletable: true});
  dialog.add_button(Gtk.STOCK_OK, -7);
  dialog.show_all();
  dialog.run();
  dialog.destroy();
});
toolbar.insert(buttonOpen, 0)
grid.attach(toolbar,1,1,1,1);

myW.show_all();
Gtk.main();
