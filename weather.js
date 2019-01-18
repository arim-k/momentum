const API_KEY = 'b4c199cc21eb69f1efeaad9967f4f1b6'; 
const COORDS = 'coords'; 

function getWeather() 

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log('cant acees');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {

  }
}

function init() {
  loadCoords();
}

init();