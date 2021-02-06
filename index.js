var input = document.querySelector(".form-input");
var btn = document.querySelector(".btn");
var ipAddress = document.querySelector(".ip");
var loc = document.querySelector(".location");
var timeZone = document.querySelector(".timezone");
var internet = document.querySelector(".isp");
var error = document.querySelector(".error");
const url =
  "https://geo.ipify.org/api/v1?apiKey=at_voFpw6ZBhWMVHTADtHD6FQx4FeMI9&domain=";

var mymap;

var myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [38, 55],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const fetchIp = async (value) => {
  const response = await fetch(url + value);

  if (response.status !== 200) {
    error.style.display = "block";
  } else {
    error.style.display = "none";
    const data = await response.json();
    console.log(response);
    const { ip, isp } = data;
    const {
      location: { city, country, lat, lng, postalCode, timezone },
    } = data;

    loc.innerHTML = `${city}, ${country} ${postalCode}`;
    ipAddress.textContent = ip;
    timeZone.innerHTML = timezone;
    internet.innerHTML = isp;

    mymap.remove();
    mymap = L.map(mapid).setView([lat, lng], 13);
    mymap.panTo(new L.LatLng(lat, lng));
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution: "&copy Digvijay Ghosh",
        maxZoom: 22,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiZHZpb24wbzAiLCJhIjoiY2trb2NyM21iMDFobTMwcDZ5aGpwZnhvZSJ9.H_PuNJ7WUETaBH1-dvAMBA",
      }
    ).addTo(mymap);

    L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
  }
};

const fetchAuto = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const { ip, isp } = data;
  const {
    location: { city, country, lat, lng, postalCode, timezone },
  } = data;
  loc.innerHTML = `${city}, ${country} ${postalCode}`;
  ipAddress.textContent = ip;
  timeZone.innerHTML = timezone;
  internet.innerHTML = isp;

  mymap = L.map(mapid).setView([lat, lng], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: "&copy Digvijay Ghosh",
      maxZoom: 13,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZHZpb24wbzAiLCJhIjoiY2trb2NyM21iMDFobTMwcDZ5aGpwZnhvZSJ9.H_PuNJ7WUETaBH1-dvAMBA",
    }
  ).addTo(mymap);

  L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
};

fetchAuto();

btn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchIp(input.value);
});
