<template>
    <div class="small-card" v-for="(hour, index) in hourlyConditions">
        <div class="small-card-header-1" v-if="index === 0">
            Now
        </div>
        <div class="small-card-header-1" v-else>
            {{ getTime(hour.dt) }}
        </div>
        <div class="small-card-header-2" v-if="hour.pop != 0">
            {{ roundNumber(hour.pop * 100) }}%
        </div>
        <div class="small-card-body">
            <img src="../assets/cloud_rain.png" />
        </div>
        <div class="small-card-footer">
            {{ roundNumber(hour.temp - 273.15) }}°
        </div>
    </div>
</template>

<script>
import weatherAPI from "../axios";
export default {
    name: "SmallCardHourly",
    data() {
        return {
            hourlyConditions: Object,
        };
    },
    methods: {
        async getHourlyWeather() {
            try {
                let hourlyResponse = await weatherAPI.get(
                    `/data/2.5/onecall?lat=48.1374&lon=11.5755&exclude=minutely,daily,current&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
                );
                this.hourlyConditions = hourlyResponse.data.hourly.slice(0, 7);
            } catch (error) {
                console.log(error);
            }
        },
        roundNumber(number) {
            return this.$parent.roundNumber(number);
        },
        getTime(dtValue) {
            return this.$parent.getTime(dtValue);
        },
    },
    created() {
        this.getHourlyWeather();
    },
};
</script>

<style></style>
