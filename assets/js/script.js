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


function getAPI(event, prevCity) {
    city = prevCity || document.getElementById('searchBox').value;
    queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    var CAPcity = city.charAt(0).toUpperCase() + city.slice(1);


    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            document.getElementById("weatherIconDay0").innerHTML = "";
            var currentIconDay0 = data.weather[0].icon;
            var weatherIconDay0 = document.getElementById('weatherIconDay0');
            var img0 = document.createElement("img");
            img0.src = 'https://openweathermap.org/img/w/' + currentIconDay0 + '.png'
            weatherIconDay0.appendChild(img0);
            cityName.textContent = CAPcity;
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
    var queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(queryURL2)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Clear appended weather icons
            document.getElementById("weatherIconDay1").innerHTML = "";
            document.getElementById("weatherIconDay2").innerHTML = "";
            document.getElementById("weatherIconDay3").innerHTML = "";
            document.getElementById("weatherIconDay4").innerHTML = "";
            document.getElementById("weatherIconDay5").innerHTML = "";

            var dateDay1 = document.getElementById('dateDay1');
            var currentIconDay1 = data.list[2].weather[0].icon;
            var weatherIconDay1 = document.getElementById('weatherIconDay1');
            var img1 = document.createElement("img");
            img1.src = 'https://openweathermap.org/img/w/' + currentIconDay1 + '.png'
            weatherIconDay1.appendChild(img1);
            var tempDay1 = document.getElementById('tempDay1');
            var windDay1 = document.getElementById('windDay1');
            var humidityDay1 = document.getElementById('humidityDay1');
            dateDay1.textContent = (new Date(data.list[1].dt_txt).toLocaleDateString());
            tempDay1.textContent = data.list[2].main.temp;
            windDay1.textContent = data.list[2].wind.speed;
            humidityDay1.textContent = data.list[2].main.humidity;

            var dateDay2 = document.getElementById('dateDay2');
            var currentIconDay2 = data.list[10].weather[0].icon;
            var weatherIconDay2 = document.getElementById('weatherIconDay2');
            var img2 = document.createElement("img");
            img2.src = 'https://openweathermap.org/img/w/' + currentIconDay2 + '.png'
            weatherIconDay2.appendChild(img2);
            var tempDay2 = document.getElementById('tempDay2');
            var windDay2 = document.getElementById('windDay2');
            var humidityDay2 = document.getElementById('humidityDay2');
            dateDay2.textContent = (new Date(data.list[10].dt_txt).toLocaleDateString());
            tempDay2.textContent = data.list[10].main.temp;
            windDay2.textContent = data.list[10].wind.speed;
            humidityDay2.textContent = data.list[10].main.humidity;

            var dateDay3 = document.getElementById('dateDay3');
            var currentIconDay3 = data.list[18].weather[0].icon;
            var weatherIconDay3 = document.getElementById('weatherIconDay3');
            var img3 = document.createElement("img");
            img3.src = 'https://openweathermap.org/img/w/' + currentIconDay3 + '.png'
            weatherIconDay3.appendChild(img3);
            var tempDay3 = document.getElementById('tempDay3');
            var windDay3 = document.getElementById('windDay3');
            var humidityDay3 = document.getElementById('humidityDay3');
            dateDay3.textContent = (new Date(data.list[18].dt_txt).toLocaleDateString());
            tempDay3.textContent = data.list[18].main.temp;
            windDay3.textContent = data.list[18].wind.speed;
            humidityDay3.textContent = data.list[18].main.humidity;

            var dateDay4 = document.getElementById('dateDay4');
            var currentIconDay4 = data.list[26].weather[0].icon;
            var weatherIconDay4 = document.getElementById('weatherIconDay4');
            var img4 = document.createElement("img");
            img4.src = 'https://openweathermap.org/img/w/' + currentIconDay4 + '.png'
            weatherIconDay4.appendChild(img4);
            var tempDay4 = document.getElementById('tempDay4');
            var windDay4 = document.getElementById('windDay4');
            var humidityDay4 = document.getElementById('humidityDay4');
            dateDay4.textContent = (new Date(data.list[26].dt_txt).toLocaleDateString());
            tempDay4.textContent = data.list[26].main.temp;
            windDay4.textContent = data.list[26].wind.speed;
            humidityDay4.textContent = data.list[26].main.humidity;

            var dateDay5 = document.getElementById('dateDay5');
            var currentIconDay5 = data.list[34].weather[0].icon;
            var weatherIconDay5 = document.getElementById('weatherIconDay5');
            var img5 = document.createElement("img");
            img5.src = 'https://openweathermap.org/img/w/' + currentIconDay5 + '.png'
            weatherIconDay5.appendChild(img5);
            var tempDay5 = document.getElementById('tempDay5');
            var windDay5 = document.getElementById('windDay5');
            var humidityDay5 = document.getElementById('humidityDay5');
            dateDay5.textContent = (new Date(data.list[34].dt_txt).toLocaleDateString());
            tempDay5.textContent = data.list[34].main.temp;
            windDay5.textContent = data.list[34].wind.speed;
            humidityDay5.textContent = data.list[34].main.humidity;
        })
}

displayHistory();

function saveCity(CAPcity) {
    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []
    if (!searchedCities.includes(CAPcity)) {
        searchedCities.push(CAPcity);
    }
    window.localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    displayHistory();
}

function displayHistory() {
    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || []
    document.getElementById('oldCities').innerHTML = ""
    for (var i = searchedCities.length-1; i >= searchedCities.length-5; i--) {
        if (!searchedCities[i]) {
            break;
        }
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

function displayInfo() {
    document.getElementById('searchBox').placeholder = 'Mesa';
}
displayInfo();

submitBtn.addEventListener('click', getAPI);

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('submitBtn').click();
    }
});