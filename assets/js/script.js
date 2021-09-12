const apiKey = "25437cbe4ce85e57e46977492075f305";
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
city = {}

function getDateInfo()
{
    var todayDate = new Date();
    var tempdate = {
        "currentYear": todayDate.getFullYear(),
        "currentMonth": todayDate.getMonth(),
        "currentDay": todayDate.getDay(),
        "currentDate": todayDate.getDate(),
        "currentHour": todayDate.getHours()
    }
    return tempdate
}

function saveSearch(eventData)
{
    eventData.preventDefault()
    searchInput = ""
    console.log(eventData)
    console.log("Target:", this)


    // get data from input box
    var searchInput = $("#searchInput").val().trim();
    console.log("search", searchInput);

    if (searchInput !== "" && searchInput !== null)
    {
        var localInfo = localStorage.getItem("cities")

        if (localInfo !== "" && localInfo !== null && (JSON.parse(localInfo)).includes(searchInput))
        {
            // console.log("Skip")
            displaySearch();
            document.getElementById('searchInput').value = null;
            getCitiWeather(searchInput)
            return
        }
        else
        {
            // if there is nothing saved at the start then save an empty array
            if (localStorage.getItem("cities") == null)
            {
                localStorage.setItem("cities", "[]");
            }

            // get old data and add the new data to it
            var oldSearchHistory = JSON.parse(localStorage.getItem("cities"));
            oldSearchHistory.push(searchInput);

            // save the old + new data to local storage
            localStorage.setItem("cities", JSON.stringify(oldSearchHistory));


            getCitiWeather(searchInput)
        }
    }
    else
    {
        alert("Please enter a city name");
    }

};

function refreshInput(eventData)
{
    var historySearch = document.getElementById('searchInput')
    historySearch.value = this.textContent
    console.log("historySearch", historySearch.value)
    getCitiWeather(historySearch.value);
}

function displaySearch(displayDate)
{
    if (localStorage.getItem("cities") !== null)
    {
        //  document.createElement("ul")
        var historyList = document.querySelector("#searchHistory");
        historyList.innerHTML = '';

        var oldSearchHistory = JSON.parse(localStorage.getItem("cities"));
        console.log("history", oldSearchHistory);


        for (let i = 0; i < oldSearchHistory.length; i++)
        {
            var historyItem = document.createElement("li");
            historyItem.textContent = oldSearchHistory[i];;
            historyItem.className = "searchItem";
            historyItem.addEventListener("click", refreshInput)
            historyList.appendChild(historyItem);
        }

    }
}

function getCitiWeather(city)
{
    city = city.replace(/\s/g, "%20");

    console.log("city", city)

    var apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&Appid=" + apiKey;

    console.log(apiurl)

    try
    {
        fetch(apiurl).then(function (response)
        {
            if (response.ok)
            {
                response.json().then(function (data)
                {
                    console.log(data)
                    getCitiUVIndex(city, data)
                    displayForecast(city)

                });
            }
            else
            {
                alert("Error, please check your entry")
            }

        })
    }
    catch (err)
    {
        alert("Unable to connect to OpenWeather");
    }

};

function getCitiUVIndex(city, data)
{
    var apiurl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=" + apiKey + "&units=imperial"

    console.log(apiurl2)

    try
    {
        fetch(apiurl2).then(function (response)
        {
            if (response.ok)
            {
                response.json().then(function (data3)
                {
                    console.log("data3", data3)
                    displayCurrentWeather(city, data3)
                });
            }
            else
            {
                alert("Error, please check your entry")
            }

        })
    }
    catch (err)
    {
        alert("Unable to connect to OpenWeather");
    }
};

function getDetails(data)
{
    var temp = {
        "Temperature": JSON.stringify(data.current.temp),
        "Humidity": JSON.stringify(data.current.humidity) + "%",
        "WindSpeed": JSON.stringify(data.current.wind_speed),
        "UV Index": JSON.stringify(data.current.uvi),
        "WeatherIcon": data.current.weather[0].icon,
    }

    var weatherIcon = data.current.weather[0].icon;
    console.log("icon", weatherIcon)
    console.log("temp", temp.WeatherIcon)

    return temp;
}

function addItem(key, ARR, weatherList)
{
    var listItem = document.createElement("li");
    listItem.className = "currentList";
    listItem.textContent = key + ": " + ARR[key];
    weatherList.appendChild(listItem);
}

function displayCurrentWeather(city, data)
{
    city = city.replace("%20", " ");

    var dateInfo = getDateInfo()
    var currentWeatherDataObj = getDetails(data)

    var weatherList = document.querySelector(".cityCurrentData");

    weatherList.innerHTML = "";

    var fullDate = "(" + weekDays[dateInfo.currentDay] + ", " + months[dateInfo.currentMonth] + " " + dateInfo.currentDate + ", " + dateInfo.currentYear + ")";

    weatherList.innerHTML = "<span style='font-weight:bolder; font-size: x-large;' >" + city + "   " + fullDate + "</span>"


    for (const key in currentWeatherDataObj)
    {
        if (key != "WeatherIcon")
        {
            addItem(key, currentWeatherDataObj, weatherList)
        }
    }

    var weatherIcon = data.current.weather[0].icon;
    var imgSource = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

    var weatherIconImg = document.createElement("img")
    weatherIconImg.setAttribute("src", imgSource)

    console.log(" weatherList.childNodes", weatherList.childNodes)
    weatherList.insertBefore(weatherIconImg, weatherList.childNodes[1]);
    console.log(" weatherList.childNodes 2", weatherList.childNodes)
    searchInput = ""

}

// 5-day forecast 
function displayForecast(city)
{
    $.ajax({

        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&Appid=" + apiKey + "&units=imperial",

        // method: "GET"
    }).then(function (response)
    {
        console.log("response", response)
        // Array for 5-days - Call was for 5 day / 3 hour forecast data
        var day = [0, 8, 16, 24, 32];
        var fiveDayDiv = $(".fiveDayOne")
        fiveDayDiv.empty();
        // For each for 5 days
        day.forEach(function (i)
        {
            // in response JSON, you've a list and inside each object they are passing the timestamp. To convert that time to human readable, you can multiple by 1000(milliseconds) and use the DateTime constructor to convert.


            var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
            FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

            fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "Wind Speed: " + response.list[i].wind.speed + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


        })
        searchInput = ""

    });
}

$(".search").click(saveSearch)