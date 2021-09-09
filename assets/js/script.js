const apiKey = "25437cbe4ce85e57e46977492075f305";

function main()
{

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

        getCitiWeather(searchInput)
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

    var apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&Appid=" + apiKey;
    console.log(apiurl)

    try
    {
        fetch(apiurl).then(function (resonse)
        {
            if (resonse.ok)
            {
                JSON.parse(resonse).then(function (data)
                {
                    console.log(data)
                    // displayCitiWeather(city, data)

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

$(".search").click(saveSearch)