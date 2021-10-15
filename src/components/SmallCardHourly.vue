<template>
    <div class="small-card">
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
        hour: Object,
        index: null,
        roundNumber: { type: Function },
        getTime: { type: Function },
    },
};
</script>

<style></style>
