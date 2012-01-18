# The actual runnable program is set to the SCRIPTS primitive. Prefix bin_ tells where to copy this
bin_SCRIPTS = weatherapp.js geonames.js weatherapp.sh
# List of files to be distributed
EXTRA_DIST=  \
    $(bin_SCRIPTS)
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

#the applicaion icon
appicondir=$(datadir)/icons/hicolor/scalable/apps
appicon_DATA=weather-icon.svg
