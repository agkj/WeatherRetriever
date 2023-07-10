const apikey = "b665ac724493535f63936dd36b6a0854"

const weatherDataElement = document.getElementById("weather_data")

const cityInputElement = document.getElementById("city_input")

const formElement = document.querySelector("form")



formElement.addEventListener("submit",(event)=>{
    event.preventDefault();

    const cityValue = cityInputElement.value;
    console.log(cityValue);

    getWeatherData(cityValue);

})

async function getWeatherData(cityValue){
    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error("Response Error")


        }
        
        const data = await response.json(); /*Convert to JSON so can retrieve data*/
        console.log(data);

        const country = data.sys.country /* Retrieves country name */
        const state = data.name /* Retrieves country state */

        const temperature = Math.round(data.main.temp) /* Retrieves temp */
        const description = data.weather[0].description/* Retrieves description */
        const icon = data.weather[0].icon /* Retrieves icon */
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)} °C`,
            `Humidity: ${data.main.humidity} %`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        /* To display the dynamic details in HTML */
        weatherDataElement.querySelector(".country").textContent = `${country}, ${state}`

        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`
        weatherDataElement.querySelector(".temperature").textContent = `${temperature} °C`
        weatherDataElement.querySelector(".description").textContent = `${description}`
        weatherDataElement.querySelector(".details").innerHTML = details.map(
            (details)=>`<div> ${details}</div>`).join("")

    } catch (error) {
        weatherDataElement.querySelector(".country").textContent = ""
       
        weatherDataElement.querySelector(".icon").innerHTML = ""
        weatherDataElement.querySelector(".temperature").textContent = ""
        weatherDataElement.querySelector(".description").textContent = "Error, please try again"
        weatherDataElement.querySelector(".details").innerHTML = ""
    }
}