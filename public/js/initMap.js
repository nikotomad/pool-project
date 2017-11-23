function initMap() {
  var city = { lat: 40.416951, lng: -3.703376 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: city
  });

  var iconBase = {
      url: 'https://image.flaticon.com/icons/png/128/38/38599.png',
      origin: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(20, 20),
    };
let marker;
let centers = document.getElementsByClassName("center")
for(i=0; i<centers.length; i++){
  marker = new google.maps.Marker({
    position: { lat: parseFloat(document.getElementsByClassName('lat')[i].innerHTML),
     lng: parseFloat(document.getElementsByClassName('lng')[i].innerHTML)},
    map: map,
    icon: iconBase
  });
  }
}
