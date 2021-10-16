<template>
    <div class="small-card">
        <div class="small-card-header-1" v-if="index === 0">
            Today
        </div>
        <div class="small-card-header-1" v-else>
            {{ getDay(day.dt) }}
        </div>
        <div class="small-card-header-2" v-if="day.pop != 0">
            {{ roundNumber(day.pop * 100) }}%
        </div>
        <div class="small-card-body">
            <img src="../assets/cloud_rain.png" />
        </div>
        <div class="small-card-footer">
            {{ roundNumber(day.temp.day - 273.15) }}° /
            {{ roundNumber(day.temp.night - 273.15) }}°
        </div>
    </div>
</template>

<script>
export default {
    name: "SmallCardDaily",
    props: {
        day: Object,
        index: null,
        roundNumber: { type: Function },
    },
    methods: {
        getDay(dtValue) {
            let dayName = new Date(dtValue * 1000).toLocaleDateString("en-US", {
                weekday: "long",
            });
            return dayName.slice(0, 3);
        },
    },
};
</script>

<style scoped>
.small-card:hover {
    cursor: pointer;
    transition: 0.2s;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 20px;
}
</style>
