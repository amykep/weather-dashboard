
function saveSearch(eventData)
{
    eventData.preventDefault()
    console.log(eventData)
    console.log("Target:", this)


    // get data from input box
    var searchInput = $("#searchInput").val();
    console.log("search", searchInput)

    if (searchInput !== "" && searchInput !== null)
    {

        // if there is nothing saved at the start then save an empty array
        if (localStorage.getItem("cities") == null)
        {
            localStorage.setItem("cities", "[]")
        }

        // get old data and add the new data to it
        var oldSearchHistory = JSON.parse(localStorage.getItem("cities"))
        oldSearchHistory.push(searchInput)

        // save the old + new data to local storage
        localStorage.setItem("cities", JSON.stringify(oldSearchHistory))
    }
    else
    {
        alert("Please enter a city name")
    }

    displaySearch();
}
function displaySearch()
{
    if (localStorage.getItem("cities") !== null)
    {
        //  document.createElement("ul")
        var historyList = document.querySelector("#searchHistory")
        historyList.className = "searchHistory ul"


        var oldSearchHistory = JSON.parse(localStorage.getItem("cities"))
        console.log("history", oldSearchHistory)

        for (let i = 0; i <= oldSearchHistory.length; i++)
        {
            var historyItem = document.createElement("li")
            historyItem.textContent = oldSearchHistory[i];
            historyItem.className = "searchItem"
            historyList.appendChild(historyItem);
        }

    }
}
$(".search").click(saveSearch)