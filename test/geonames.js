const Soup = imports.gi.Soup;
const _httpSession = new Soup.SessionAsync();
Soup.Session.prototype.add_feature.call(_httpSession, new Soup.ProxyResolverDefault());

function GeoNames(station) {
  this.station = station;
}

GeoNames.prototype = { 
  getWeather: function(callback) {
    //TODO: Change username to global username instead of personal
    var request = Soup.Message.new('GET', 'http://api.geonames.org/weatherIcaoJSON?ICAO=' + this.station + '&username=ihmissuski');
    _httpSession.queue_message(request, function(_httpSession, message) {
      if (message.status_code !== 200) {
        callback(message.status_code, null);
        return;
      }
      var weatherJSON = request.response_body.data;
      var weather = JSON.parse(weatherJSON);
      if (!weather.weatherObservation) {
        print(weatherJSON);
        callback("FAIL", null);
        return;
      }
      callback(null, weather);
      });
    }, 
    
  getIcon: function(weather){
    print (JSON.stringify(weather));
    switch (weather.weatherObservation.weatherCondition){
    //TODO: metar words list, try to work out the words, no one seems to know. Own metar parser on the way..
    case "drizzle":
    case "light showers rain":
    case "light rain":
      return "weather-showers-scattered.svg";
    case "rain":
      return "weather-showers.svg";
    case "light snow": 
    case "snow grains":
      return "weather-snow.svg"; 
    }
    switch (weather.weatherObservation.clouds){
      case "few clouds":
      case "scattered clouds":
        return "weather-few-clouds.svg" ;
      case "clear sky":
      case "n/a":
        return "weather-clear.svg";
      case "broken clouds":
      case "overcast":
        return "weather-overcast.svg";
    }
    return "weather-fog.svg";
    }
}
