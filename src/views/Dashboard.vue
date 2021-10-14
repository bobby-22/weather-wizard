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
                <img src="../assets/cloud_rain_storm_sun.png" />
                <div class="main-card-header">
                    <h1>
                        Currently
                        {{ roundNumber(currentConditions.temp - 273.15) }}°
                    </h1>
                </div>
            </div>
            <div class="additional-info">
                <span>
                    {{ getCurrentDay() }},
                    <span class="additional-info-time">
                        {{ currentTime }}
                    </span>
                </span>
                <span class="additional-info-pop">
                    <i class="fas fa-tint"></i>
                    {{ roundNumber(currentConditionsPop.pop * 100) }}%
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
                    <span
                        class="today"
                        @click="switchTodayView()"
                        v-bind:style="[
                            isWeekly
                                ? { 'border-bottom': 'none' }
                                : {
                                      'border-bottom': '1px solid #23120b',
                                      color: '#23120b',
                                      'font-size': '18px',
                                      'font-weight': '700',
                                      transition: '0.5s',
                                  },
                        ]"
                        >Today</span
                    >
                    <span
                        class="weekly"
                        @click="switchWeeklyView()"
                        v-bind:style="[
                            isToday
                                ? { 'border-bottom': 'none' }
                                : {
                                      'border-bottom': '1px solid #23120b',
                                      color: '#23120b',
                                      'font-size': '18px',
                                      'font-weight': '700',
                                      transition: '0.5s',
                                  },
                        ]"
                        >Weekly</span
                    >
                </div>
                <div class="degree">
                    <span class="celsius">°C</span>
                    <span class="fahrenheit">°F</span>
                </div>
            </div>
            <div class="small-cards" v-if="isToday">
                <SmallCardHourly v-bind:hourlyConditions="hourlyConditions" />
            </div>
            <div class="small-cards" v-if="isWeekly">
                <SmallCardDaily v-bind:dailyConditions="dailyConditions" />
            </div>
            <div class="secondary-card-header" v-if="isToday">
                <h1>Conditions for Today</h1>
            </div>
            <div class="secondary-card-header" v-if="isWeekly">
                <h1>Conditions for {{ getCurrentDay() }}</h1>
            </div>
            <div class="big-cards">
                <div class="big-card">
                    <div class="big-card-header">
                        Sunrise & Sunset
                    </div>
                    <div class="big-card-body">
                        <div class="sunrise">
                            <img src="../assets/sunrise.png" />
                            <span class="sunrise-info">
                                <p>
                                    {{ getTime(currentConditions.sunrise) }}
                                </p>
                                <p>in 7 hours and 45 minutes</p>
                            </span>
                        </div>
                        <div class="sunset">
                            <img src="../assets/sunset.png" />
                            <span class="sunset-info">
                                <p>{{ getTime(currentConditions.sunset) }}</p>
                                <p>in 17 hours and 15 minutes</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="big-card" v-for="card in 5" v-if="isToday">
                    Hourly
                </div>
                <div class="big-card" v-for="card in 5" v-if="isWeekly">
                    Weekly
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmallCardHourly from "../components/SmallCardHourly.vue";
import SmallCardDaily from "../components/SmallCardDaily.vue";
import BigCardHourly from "../components/BigCardHourly.vue";
import BigCardDaily from "../components/BigCardDaily.vue";
import weatherAPI from "../axios";
export default {
    name: "Dashboard",
    components: {
        SmallCardHourly,
        SmallCardDaily,
        BigCardHourly,
        BigCardDaily,
    },
    data() {
        return {
            currentTime: null,
            currentConditions: Object,
            currentConditionsPop: Object,
            hourlyConditions: Object,
            dailyConditions: Object,
            isToday: true,
            isWeekly: false,
        };
    },
    methods: {
        async getCurrentWeather() {
            try {
                let weatherResponse = await weatherAPI.get(
                    `/data/2.5/onecall?lat=48.1374&lon=11.5755&exclude=minutely&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
                );
                this.currentConditions = weatherResponse.data.current;
                this.currentConditionsPop = weatherResponse.data.hourly[0];
                this.hourlyConditions = weatherResponse.data.hourly.slice(0, 7);
                this.dailyConditions = weatherResponse.data.daily.slice(0, 7);
            } catch (error) {
                console.log(error);
            }
        },
        switchTodayView() {
            this.isToday = true;
            this.isWeekly = !this.isWeekly;
        },
        switchWeeklyView() {
            this.isWeekly = true;
            this.isToday = false;
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
            let currentDay = new Date().toLocaleDateString("en-US", {
                weekday: "long",
            });
            return currentDay;
        },
        getCurrentTime() {
            let hour = new Date().getHours();
            let minutes = new Date().getMinutes();
            if (hour < 10) {
                hour = "0" + hour;
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            this.currentTime = hour + ":" + minutes;
        },
    },
    created() {
        this.getCurrentWeather();
        this.getCurrentTime();
    },
    mounted() {
        setInterval(() => {
            this.getCurrentTime();
        }, 50000);
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
    max-width: 350px;
    padding: 30px;
    background-color: #fdfdfd;
}
.search-bar {
    display: flex;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #23120b;
    background-color: #f5f5f5;
}
.search-icon {
    padding: 15px;
}
.search-input {
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 400;
    flex-basis: 100%;
    background-color: #f5f5f5;
}
.submit-button {
    border-radius: 0px 20px 20px 0px;
    padding: 15px;
    transition: 0.5s;
    background-color: #fdb827;
}
.submit-button:hover {
    transition: 0.5s;
    color: #fdfdfd;
    background-color: #23120b;
}
.main-weather-condition {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-weather-condition img {
    width: 300px;
    height: 300px;
}
.main-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 100%;
}
.main-card-header h1 {
    font-size: 42px;
    font-weight: 700;
    margin: 0px;
    color: #23120b;
}
p {
    margin: 0px;
}
.additional-info {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    border-top: 1px solid #eeeeee;
    padding-top: 15px;
    color: #23120b;
}
.additional-info-time {
    font-weight: 400;
    color: #999999;
}
.additional-info-pop {
    font-size: 18x;
    font-weight: 600;
    color: #21209c;
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
    opacity: 0.8;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
.city-name {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    margin: 0px;
    font-weight: 700;
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
    color: #23120b;
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
    flex-basis: 100%;
    padding: 30px;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.today,
.weekly {
    cursor: pointer;
}
.today,
.celsius {
    margin-right: 15px;
}
.today,
.weekly {
    padding-bottom: 5px;
    transition: 0.5s;
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
    font-size: 18px;
    font-weight: 600;
}
.celsius {
    color: #fdfdfd;
    background-color: #23120b;
}
.fahrenheit {
    color: #23120b;
    background-color: #fdfdfd;
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
}
.small-card-header-1,
.small-card-footer {
    font-size: 18px;
    font-weight: 600;
    color: #4a4a4a;
}
.small-card-header-2 {
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
    color: #21209c;
}
.small-card-body img {
    object-fit: cover;
    min-width: 85px;
    height: 85px;
}
.secondary-card-header h1 {
    font-size: 26px;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 30px;
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
    min-height: 200px;
    background-color: #fdfdfd;
}
.big-card-header {
    font-size: 14px;
    font-weight: 400;
    margin: 5px;
    color: #999999;
}
.big-card-body {
    font-size: 18px;
    font-weight: 400;
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
    margin-right: 5px;
}
.sunset {
    margin-top: 5px;
}
</style>
