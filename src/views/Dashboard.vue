<template>
    <div class="container">
        <div class="main-card">
            <form class="search-bar" action="">
                <div class="search-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <input
                    class="search-input"
                    placeholder="Search a city..."
                    ref="locationInput"
                />
                <div class="submit-button" v-on:click="setLocationData()">
                    Save
                </div>
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
                        {{ getCurrentTime() }}
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
                    <img v-bind:src="locationImageURL" />
                    <h1 class="city-name">{{ locationName }}</h1>
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
                            !isToday
                                ? { 'border-bottom': 'none' }
                                : {
                                      'border-bottom': '1px solid #23120b',
                                      color: '#23120b',
                                      'font-size': '18px',
                                      'font-weight': '700',
                                      transition: '0.4s',
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
                                      transition: '0.4s',
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
                <SmallCards
                    v-for="(hour, index) in hourlyConditions"
                    v-bind:key="hour.id"
                    v-bind:data="hour"
                    v-bind:index="index"
                    v-bind:header="'Now'"
                    v-bind:roundNumber="roundNumber"
                    v-bind:getTime="getTime"
                />
            </div>
            <div class="small-cards" v-else>
                <SmallCards
                    v-for="(day, index) in dailyConditions"
                    v-on:click="currentDayIndex = index"
                    v-bind:key="day.id"
                    v-bind:data="day"
                    v-bind:index="index"
                    v-bind:header="'Today'"
                    v-bind:roundNumber="roundNumber"
                />
            </div>
            <div class="secondary-card-header" v-if="isToday">
                <h1>Conditions for Now</h1>
            </div>
            <div class="secondary-card-header" v-else>
                <h1>Conditions for {{ getDayName() }}</h1>
            </div>
            <div class="big-cards">
                <BigCards
                    v-if="isToday"
                    v-bind:data="currentConditions"
                    v-bind:isToday="false"
                    v-bind:roundNumber="roundNumber"
                    v-bind:getTime="getTime"
                    v-bind:getWindDirection="getWindDirection"
                />
                <BigCards
                    v-else
                    v-bind:data="dailyConditions[currentDayIndex]"
                    v-bind:isToday="true"
                    v-bind:roundNumber="roundNumber"
                    v-bind:getTime="getTime"
                    v-bind:getWindDirection="getWindDirection"
                />
                <div class="big-card">
                    <div class="big-card-header">
                        Sunrise & Sunset
                    </div>
                    <div class="big-card-body">
                        <div class="big-card-body-top" id="sunrise-time">
                            <img
                                class="resize-image"
                                src="../assets/sunrise.png"
                            />
                            <span class="top-info">
                                <p class="sunrise-time">
                                    {{
                                        getTime(
                                            dailyConditions[currentDayIndex]
                                                .sunrise
                                        )
                                    }}
                                </p>
                                <p>in 7 hours and 45 minutes</p>
                            </span>
                        </div>
                        <div class="big-card-body-bottom">
                            <img
                                class="resize-image"
                                src="../assets/sunset.png"
                            />
                            <span class="bottom-info">
                                <p class="sunset-time">
                                    {{
                                        getTime(
                                            dailyConditions[currentDayIndex]
                                                .sunset
                                        )
                                    }}
                                </p>
                                <p>in 17 hours and 15 minutes</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmallCards from "../components/SmallCards.vue";
import BigCards from "../components/BigCards.vue";
import weatherAPI from "../axios";
export default {
    name: "Dashboard",
    components: {
        SmallCards,
        BigCards,
    },
    data() {
        return {
            currentConditions: Object,
            currentConditionsPop: Object,
            locationInput: null,
            latitude: this.$store.state.latitude,
            longitude: this.$store.state.longitude,
            locationName: this.$store.state.locationName,
            locationImageURL: this.$store.state.locationImageURL,
            hourlyConditions: null,
            dailyConditions: null,
            currentDayIndex: 0,
            isToday: true,
        };
    },
    methods: {
        async getCurrentWeather() {
            try {
                let weatherResponse = await weatherAPI.get(
                    `/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
                );
                this.currentConditions = weatherResponse.data.current;
                this.currentConditionsPop = weatherResponse.data.hourly[0];
                this.hourlyConditions = weatherResponse.data.hourly.slice(0, 7);
                this.dailyConditions = weatherResponse.data.daily.slice(0, 7);
            } catch (error) {
                console.log(error);
            }
        },
        getAutocomplete() {
            this.locationInput = new google.maps.places.Autocomplete(
                this.$refs.locationInput,
                { types: ["(regions)"] }
            );
        },
        setLocationData() {
            let locationData = this.locationInput.getPlace();
            this.latitude = locationData.geometry.location.lat();
            this.$store.commit("setLatitude", this.latitude);
            this.longitude = locationData.geometry.location.lng();
            this.$store.commit("setLongitude", this.latitude);
            this.locationName = locationData.name;
            this.$store.commit("setLocationName", this.locationName);
            this.locationImageURL = locationData.photos[0].getUrl();
            this.$store.commit("setLocationImageURL", this.locationImageURL);
        },
        switchTodayView() {
            this.isToday = true;
        },
        switchWeeklyView() {
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
        getDayName() {
            let days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ];
            let currentDayIndex =
                new Date(
                    this.dailyConditions[this.currentDayIndex].dt * 1000
                ).getDay() - 1;
            let currentDay = days[currentDayIndex];
            if (this.currentDayIndex === 0) {
                return "Today";
            }
            if (currentDayIndex === -1) {
                return "Sunday";
            } else {
                return currentDay;
            }
        },
        getCurrentTime() {
            let hour = new Date().getHours();
            let minutes = new Date().getMinutes();
            if (hour < 10) {
                hour = "0" + hour;
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            let currentTime = hour + ":" + minutes;
            return currentTime;
        },
        getWindDirection(degree) {
            /*
            8 directions;
            360 / 8 = 45° = 1 direction
            */
            let directions = [
                "Northerly",
                "North Easterly",
                "Easterly",
                "South Easterly",
                "Southerly",
                "South Westerly",
                "Westerly",
                "North Westerly",
            ];
            let directionIndex = Math.round(degree / 45, 0);
            let direction = directions[directionIndex];
            if (directionIndex === 8) {
                return "Northerly";
            } else return direction;
        },
    },
    created() {
        this.getCurrentWeather();
        this.getCurrentTime();
    },
    mounted() {
        this.getAutocomplete();
        setInterval(() => {
            this.getCurrentTime();
        }, 30000);
    },
    watch: {
        currentDayIndex: {
            handler: function() {
                this.getDayName();
            },
        },
        latitude: {
            handler: function() {
                this.getCurrentWeather();
            },
        },
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
    background-color: #f1f1f1;
}
.search-icon {
    padding: 15px;
}
.search-input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 400;
    flex-basis: 100%;
    background-color: #f1f1f1;
}
.submit-button {
    border-radius: 0px 20px 20px 0px;
    padding: 15px;
    transition: 0.5s;
    margin-left: 15px;
    background-color: #fdb827;
}
.submit-button:hover {
    cursor: pointer;
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
    height: 185px;
    border-radius: 15px;
}
.city {
    position: relative;
    opacity: 0.5;
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
    transition: 0.4s;
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
@keyframes fade-out {
    0% {
        opacity: 0.2;
    }
    25% {
        opacity: 0.4;
    }
    50% {
        opacity: 0.6;
    }
    75% {
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
}
.small-cards {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    margin-top: 30px;
    animation-name: fade-out;
    animation-duration: 0.3s;
}
.small-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
    height: 150px;
    border-radius: 15px;
    padding: 15px;
    transition: 0.3s;
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
    width: 85px;
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    padding: 15px;
    height: 222px;
    background-color: #fdfdfd;
    animation-name: fade-out;
    animation-duration: 0.2s;
}
.big-card-header {
    font-size: 14px;
    font-weight: 400;
    margin: 5px;
    color: #999999;
}
.big-card-body-top,
.big-card-body-bottom {
    display: flex;
    align-items: center;
}
.big-card-body-top img,
.big-card-body-bottom img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
.big-card-body-bottom {
    margin-top: 5px;
}
.sunrise-time,
.sunset-time {
    margin-bottom: 5px;
}
#sunrise-time {
    margin-bottom: 30px;
}
.sunrise-time,
.sunset-time,
.top-info-main {
    font-size: 30px;
    font-weight: 600;
    color: #23120b;
}
.top-info-secondary {
    font-size: 22px;
}
.bottom-info-icon {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    font-size: 20px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-right: 15px;
    color: #fdb827;
    background-color: #23120b;
}
.resize-image {
    margin-left: -13px;
}
</style>
