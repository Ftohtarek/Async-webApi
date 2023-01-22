import { Server } from "./server-connect.js"

class Main {
    server = new Server()
    search = document.getElementById("search");
    weatherApi = {}
    constructor() {
        this.server.getWeather()
        this.server.ApiData.subscripe(resbonce => {
            this.weatherApi = resbonce;
            this.setWeatherInfo()
        })
        this.search.addEventListener('keyup', (e) => {
            if (this.checkValidation(e.target.value)) {
                this.server.getWeather(e.target.value)
            }
        })
    }

    checkValidation = (value) => {
        let validation = /^[\w\d/_ /]{1,30}$/
        let isValid = validation.test(value)
        this.setValidationStyle(isValid)
        return isValid
    }

    setValidationStyle = (isValid) => {
        isValid ?
            search.classList.remove("alert") :
            search.classList.add("alert")
    }

    setWeatherInfo() {
        let cardBody = document.querySelector(".card .card-body").children
        let cardFooter = document.querySelector(".card .card-footer").children
        let cardDate = document.querySelector(".card .card-header ").children

        // console.log(cardFooter[2].children[1].className);
        // main card
        cardDate[0].innerHTML = this.getDate().day
        cardDate[1].innerHTML = this.getDate().subDate
        cardBody[0].innerHTML = this.weatherApi.location.location
        cardBody[1].firstElementChild.innerHTML = this.weatherApi.current.temp_c
        cardBody[1].children[2].firstElementChild.src = `${this.weatherApi.current.icon}`
        cardBody[2].innerHTML = this.weatherApi.current.condation
        cardFooter[1].children[1].innerHTML = this.weatherApi.current.windSpeed
        cardFooter[2].children[1].innerHTML = this.weatherApi.current.direction;

        // forecat day
        let forecastCard = document.querySelectorAll(".forecast .card-body")
        let forecastDate = document.querySelectorAll(".forecast .card-header")
        this.weatherApi.forecastDays.forEach((day, index) => {
            forecastDate[index].children[0].innerHTML = this.getDate(index + 1).day
            forecastDate[index].children[1].innerHTML = this.getDate(index + 1).subDate
            forecastCard[index].children[0].src = `${day.icon}`
            forecastCard[index].children[1].innerHTML = `${day.maxTemp}<sup>o</sup>C`
            forecastCard[index].children[2].innerHTML = `${day.minTemp}<sup>o</sup>C`
            forecastCard[index].children[3].innerHTML = day.condition
        })
    }

    getDate = (after = 0) => {
        let date = new Date()
        let days = ["Sunday", "Monday", "Tuseday", "Wensday", "Thursday", "Friday", "Saturday"]
        let Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",]
        let getDay = date.getDay() + after > days.length - 1 ? -1 + after : date.getDay()
        return {
            subDate: `${date.getDate() + after} ` + `${Months[date.getMonth()]}`,
            day: days[getDay]
        }
    }

}

new Main()
