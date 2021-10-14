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
export default {
    name: "SmallCardHourly",
    props: {
        hourlyConditions: Object,
    },
    methods: {
        roundNumber(number) {
            return this.$parent.roundNumber(number);
        },
        getTime(dtValue) {
            return this.$parent.getTime(dtValue);
        },
    },
};
</script>

<style></style>
