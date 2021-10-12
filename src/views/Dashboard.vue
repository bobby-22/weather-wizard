<template>
    <div class="container">
        <div class="main-card">
            <form class="search-bar" action="">
                <div class="search-icon">
                    <i class="fas fa-search"></i>
                </div>
                <input class="search-input" placeholder="Search a city..." />
                <div class="submit-button">Search</div>
            </form>
            <div class="main-weather-condition">
                <img src="../assets/cloud_day_forecast_rain_rainy_icon.png" />
                <div class="main-card-header">
                    <h1 v-if="currentConditions">
                        {{ roundNumber(currentConditions.temp - 273.15) }}°
                    </h1>
                    <h2 v-if="hourlyConditions[0]">
                        <i class="fas fa-tint"></i>
                        {{ roundNumber(hourlyConditions[0].pop * 100) }}%
                    </h2>
                </div>
            </div>
            <hr class="rounded-divider" />
            <div class="additional-info">
                <p>
                    {{ currentDay }},
                    <span class="additional-info-time">
                        {{ currentTime }}
                    </span>
                </p>
                <span
                    class="current-condition"
                    v-if="currentConditions.weather"
                >
                    <i class="fas fa-cloud-rain"></i>
                    {{ currentConditions.weather[0].description }}
                </span>
            </div>
            <div class="media">
                <img class="radar" src="../assets/radar.png" />
                <div class="city">
                    <img src="../assets/munich.jpg" />
                    <h1 class="city-name">Munich</h1>
                    <div class="city-controls">
                        <i class="fas fa-chevron-left"></i>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="secondary-card">
            <div class="navbar">
                <div class="day">
                    <span class="today"><u>Today</u></span>
                    <span class="weekly">Weekly</span>
                </div>
                <div class="degree">
                    <span class="celsius">°C</span>
                    <span class="fahrenheit">°F</span>
                </div>
            </div>
            <div class="small-cards">
                <div
                    class="small-card"
                    v-for="(condition, index) in hourlyConditions"
                >
                    <div class="small-card-header-1" v-if="index === 0">
                        Now
                    </div>
                    <div class="small-card-header-1" v-else>
                        {{ getTime(condition.dt) }}
                    </div>
                    <div class="small-card-header-2" v-if="condition.pop != 0">
                        {{ roundNumber(condition.pop * 100) }}%
                    </div>
                    <div class="small-card-body">
                        <img
                            src="../assets/cloud_day_forecast_rain_rainy_icon.png"
                        />
                    </div>
                    <div class="small-card-footer">
                        {{ roundNumber(condition.temp - 273.15) }}°
                    </div>
                </div>
            </div>
            <div class="secondary-card-header">
                <h1>Conditions for today</h1>
            </div>
            <div class="big-cards">
                <div class="big-card">
                    <div class="big-card-header">
                        Sunrise & Sunset
                    </div>
                    <div class="big-card-body">
                        <div class="sunrise">
                            <img
                                src="../assets/horizont_morning_sun_sunrise_weather_icon.png"
                            />
                            <span class="sunrise-info">
                                <p>
                                    {{ getTime(currentConditions.sunrise) }}
                                </p>
                                <p>in 7 hours and 45 minutes</p>
                            </span>
                        </div>
                        <div class="sunset">
                            <img
                                src="../assets/horizont_morning_sun_sunrise_weather_icon.png"
                            />
                            <span class="sunset-info">
                                <p>{{ getTime(currentConditions.sunset) }}</p>
                                <p>in 17 hours and 15 minutes</p>
                            </span>
                        </div>
                    </div>
                </div>
                <Card
                    v-for="card in 5"
                    v-bind:weatherResponse="weatherResponse"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Card from "../components/Card.vue";
