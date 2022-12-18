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
        })
}

submitBtn.addEventListener('click', getAPI);

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('submitBtn').click();
    }
});