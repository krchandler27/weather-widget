var APIKey = '6d390e6f004929169858f273e5940521'
var city;
var queryURL;
var submitBtn = document.getElementById('submitBtn');
var cityName = document.getElementById('cityName');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var searchBox = document.getElementById('searchBox');
var date = document.getElementById('date');
var weatherIcon = document.getElementById('weather-icon');

function getAPI(event) {
    city = document.getElementById('searchBox').value;
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    event.preventDefault();
    var CAPcity = city.charAt(0).toUpperCase() + city.slice(1);

    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.querySelector('.date1').classList.remove('hide');
            document.querySelector('.temperature').classList.remove('hide');
            document.querySelector('.windSpeed').classList.remove('hide');
            document.querySelector('.humidity1').classList.remove('hide');
            cityName.textContent = CAPcity;
            weatherIcon.textContent = data.weather[0].main;
            temp.textContent = data.main.temp;
            wind.textContent = data.wind.speed;
            humidity.textContent = data.main.humidity;
            date.textContent = dayjs().format('MM/DD/YYYY');
            saveCity(city);
            // add fetch for second API
        })
}

function saveCity(CAPcity) {
    city = document.getElementById('searchBox').value;
    var searchedCities = JSON.parse(localStorage.getItem(cityName)) || []
    searchedCities.push(CAPcity);
    window.localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
}
// saveCity function:
// 1. get the list of searched cities from localstorage (localstorage.getItem('searchedCities') --> want to use JSON.parse to transform into an object/array
// 2. add the new city to the array of cities
// 3. set the localstorage to the new array of cities

submitBtn.addEventListener('click', getAPI);
// submitBtn.addEventListener('click', saveCity(city));

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('submitBtn').click();
    }
});