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
  // TODO: First switch for condition to see if there is "interesting" weather
  //switch (weather.weatherObservation.weatherCondition){}
  // If not, then we check for clouds
  //TODO:compelete the swich board
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
