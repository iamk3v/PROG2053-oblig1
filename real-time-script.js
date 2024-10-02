function fetchWeather(url, id) { // id is the element to update
    //const weatherData = 
    fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        let element = document.getElementById(id);

        // Updates the element with the fetched data
        element.innerHTML = `
            Temperature: ${data.current_weather.temperature} 
                         ${data.current_weather_units.temperature}<br>
            Windspeed:   ${data.current_weather.windspeed}
                         ${data.current_weather_units.windspeed}<br>
            Time:        ${data.current_weather.time}
                        (${data.timezone})<br>
            It is currently: ${data.current_weather.is_day ? 'day' : 'night'}<br>
         `;
    })
}

window.onload = function() { // Runs the code when the window is loaded
    let i = 1; // Counter for amount of times updated

    // Fetches and updates weather data for the different locations
    fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=40.71455&longitude=-74.00235&current_weather=true', 'newyork-data');
    fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=59.91270&longitude=10.74996&current_weather=true', 'oslo-data');
    fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=39.91180&longitude=116.64187&current_weather=true', 'beijing-data');
    fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=4.17522&longitude=73.50984&current_weather=true', 'male-data');
    fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=-33.99004&longitude=19.14881&current_weather=true', 'capetown-data');
    
    setInterval(() => { // Interval function to update weather data
        fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=40.71455&longitude=-74.00235&current_weather=true', 'newyork-data');
        fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=59.91270&longitude=10.74996&current_weather=true', 'oslo-data');
        fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=39.91180&longitude=116.64187&current_weather=true', 'beijing-data');
        fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=4.17522&longitude=73.50984&current_weather=true', 'male-data');
        fetchWeather('https://api.open-meteo.com/v1/forecast?latitude=-33.99004&longitude=19.14881&current_weather=true', 'capetown-data');
       
        // Updates the update counter
        document.getElementById("counter").innerText = `Updated ${i} time(s)`;
        console.log(`Updated! Total times updated: ${i++}`);
    }, 10000); // Updates weather data every 10 seconds
}