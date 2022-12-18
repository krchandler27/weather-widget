var APIKey = '6d390e6f004929169858f273e5940521'
var city;
var queryURL;
var submitBtn = document.getElementById('submitBtn');

function getAPI(event) {
    city = document.getElementById('searchBox').value;
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey + '&units=imperial'
    event.preventDefault();
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var myDiv = document.createElement('div');
            myDiv.setAttribute('id', 'date');
            myDiv.classList.add('weather-forecast');
            myDiv.textContent = data.main.temp;
            document.querySelector('#weather-box'.appendChild(myDiv));
        })

}

submitBtn.addEventListener('click', getAPI);