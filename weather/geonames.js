const Soup = imports.gi.Soup;

function getWeather(station, callback) {
  //some weather
  var session = new Soup.SessionAsync();
  var request = Soup.Message.new('GET', 'http://api.geonames.org/weatherIcaoJSON?ICAO=' + station + '&username=ihmissuski');
  //http://www.geonames.org/export/JSON-webservices.html
  session.queue_message(request, function(session, message) {
    // This function will be run when the HTTP request completes. May be a long time
    if (message.status_code !== 200) {
      // Try again later
      return;
    }
    // Request was OK
    var weatherJSON = request.response_body.data;
    //TODO: parse metar ourselves as geonames is too optimistic
    var weather = JSON.parse(weatherJSON);
    callback(weather);
  });
}

function getIcon(weather){
  print (JSON.stringify(weather));
  switch (weather.weatherObservation.weatherCondition){
  //TODO: metar words list, check this to be up to date
  case "drizzle":
  case "light showers rain":
    return "weather-showers-scattered.svg";
  case "rain":
    return "weather-showers.svg";
  case "snow": 
  case "snow grains":
    return "weather-snow.svg"; 
    // TODO: First switch for condition to see if there is "interesting" weather
//condition.IC=ice crystals 
//condition.PL=ice pellets 
//condition.GR=hail 
//condition.GS=small hail/snow pellets 
//condition.UP=unknown precipitation 
//condition.BR=mist 
//condition.FG=fog 
//condition.FU=smoke 
//condition.VA=volcanic ash 
//condition.SA=sand 
//condition.HZ=haze 
//condition.PY=spray 
//condition.DU=widespread dust 
//condition.SQ=squall 
//condition.SS=sandstorm 
//condition.DS=duststorm 
//condition.PO=well developed dust/sand whirls 
//condition.FC=funnel cloud 
//condition.+FC=tornado/waterspout
  }
  // If not, then we check for clouds
  switch (weather.weatherObservation.clouds){
    case "few clouds":
    case "scattered clouds":
      return "weather-few-clouds.svg";
    case "clear sky":
      return "weather-clear.svg"
    case "broken clouds":
    case "overcast":
      return "weather-overcast.svg";
  }
  return "weather-fog.svg";
}
