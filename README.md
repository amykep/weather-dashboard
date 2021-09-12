# weather-dashboard
This application provides travelers with weather outlook for multiple citie to plan their trip accordingly


### Key Elements
In this app I deployed the following:
1. Bootstrap
2. JavaScript 
3. Fetch API
4. jQuery ajax function
5. LocalStorage
6. CSS

### Development Outline
1. Builded a search function for users to search the city of their choice, and save the search on localstorage.
2. Created a function to check if the city has been searched before by the user. If searched before, it will not be added again to the search history, and its data will be displayed.
3. Fetched the longitude and latitude of the searched city, then deployed another fetch (all-in-one) using the longitude and latitude coordinates to get the UV Index. I noticed that the UVIndex info became only available for Open Weather subscibers., so it always display zero even when I used their provided example I was still getting a zero.
4. Worked on building the structure for displaying the current and Forecast weather.
5. Added addEventListener to each city in the history so that it is searched again on click.


### Link to the deployed application: https://amykep.github.io/weather-dashboard/

### Screenshot of the Daily Calendar:
<img src=".assets/images/weather-dashboard.png">