<template>
    <div class="big-card">
        <div class="big-card-header">
            Sunrise & Sunset
        </div>
        <div class="big-card-body">
            <div class="sunrise">
                <img
                    src="../assets/horizont_morning_sun_sunrise_weather_icon.png"
                />
                <span class="sunrise-info">
                    <p>18:30</p>
                    <p>in 7 hours and 45 minutes</p>
                </span>
            </div>
            <div class="sunset">
                <img
                    src="../assets/horizont_morning_sun_sunrise_weather_icon.png"
                />
                <span class="sunset-info">
                    <p>6:00</p>
                    <p>in 17 hours and 15 minutes</p>
                </span>
            </div>
        </div>
        <div class="big-card-body" v-for="card in 5"></div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: {
        conditions: Object,
    },
};
</script>

<style scoped>
.big-card {
    border-radius: 15px;
    padding: 15px;
    background-color: #fdfdfd;
    min-height: 200px;
}
.big-card-header {
    color: #999999;
}
.big-card-body {
    font-size: 18px;
    margin-top: 30px;
    color: #4a4a4a;
}
</style>
