var APIKey = '6d390e6f004929169858f273e5940521'
var city = document.getElementById('search').textContent;
var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

function getAPI(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            var myDiv = document.createElement('div');
            myDiv.setAttribute("id", "date");
            myDiv.classList.add("weather-forecast");
            myDiv.textContent = data.date;
            document.querySelector("#weather-box").appendChild(myDiv);
            console.log(data);
        })

}

getAPI(queryURL);