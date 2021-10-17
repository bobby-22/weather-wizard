<template>
    <div class="big-card">
        <div class="big-card-header">
            Wind Speed
        </div>
        <div class="big-card-body-top">
            <img src="../assets/wind_speed.png" />
            <span class="top-info">
                <span class="top-info-main">
                    {{ dailyConditions.wind_speed }}
                </span>
                <span class="top-info-secondary"> km/h</span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i class="far fa-compass"></i>
                </div>
                <span>{{ getWindDirection(dailyConditions.wind_deg) }}</span>
            </span>
        </div>
        <ScaleBar
            v-bind:data="dailyConditions.wind_speed"
            v-bind:isColored="false"
        />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            UV Index
        </div>
        <div class="big-card-body-top">
            <img style="margin-left: -5px" src="../assets/uv_index.png" />
            <span class="top-info">
                <span class="top-info-main">
                    {{ dailyConditions.uvi }}
                </span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i
                        v-bind:class="{
                            'far fa-grin':
                                checkIntensity(dailyConditions.uvi * 10) ===
                                'Low',
                            'far fa-meh':
                                checkIntensity(dailyConditions.uvi * 10) ===
                                'Moderate',
                            'far fa-frown-open':
                                checkIntensity(dailyConditions.uvi * 10) ===
                                'High',
                        }"
                    ></i>
                </div>
                <span>{{ checkIntensity(dailyConditions.uvi * 10) }}</span>
            </span>
        </div>
        <ScaleBar
            v-bind:data="dailyConditions.uvi * 10"
            v-bind:isColored="true"
        />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Humidity
        </div>
        <div class="big-card-body-top">
            <img class="resize-image" src="../assets/humidity.png" />
            <span class="top-info">
                <span class="top-info-main">
                    {{ dailyConditions.humidity }}%
                </span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i
                        v-bind:class="{
                            'far fa-thumbs-down':
                                checkIntensity(dailyConditions.humidity) ===
                                'Low',
                            'far fa-thumbs-up':
                                checkIntensity(dailyConditions.humidity) ===
                                'Moderate',
                            'far fa-thumbs-down':
                                checkIntensity(dailyConditions.humidity) ===
                                'High',
                        }"
                    ></i>
                </div>
                <span>{{ checkIntensity(dailyConditions.humidity) }}</span>
            </span>
        </div>
        <ScaleBar
            v-bind:data="dailyConditions.humidity"
            v-bind:isColored="false"
        />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Pressure
        </div>
        <div class="big-card-body-top">
            <span class="top-info">
                <span class="top-info-main">
                    {{ dailyConditions.pressure }}
                </span>
                <span class="top-info-secondary"> hPa</span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="bottom-info-icon">
                    <i
                        v-bind:class="{
                            'far fa-meh':
                                checkPressureIntensity(
                                    dailyConditions.pressure
                                ) === 'Low',
                            'far fa-grin':
                                checkPressureIntensity(
                                    dailyConditions.pressure
                                ) === 'Moderate',
                            'far fa-meh':
                                checkPressureIntensity(
                                    dailyConditions.pressure
                                ) === 'High',
                        }"
                    ></i>
                </div>
                <span>{{
                    checkPressureIntensity(dailyConditions.pressure)
                }}</span>
            </span>
        </div>
        <ScaleBar
            v-bind:data="dailyConditions.pressure - 1000"
            v-bind:isColored="true"
        />
    </div>
    <div class="big-card">
        <div class="big-card-header">
            Lowest & Highest Temps
        </div>
        <div class="big-card-body">
            <div class="big-card-body-top" id="sunrise-time">
                <img class="resize-image" src="../assets/lowest.png" />
                <span class="top-info-main">
                    {{ roundNumber(dailyConditions.temp.min - 273.15) }} °C
                </span>
            </div>
            <div class="big-card-body-bottom">
                <img class="resize-image" src="../assets/highest.png" />
                <span class="top-info-main">
                    {{ roundNumber(dailyConditions.temp.max - 273.15) }} °C
                </span>
            </div>
        </div>
        <div class="big-card-footer">
            <div class="bottom-info-icon">
                <i class="far fa-smile-wink"></i>
            </div>
            <span>
                Feels like
                {{ roundNumber(dailyConditions.feels_like.day - 273.15) }}° /
                {{ roundNumber(dailyConditions.feels_like.night - 273.15) }}°
            </span>
        </div>
    </div>
</template>

<script>
import ScaleBar from "./ScaleBar.vue";
export default {
    name: "BigCardDaily",
    components: {
        ScaleBar,
    },
    props: {
        day: Object,
        dailyConditions: Object,
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
#sunrise-time {
    margin-bottom: 0px;
}
.big-card-body-bottom {
    margin-top: 0px;
}
</style>
