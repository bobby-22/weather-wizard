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
    <div class="big-card">
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
        <div class="monotone-bar">
            <div
                class="monotone-circle"
                v-bind:style="{ bottom: windScale }"
            ></div>
        </div>
    </div>
    <div class="big-card">
        <div class="big-card-header">
            UV Index
        </div>
        <div class="big-card-body-top">
            <span class="top-info">
                <span class="wind-speed">
                    {{ dailyConditions[currentDayIndex].uvi }}
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
        <div class="rainbow-bar">
            <div
                class="rainbow-circle"
                v-bind:style="{ bottom: uvScale }"
            ></div>
        </div>
    </div>
    <div class="big-card" v-for="card in 3">
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
            windScale: "",
            uvScale: "",
            windSpeed: this.dailyConditions[this.currentDayIndex].wind_speed,
            uvIndex: this.dailyConditions[this.currentDayIndex].uvi * 10,
        };
    },
    methods: {
        getScale() {
            this.windScale = this.windSpeed + "%";
            this.uvScale = this.uvIndex + "%";

            if (this.windSpeed >= 100) {
                this.windScale = "92%";
            }
            if (this.windSpeed <= 5) {
                this.windScale = "8%";
            }
            if (this.uvIndex >= 100) {
                this.uvScale = "92%";
            }
            if (this.uvIndex < 1) {
                this.uvScale = "8%";
            }
        },
    },
    created() {
        this.getScale();
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
.monotone-bar,
.rainbow-bar {
    display: grid;
    justify-items: center;
    position: absolute;
    border-radius: 20px;
    right: 5px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 200px;
    background-color: #f1f1f1;
}
.monotone-circle,
.rainbow-circle {
    position: absolute;
    display: inline-block;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    transform: translateY(50%);
    line-height: 12px;
    border: 2px solid #23120b;
    background-color: #fdb827;
}
.rainbow-bar {
    background: linear-gradient(
        180deg,
        rgba(255, 0, 0, 1) 0%,
        rgba(255, 149, 0, 1) 25%,
        rgba(255, 224, 0, 1) 50%,
        rgba(234, 255, 0, 1) 75%,
        rgba(170, 255, 0, 1) 100%
    );
}
.rainbow-circle {
    background-color: #fdfdfd;
}
</style>
