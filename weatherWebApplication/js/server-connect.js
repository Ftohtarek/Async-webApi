import { Observable } from "./observable.js"
import { PopUp } from "./popup.js"

export class Server {
    popUp = new PopUp()
    ApiKey = "65794f4337ed4d98bbf225146232001"
    url = `https://api.weatherapi.com/v1/forecast.json?key=${this.ApiKey}&`
    ApiData = new Observable()

    async getWeather(city = "cairo") {
        try {
            const ApiResponse = await fetch(`${this.url}q=${city}&days=2`)
            const data = await ApiResponse.json()
            if (ApiResponse.status != 200)
                throw data.error
            this.sendFilterData(data)
        } catch (error) {
            error.message ? this.popUp.alert(error.message) : this.popUp.alert("UnExpected Error")
        }
    }

    sendFilterData(data) {
        this.ApiData.emit(
            {
                current: {
                    temp_c: data.current.temp_c,
                    icon: data.current.condition.icon,
                    condation: data.current.condition.text,
                    windSpeed: data.current.wind_kph,
                    direction: data.current.wind_dir,
                },
                forecastDays: this.filterForecast(data.forecast.forecastday),
                location: {
                    location: data.location.name,
                    time: data.location.localtime_epoch
                }
            })
    }

    filterForecast(forecastDays) {
        let ForecastWeatherInfo = []
        forecastDays.forEach(day => {
            ForecastWeatherInfo.push({
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
            })
        });
        return ForecastWeatherInfo
    }

}