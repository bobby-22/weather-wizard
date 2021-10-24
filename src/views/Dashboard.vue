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
                <img
                    v-bind:src="
                        require(`@/assets/${convertCodeToIcon(
                            currentConditions.weather[0].icon
                        )}`)
                    "
                />
                <div class="main-card-header">
                    <h1>
                        Currently
                        {{ roundNumber(currentConditions.temp - 273.15) }}°
                    </h1>
                </div>
            </div>
            <div class="additional-info">
                <span
                    class="additional-info-day"
                    v-on:click="scrollToSecondaryCard()"
                >
                    {{ getCurrentDay() }},
                    <span class="additional-info-time">
                        {{ getCurrentTime() }}
                    </span>
                </span>
                <span class="additional-info-pop">
                    <i class="fas fa-tint"></i>
                    {{ roundNumber(currentConditionsPop.pop * 10) * 10 }}%
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
        <div class="secondary-card" ref="secondaryCard">
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
                <SmallCards
                    v-for="(hour, index) in hourlyConditions"
                    v-bind:key="hour.id"
                    v-bind:data="hour"
                    v-bind:index="index"
                    v-bind:header="'Now'"
                    v-bind:icon="convertCodeToIcon(hour.weather[0].icon)"
                    v-bind:roundNumber="roundNumber"
                    v-bind:getTime="getTime"
                />
            </div>
            <div class="small-cards" v-else>
                <SmallCards
                    v-for="(day, index) in dailyConditions"
                    v-on:click="
                        (currentDayIndex = index), scrollToSecondaryHeader()
                    "
                    v-bind:key="day.id"
                    v-bind:data="day"
                    v-bind:index="index"
                    v-bind:header="'Today'"
                    v-bind:icon="convertCodeToIcon(day.weather[0].icon)"
                    v-bind:roundNumber="roundNumber"
                />
            </div>
            <div
                class="secondary-card-header"
                ref="secondaryHeader"
                v-if="isToday"
            >
                <h1>Conditions for Now</h1>
            </div>
            <div class="secondary-card-header" ref="secondaryHeader" v-else>
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
            </div>
        </div>
    </div>
</template>

<script>
import SmallCards from "../components/SmallCards.vue";
import BigCards from "../components/BigCards.vue";
import weatherAPI from "../axios";
import { loadedGoogleMapsAPI } from "@/main";
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
        convertCodeToIcon(icon) {
            switch (true) {
                case icon === "01d" || icon === "01n":
                    return "sun.png";
                case icon === "02d" || icon === "02n":
                    return "cloud_sun.png";
                case icon === "03d" ||
                    icon === "03n" ||
                    icon === "04d" ||
                    icon === "04n":
                    return "cloud.png";
                case icon === "09d" || icon === "09n":
                    return "cloud_shower.png";
                case icon === "10d" || icon === "10n":
                    return "cloud_rain_sun.png";
                case icon === "11d" || icon === "11n":
                    return "cloud_storm.png";
                case icon === "13d" || icon === "13n":
                    return "cloud_snow.png";
                case icon === "50d" || icon === "50n":
                    return "cloud_fog.png";
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
            this.$store.commit("setLongitude", this.longitude);
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
        scrollToSecondaryCard() {
            let element = this.$refs.secondaryCard;
            element.scrollIntoView({ behavior: "smooth" });
        },
        scrollToSecondaryHeader() {
            let element = this.$refs.secondaryHeader;
            element.scrollIntoView({ behavior: "smooth" });
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
            }
            if (minutes < 10) {
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
        loadedGoogleMapsAPI.then(() => {
            this.getAutocomplete();
        });
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
* {
    animation-name: fade-out;
    animation-duration: 0.5s;
}
@keyframes fade-out {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.container {
    display: flex;
    animation-name: fade-out;
    animation-duration: 0.5s;
}
.main-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 500px;
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
    height: 200px;
    border-radius: 15px;
}
.city {
    position: relative;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    margin-top: 5px;
    border-radius: 15px;
}
.city > img {
    filter: blur(1px);
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
    height: 170px;
    border-radius: 15px;
    padding: 15px;
    transition: 0.5s;
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
    width: 100px;
    height: 100px;
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
    width: 100%;
    gap: 15px;
}
.big-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 15px;
    padding: 15px;
    height: 215px;
    background-color: #fdfdfd;
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
@media (max-width: 1600px) and (max-height: 900px) {
    .media img {
        height: 170px;
    }
    .big-card {
        height: 189px;
    }
}
@media (max-width: 767px) {
    ::-webkit-scrollbar {
        height: 8px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #23120b;
    }
    .container {
        display: flex;
        flex-direction: column;
    }
    .main-card {
        width: auto;
    }
    .main-weather-condition img {
        width: 250px;
        height: 250px;
    }
    .main-card-header h1 {
        font-size: 38px;
    }
    .additional-info {
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .additional-info-day {
        border-bottom: 1px solid #23120b;
    }
    .media img {
        width: 100%;
        height: 150px;
    }
    .small-cards {
        overflow-x: scroll;
    }
    .big-cards {
        grid-template-columns: 1fr;
    }
}
</style>
