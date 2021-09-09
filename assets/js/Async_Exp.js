const apiKey = "25437cbe4ce85e57e46977492075f305";

function main()
{
    var currentDate = new Date()

}

function saveSearch(eventData)
{
    eventData.preventDefault()
    console.log(eventData)
    console.log("Target:", this)


    // get data from input box
    var searchInput = $("#searchInput").val();
    console.log("search", searchInput);

    if (searchInput !== "" && searchInput !== null)
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

        var res = getCitiWeather(searchInput)
        console.log("Get Citi Weather:", res)
    }
    else
    {
        alert("Please enter a city name");
    }

    displaySearch();
};


function displaySearch()
{
    if (localStorage.getItem("cities") !== null)
    {
        //  document.createElement("ul")
        var historyList = document.querySelector("#searchHistory");


        var oldSearchHistory = JSON.parse(localStorage.getItem("cities"));
        console.log("history", oldSearchHistory);

        for (let i = 0; i <= oldSearchHistory.length; i++)
        {
            var historyItem = document.createElement("li");
            historyItem.textContent = oldSearchHistory[i];;
            historyItem.className = "searchItem";
            historyList.appendChild(historyItem);
        }

    }
}

function getCitiWeather(city)
{
    city = city.trim()
    city = city.replace(/\s/g, "%20");

    console.log("city", city)

    var apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&Appid=" + apiKey + "&units=imperial";

    console.log(apiurl)



    var result = fetchVerification(apiurl).then(function (data) { return data });
    console.log("result:", result)
    if (result !== null && result !== "")
    {
        // while (result.PromiseState !== "fulfilled")
        // {
        //     console.log(result.PromiseState)
        // }

        if (result.PromiseObject !== null && result.PromiseObject !== "")
        {
            return result.PromiseObject
        }

        return null
    }
};

async function fetchVerification(apiurl)
{
    try
    {
        const response = await fetch(apiurl);
        if (response.ok)
        {
            const data = await response.json();
            return data
        }
        else
        {
            alert("Error, please check your entry")
        }


        // return fetch(apiurl).then(
        //     function (response)
        //     {
        //         if (response.ok)
        //         {
        //             return response.json().then(
        //                 function (data)
        //                 {
        //                     console.log(data)
        //                     return data

        //                 });
        //         }
        //         else
        //         {
        //             alert("Error, please check your entry")
        //         }
        //     })
    }
    catch (err)
    {
        alert("Unable to connect to OpenWeather");
    }
};

function displayCitiWeather(city, data)
{
    console.log("data2", data)
    console.log("lon", data.coord.lon)
    console.log("lat", data.coord.lat)
    console.log("temp", data.main.temp)
    console.log("wind", data.wind.speed)
    console.log("hum", data.main.humidity)
    // var apiURLOneCall = 
}

$(".search").click(saveSearch)