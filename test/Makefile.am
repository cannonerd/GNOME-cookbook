# The actual runnable program is set to the SCRIPTS primitive. Prefix bin_ tells where to copy this
bin_SCRIPTS = weatherapp.js geonames.js weatherapp.sh
# List of files to be distributed
EXTRA_DIST=  \
    $(bin_SCRIPTS) \
    $(private_icons)	\
	  $(NULL)

CLEANFILES =

# The desktop files    
desktopdir = $(datadir)/applications
desktop_DATA =weatherapp.desktop

# convenience command for doing Makefile variable substitutions in non-Makefile
# files (scripts, service files, etc.)
do_subst = sed -e 's|@abs_top_srcdir[@]|$(abs_top_srcdir)|g' \
               -e 's|@abs_top_builddir[@]|$(abs_top_builddir)|g' \
               -e 's|@localedir[@]|$(localedir)|g' \
               -e 's|@bindir[@]|$(bindir)|g' \
               -e 's|@libexecdir[@]|$(libexecdir)|g' \
	       -e 's|@pkglibdir[@]|$(pkglibdir)|g' \
	       -e 's|@pkgdatadir[@]|$(pkgdatadir)|g' \
	       -e 's|@have_libnotify[@]|$(HAVE_LIBNOTIFY)|g' \
	       -e 's|@have_libsoup[@]|$(HAVE_LIBSOUP)|g' \
	       -e 's|@have_cheese[@]|$(HAVE_CHEESE)|g'

weatherapp.sh: weatherapp.sh.in
	$(AM_V_GEN) $(do_subst) $< > $@
	chmod +x $@
	
CLEANFILES += weatherapp.sh
EXTRA_DIST += weatherapp.sh.in

#the application icon
appicondir=$(datadir)/icons/hicolor/scalable/apps
appicon_DATA=weather-icon.svg

#icons in the application
NULL =

private_icons = \
	weather-clear.svg \
  weather-few-clouds.svg \
  weather-fog.svg \
  weather-icon.svg \
  weather-overcast.svg \
  weather-showers.svg \
  weather-showers-scattered.svg \
  weather-snow.svg \
  $(NULL)
  
install-icons:
	for icon in $(private_icons); do \
		mkdir -p $(DESTDIR)$(pkgdatadir)/icons/; \
		$(INSTALL_DATA) $(srcdir)/$$icon $(DESTDIR)$(pkgdatadir)/icons/; \
	done
	
install-data-local: install-icons
