<template>
    <div class="big-card">
        <div class="big-card-header">
            Sunrise & Sunset
        </div>
        <div class="big-card-body">
            <div class="big-card-body-top">
                <img src="../assets/sunrise.png" />
                <span class="top-info">
                    <p class="sunrise-time">
                        {{ getTime(dailyConditions[currentDayIndex].sunset) }}
                    </p>
                    <p>in 7 hours and 45 minutes</p>
                </span>
            </div>
            <div class="big-card-body-bottom">
                <img src="../assets/sunset.png" />
                <span class="bottom-info">
                    <p class="sunset-time">
                        {{ getTime(dailyConditions[currentDayIndex].sunset) }}
                    </p>
                    <p>in 17 hours and 15 minutes</p>
                </span>
            </div>
        </div>
    </div>
    <div class="big-card" style="position:relative">
        <div class="big-card-header">
            Wind Speed
        </div>
        <div class="big-card-body-top">
            <span class="top-info">
                <span class="wind-speed">
                    {{ dailyConditions[currentDayIndex].wind_speed }}
                </span>
                <span> km/h</span>
            </span>
        </div>
        <div class="big-card-body-bottom">
            <span class="bottom-info">
                <div class="wind-direction-icon">
                    <i class="far fa-compass"></i>
                </div>
                <span>{{
                    getWindDirection(dailyConditions[currentDayIndex].wind_deg)
                }}</span>
            </span>
        </div>
        <div class="bar" style="">
            <div class="circle" v-bind:style="{ bottom: barScale }"></div>
        </div>
    </div>
    <div class="big-card" v-for="card in 4">
        Card
    </div>
</template>

<script>
export default {
    name: "BigCardDaily",
    props: {
        day: Object,
        currentDayIndex: null,
        dailyConditions: Object,
        roundNumber: { type: Function },
        getTime: { type: Function },
        getWindDirection: { type: Function },
    },
    data() {
        return {
            barScale: "",
            windSpeed: this.dailyConditions[this.currentDayIndex].wind_speed,
        };
    },
    methods: {
        getWindSpeedRange() {
            switch (true) {
                case this.windSpeed <= 10:
                    this.barScale = "10%";
                    break;
                case this.windSpeed <= 20:
                    this.barScale = "20%";
                    break;
                case this.windSpeed <= 30:
                    this.barScale = "30%";
                    break;
                case this.windSpeed <= 40:
                    this.barScale = "40%";
                    break;
                case this.windSpeed <= 50:
                    this.barScale = "50%";
                    break;
                case this.windSpeed <= 60:
                    this.barScale = "60%";
                    break;
                case this.windSpeed <= 70:
                    this.barScale = "70%";
                    break;
                case this.windSpeed <= 80:
                    this.barScale = "80%";
                    break;
                case this.windSpeed <= 90:
                    this.barScale = "90%";
                    break;
                case this.windSpeed > 90:
                    this.barScale = "95%";
                    break;
            }
        },
    },
    created() {
        this.getWindSpeedRange();
    },
};
</script>

<style scoped>
.sunset-time,
.sunrise-time {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 5px;
    color: #23120b;
}
.wind-speed {
    font-size: 30px;
    font-weight: 600;
    color: #23120b;
}
.wind-direction-icon {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 15px;
    color: #fdb827;
    background-color: #23120b;
}
.bar {
    display: grid;
    justify-items: center;
    position: absolute;
    border-radius: 20px;
    right: 5px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 200px;
    background-color: #f1f1f1;
}
.circle {
    position: absolute;
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    transform: translateY(50%);
    line-height: 10px;
    border: 2px solid #23120b;
    background-color: #fdb827;
}
</style>
