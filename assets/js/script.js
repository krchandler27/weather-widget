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

function getAPI(event, prevCity) {
    city = prevCity || document.getElementById('searchBox').value;
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    var CAPcity = city.charAt(0).toUpperCase() + city.slice(1);
    

    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityName.textContent = CAPcity;
            weatherIcon.textContent = data.weather[0].main;
            temp.textContent = data.main.temp;
            wind.textContent = data.wind.speed;
            humidity.textContent = data.main.humidity;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            date.textContent = dayjs().format('MM/DD/YYYY');
            saveCity(CAPcity);
            fiveDay(lat, lon);
        })
}

function fiveDay(lat, lon) {
    var queryURL2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(queryURL2)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            var tempDay1 = document.getElementById('tempDay1');
            var windDay1 = document.getElementById('windDay1');
            var humidityDay1 = document.getElementById('humidityDay1');
            console.log(data);
            tempDay1.textContent = data.list[2].main.temp;
            windDay1.textContent = data.list[2].wind.speed;
            humidityDay1.textContent = data.list[2].main.humidity;
        })
}

displayHistory();

function saveCity(CAPcity) {
    city = document.getElementById('searchBox').value;
    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []
    searchedCities.push(CAPcity);
    window.localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    displayHistory();
}

function displayHistory() {
    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []
    document.getElementById('oldCities').innerHTML = ""
    for (var i = searchedCities.length - 1; i >= searchedCities.length - 5; i--) {
        var listItem = document.createElement('button');
        listItem.setAttribute('class', 'searchedCities');
        listItem.innerText = searchedCities[i];
        listItem.addEventListener('click', function (event) {
            var city = event.target.innerText;
            getAPI(null, city);
        });
        document.getElementById('oldCities').appendChild(listItem);
    }
}

function displayInfo () {
    document.getElementById('searchBox').placeholder = 'Type city name here';
}
displayInfo();

submitBtn.addEventListener('click', getAPI);

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('submitBtn').click();
    }
});