<template>
    <div class="big-card">
        <div class="big-card-header">
            Wind Speed
        </div>
        <div class="big-card-body-top">
            <span class="top-info">
                <span class="wind-speed">
                    {{ dailyConditions.wind_speed }}
                </span>
                <span> km/h</span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="wind-direction-icon">
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
            <span class="top-info">
                <span class="wind-speed">
                    {{ dailyConditions.uvi }}
                </span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="wind-direction-icon">
                    <i class="far fa-thumbs-up"></i>
                </div>
                <span>Low</span>
            </span>
        </div>
        <ScaleBar
            v-bind:data="dailyConditions.uvi * 10"
            v-bind:isColored="true"
        />
    </div>
    <div class="big-card" v-for="card in 3">
        Card
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
};
</script>

<style></style>
