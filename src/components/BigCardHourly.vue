<template>
    <div class="big-card">
        <div class="big-card-header">
            Sunrise & Sunset
        </div>
        <div class="big-card-body">
            <div class="big-card-body-top">
                <img src="../assets/sunrise.png" />
                <span class="top-info">
                    <p>{{ getTime(hourlyConditions.sunrise) }}</p>
                    <p>in 7 hours and 45 minutes</p>
                </span>
            </div>
            <div class="big-card-body-bottom">
                <img src="../assets/sunrise.png" />
                <span class="bottom-info">
                    <p>{{ getTime(hourlyConditions.sunset) }}</p>
                    <p>in 17 hours and 15 minutes</p>
                </span>
            </div>
        </div>
    </div>
    <div class="big-card" v-for="card in 5">
        Card
    </div>
</template>

<script>
export default {
    name: "BigCardHourly",
    props: {
        hour: Object,
        index: null,
        hourlyConditions: Object,
        roundNumber: { type: Function },
        getTime: { type: Function },
    },
};
</script>

<style></style>
