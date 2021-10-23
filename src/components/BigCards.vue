<template>
    <div class="big-card" v-if="!isToday">
        <div class="big-card-header">
            Flash information
        </div>
        <div class="big-card-body">
            <div class="big-card-body-top">
                <span class="top-info-main" id="description">
                    {{ data.weather[0].description }}
                </span>
            </div>
        </div>
        <div class="big-card-footer">
            <div class="bottom-info-icon">
                <i class="far fa-eye"></i>
            </div>
            <span v-if="!isToday">
                Visibility {{ roundNumber(data.visibility / 1000) }} km
            </span>
        </div>
    </div>
    <div class="big-card" v-else>
        <div class="big-card-header">
            Lowest & Highest Temps
        </div>
        <div class="big-card-body">
            <div class="big-card-body-top" id="sunrise-time">
                <img class="resize-image" src="../assets/lowest.png" />
                <span class="top-info-main">
                    {{ roundNumber(data.temp.min - 273.15) }} °C
                </span>
            </div>
            <div class="big-card-body-bottom">
                <img class="resize-image" src="../assets/highest.png" />
                <span class="top-info-main">
                    {{ roundNumber(data.temp.max - 273.15) }} °C
                </span>
            </div>
        </div>
        <div class="big-card-footer">
            <div class="bottom-info-icon">
                <i class="far fa-smile-wink"></i>
            </div>
            <span>
                Feels like
                {{ roundNumber(data.feels_like.day - 273.15) }}° /
                {{ roundNumber(data.feels_like.night - 273.15) }}°
            </span>
        </div>
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Wind Speed
        </div>
        <div class="big-card-body-top">
            <img src="../assets/wind_speed.png" />
            <span class="top-info">
                <span class="top-info-main">
                    {{ data.wind_speed }}
                </span>
                <span class="top-info-secondary"> km/h</span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i class="far fa-compass"></i>
                </div>
                <span>{{ getWindDirection(data.wind_deg) }}</span>
            </span>
        </div>
        <ScaleBar v-bind:data="data.wind_speed" v-bind:isColored="false" />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            UV Index
        </div>
        <div class="big-card-body-top">
            <img style="margin-left: -5px" src="../assets/uv_index.png" />
            <span class="top-info">
                <span class="top-info-main">
                    {{ data.uvi }}
                </span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i
                        v-bind:class="{
                            'far fa-grin':
                                checkIntensity(data.uvi * 10) === 'Low',
                            'far fa-meh':
                                checkIntensity(data.uvi * 10) === 'Moderate',
                            'far fa-frown-open':
                                checkIntensity(data.uvi * 10) === 'High',
                        }"
                    ></i>
                </div>
                <span>{{ checkIntensity(data.uvi * 10) }}</span>
            </span>
        </div>
        <ScaleBar v-bind:data="data.uvi * 10" v-bind:isColored="true" />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Humidity
        </div>
        <div class="big-card-body-top">
            <img class="resize-image" src="../assets/humidity.png" />
            <span class="top-info">
                <span class="top-info-main"> {{ data.humidity }}% </span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i
                        v-bind:class="{
                            'far fa-thumbs-down':
                                checkIntensity(data.humidity) === 'Low',
                            'far fa-thumbs-up':
                                checkIntensity(data.humidity) === 'Moderate',
                            'far fa-thumbs-down':
                                checkIntensity(data.humidity) === 'High',
                        }"
                    ></i>
                </div>
                <span>{{ checkIntensity(data.humidity) }}</span>
            </span>
        </div>
        <ScaleBar v-bind:data="data.humidity" v-bind:isColored="false" />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Pressure
        </div>
        <div class="big-card-body-top">
            <span class="top-info">
                <span class="top-info-main">
                    {{ data.pressure }}
                </span>
                <span class="top-info-secondary"> hPa</span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i
                        v-bind:class="{
                            'far fa-arrow-alt-circle-down':
                                checkPressureIntensity(data.pressure) === 'Low',
                            'far fa-check-circle':
                                checkPressureIntensity(data.pressure) ===
                                'Moderate',
                            'far fa-arrow-alt-circle-up':
                                checkPressureIntensity(data.pressure) ===
                                'High',
                        }"
                    ></i>
                </div>
                <span>{{ checkPressureIntensity(data.pressure) }}</span>
            </span>
        </div>
        <ScaleBar v-bind:data="data.pressure - 1000" v-bind:isColored="true" />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Sunrise & Sunset
        </div>
        <div class="big-card-body">
            <div class="big-card-body-top" id="sunrise-time-special">
                <img class="resize-image" src="../assets/sunrise.png" />
                <span class="top-info">
                    <p class="sunrise-time">
                        {{ getTime(data.sunrise) }}
                    </p>
                    <p>in 7 hours and 45 minutes</p>
                </span>
            </div>
            <div class="big-card-body-bottom">
                <img class="resize-image" src="../assets/sunset.png" />
                <span class="bottom-info">
                    <p class="sunset-time">
                        {{ getTime(data.sunset) }}
                    </p>
                    <p>in 17 hours and 15 minutes</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import ScaleBar from "./ScaleBar.vue";
export default {
    name: "BigCards",
    components: {
        ScaleBar,
    },
    props: {
        data: Object,
        isToday: null,
        roundNumber: { type: Function },
        getTime: { type: Function },
        getWindDirection: { type: Function },
    },
    methods: {
        checkIntensity(data) {
            if (Math.round(data) <= 33) {
                return "Low";
            }
            if (Math.round(data) <= 66) {
                return "Moderate";
            }
            if (Math.round(data) <= 100) {
                return "High";
            }
        },
        checkPressureIntensity(data) {
            if (data <= 950) {
                return "Low";
            }
            if (data <= 1050) {
                return "Moderate";
            }
            if (data <= 1100) {
                return "High";
            }
        },
    },
};
</script>

<style scoped>
#description {
    text-transform: capitalize;
}
#sunrise-time {
    margin-bottom: -15px;
}
#sunrise-time-special {
    margin-bottom: 15px;
}
.big-card-body-bottom {
    margin-top: 0px;
}
</style>