import weatherAPI from "../axios";
export default {
    name: "Dashboard",
    components: {
        Card,
    },
    data() {
        return {
            currentDay: null,
            currentTime: null,
            weatherResponse: Object,
            currentConditions: Object,
            hourlyConditions: Object,
            dailyConditions: Object,
        };
    },
    methods: {
        async getWeather() {
            try {
                let weatherResponse = await weatherAPI.get(
                    `/data/2.5/onecall?lat=48.1374&lon=11.5755&exclude=minutely&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
                );
                this.weatherResponse = weatherResponse;
                this.currentConditions = weatherResponse.data.current;
                this.hourlyConditions = weatherResponse.data.hourly.slice(0, 7);
                this.dailyConditions = weatherResponse.data.daily;
            } catch (error) {
                console.log(error);
            }
        },
        roundNumber(number) {
            let roundedNumber = Math.round(number);
            return roundedNumber;
        },
        getTime(dtValue) {
            let hour = new Date(dtValue * 1000).getHours();
            let minutes = new Date(dtValue * 1000).getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            let time = hour + ":" + minutes;
            return time;
        },
        getCurrentDay() {
            this.currentDay = new Date().toLocaleDateString("en-US", {
                weekday: "long",
            });
        },
        getCurrentTime() {
            let hour = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            if (hour < 10) {
                hour = "0" + hour;
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            } else if (seconds < 10) {
                seconds = "0" + seconds;
            }
            this.currentTime = hour + ":" + minutes + ":" + seconds;
        },
    },
    created() {
        this.getWeather();
        this.getCurrentDay();
        this.getCurrentTime();
    },
    mounted() {
        setInterval(() => {
            this.getCurrentTime();
        }, 1000);
    },
};
</script>

<style>
.container {
    display: flex;
}
.main-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 20%;
    max-width: 500px;
    padding: 30px;
    background-color: #fdfdfd;
}
.search-bar {
    display: flex;
    font-size: 14px;
    border-radius: 20px;
    background-color: #f5f5f5;
}
.search-icon {
    padding: 15px;
}
.search-input {
    outline: none;
    border: none;
    font-size: 14px;
    flex-basis: 100%;
    background-color: #f5f5f5;
}
.submit-button {
    border-radius: 0px 20px 20px 0px;
    padding: 15px;
    background-color: #21209c;
    color: #fdfdfd;
}
.main-weather-condition {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-weather-condition img {
    width: 200px;
    height: 200px;
    filter: drop-shadow(1px 1px 1px rgb(228, 228, 228));
}
.main-card-header {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-card-header h1 {
    font-size: 58px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0px;
    color: #23120b;
}
.main-card-header h2 {
    font-size: 20px;
    font-weight: 600;
    margin-top: 0px;
    margin-bottom: 0px;
    color: #21209c;
}
.rounded-divider {
    width: 100%;
    border-top: 1px solid #e1e1e1;
    border-radius: 5px;
    margin: 0px;
}
p {
    margin: 0px;
}
.additional-info {
    font-size: 20px;
    font-weight: 600;
    color: #23120b;
}
.additional-info-time {
    font-weight: 400;
    color: #999999;
}
.current-condition {
    text-transform: capitalize;
}
.media img {
    object-fit: cover;
    width: 100%;
    max-height: 170px;
    border-radius: 15px;
}
.city {
    position: relative;
    opacity: 0.7;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.city-name {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    margin: 0px;
    margin-top: -1px;
    font-weight: 600;
    color: #fdfdfd;
}
.city-controls {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.fas.fa-chevron-left,
.fas.fa-chevron-right {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-left: 15px;
    margin-right: 15px;
    opacity: 0.5;
    transition: opacity 0.5s;
    color: #4a4a4a;
    background-color: #fdfdfd;
}
.fas.fa-chevron-left:hover,
.fas.fa-chevron-right:hover {
    opacity: 0.8;
}
.secondary-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 80%;
    padding: 30px;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.today,
.celsius {
    margin-right: 20px;
}
.today {
    font-size: 20px;
    font-weight: 700;
    text-underline-offset: 10px;
    color: #23120b;
}
.weekly {
    color: #999999;
}
.celsius,
.fahrenheit {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
}
.celsius {
    background-color: #23120b;
    color: #fdfdfd;
}
.fahrenheit {
    background-color: #fdfdfd;
    color: #23120b;
}
.small-cards {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    margin-top: 30px;
}
.small-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
    min-height: 100px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 12px;
    border-radius: 15px;
    padding: 15px;
    background-color: #fdfdfd;
    backdrop-filter: blur(25px);
}
.small-card-header-1,
.small-card-footer {
    font-size: 18px;
    font-weight: 600;
    color: #4a4a4a;
}
.small-card-header-2 {
    font-size: 14px;
    color: #21209c;
}
.small-card-body img {
    object-fit: cover;
    width: 61px;
    height: 61px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.secondary-card-header h1 {
    font-size: 32px;
    font-weight: 700;
    color: #23120b;
}
.big-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    gap: 15px;
}
.big-card {
    border-radius: 15px;
    padding: 15px;
    background-color: #fdfdfd;
    min-height: 200px;
}
.big-card-header {
    color: #999999;
}
.big-card-body {
    font-size: 18px;
    margin-top: 30px;
    color: #4a4a4a;
}
.sunrise,
.sunset {
    display: flex;
    align-items: center;
}
.sunrise img,
.sunset img {
    object-fit: cover;
    width: 78px;
    height: 78px;
    margin-right: 10px;
}
.sunset {
    margin-top: 10px;
}
</style>
