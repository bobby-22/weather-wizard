<template>
    <div class="big-card">
        <div class="big-card-header">
            Sunrise & Sunset
        </div>
        <div class="big-card-body">
            <div class="sunrise">
                <img src="../assets/cloud_fog.png" />
                <span class="sunrise-info">
                    <p>18:30</p>
                    <p>in 7 hours and 45 minutes</p>
                </span>
            </div>
            <div class="sunset">
                <img src="../assets/cloud_storm.png" />
                <span class="sunset-info">
                    <p>6:00</p>
                    <p>in 17 hours and 15 minutes</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BigCardHourly",
    props: {
        weatherResponse: Object,
    },
};
</script>

<style></style>
