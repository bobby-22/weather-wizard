<template>
    <div class="small-card" v-for="(condition, index) in dailyConditions">
        <div class="small-card-header-1" v-if="index === 0">
            Today
        </div>
        <div class="small-card-header-1" v-else>
            {{ getDay(condition.dt) }}
        </div>
        <div class="small-card-header-2" v-if="condition.pop != 0">
            {{ roundNumber(condition.pop * 100) }}%
        </div>
        <div class="small-card-body">
            <img src="../assets/cloud_rain.png" />
        </div>
        <div class="small-card-footer">
            {{ roundNumber(condition.temp.day - 273.15) }}° /
            {{ roundNumber(condition.temp.night - 273.15) }}°
        </div>
    </div>
</template>

<script>
import weatherAPI from "../axios";
export default {
    name: "dailyConditions",
    data() {
        return {
            dailyConditions: Object,
        };
    },
    methods: {
        async getDailyWeather() {
            try {
                let dailyResponse = await weatherAPI.get(
                    `/data/2.5/onecall?lat=48.1374&lon=11.5755&exclude=minutely,hourly,current&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`
                );
                this.dailyConditions = dailyResponse.data.daily.slice(0, 7);
                console.log(dailyConditions);
            } catch (error) {
                console.log(error);
            }
        },
        roundNumber(number) {
            return this.$parent.roundNumber(number);
        },
        getDay(dtValue) {
            let dayName = new Date(dtValue * 1000).toLocaleDateString("en-US", {
                weekday: "long",
            });
            return dayName.slice(0, 3);
        },
    },
    created() {
        this.getDailyWeather();
    },
};
</script>

<style></style>
