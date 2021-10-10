<template>
    <div class="container">
        <div class="main-card">
            <form class="search-bar" action="">
                <div class="search-icon">
                    <i class="fas fa-search"></i>
                </div>
                <input class="search-input" placeholder="Search a city..." />
                <div class="submit-button">Search</div>
            </form>
            <div class="main-weather-condition">
                <img src="../assets/cloud_day_forecast_rain_rainy_icon.png" />
                <div class="main-card-header">
                    <h1>20 °C</h1>
                </div>
            </div>
            <hr class="rounded-divider" />
            <div class="additional-info">
                <p>
                    Wednesday, <span class="additional-info-time">12:45</span>
                </p>
                <span class="highest">H:23°</span>
                <span class="lowest">L:17°</span>
            </div>
            <div class="media">
                <img class="radar" src="../assets/radar.png" />
                <div class="city">
                    <img src="../assets/munich.jpg" />
                    <h1 class="city-name">Munich</h1>
                    <div class="city-controls">
                        <i class="fas fa-chevron-left"></i>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="secondary-card">
            <div class="navbar">
                <div class="day">
                    <span class="today"><u>Today</u></span>
                    <span class="weekly">Weekly</span>
                </div>
                <div class="degree">
                    <span class="celsius">°C</span>
                    <span class="fahrenheit">°F</span>
                </div>
            </div>
            <div class="small-cards">
                <div class="small-card" v-for="card in 7">
                    <div class="small-card-header-1">
                        12:45
                    </div>
                    <div class="small-card-header-2">
                        25%
                    </div>
                    <div class="small-card-body">
                        <img
                            src="../assets/cloud_day_forecast_rain_rainy_icon.png"
                        />
                    </div>
                    <div class="small-card-footer">
                        20°
                    </div>
                </div>
            </div>
            <div class="secondary-card-header">
                <h1>Conditions for today</h1>
            </div>
            <div class="big-cards">
                <div class="big-card">
                    <div class="big-card-header">
                        Sunrise & Sunset
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                </div>
                <div class="big-card">
                    <div class="big-card-header">
                        Wind speed
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                </div>
                <div class="big-card">
                    <div class="big-card-header">
                        UV Index
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                </div>
                <div class="big-card">
                    <div class="big-card-header">
                        Humidity
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                </div>
                <div class="big-card">
                    <div class="big-card-header">
                        Air quality
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                </div>
                <div class="big-card">
                    <div class="big-card-header">
                        Abrubt changes
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
};
</script>

<style scoped>
.container {
    display: flex;
}
.main-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 20%;
    max-width: 500px;
    padding: 30px;
    background-color: #fdfdfd;
}
.search-bar {
    display: flex;
    font-size: 14px;
    border-radius: 15px;
    background-color: #f5f5f5;
}
.search-icon {
    padding: 15px;
}
.search-input {
    outline: none;
    border: none;
    font-size: 14px;
    flex-basis: 100%;
    background-color: #f5f5f5;
}
.submit-button {
    border-radius: 0px 15px 15px 0px;
    padding: 15px;
    background-color: #21209c;
    color: #fdfdfd;
}
.main-weather-condition {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-weather-condition img {
    width: 200px;
    height: 200px;
}
.main-card-header h1 {
    font-weight: 400;
    font-size: 58px;
    margin-top: 10px;
    margin-bottom: 0px;
    color: #4a4a4a;
}
.rounded-divider {
    width: 100%;
    border-top: 1px solid #e1e1e1;
    border-radius: 5px;
    margin: 0px;
}
p {
    margin: 0px;
}
.additional-info {
    font-size: 20px;
    color: #4a4a4a;
}
.additional-info-time {
    font-weight: 200;
    color: #999999;
}
.highest {
    margin-right: 20px;
}
.media img {
    object-fit: cover;
    min-width: 100%;
    max-height: 170px;
    border-radius: 10px;
}
.city {
    position: relative;
    opacity: 0.7;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.city-name {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    margin: 0px;
    margin-top: -1px;
    letter-spacing: 2px;
    font-weight: 500;
    color: #fdfdfd;
}
.city-controls {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.fas.fa-chevron-left,
.fas.fa-chevron-right {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-left: 15px;
    margin-right: 15px;
    opacity: 0.5;
    transition: opacity 0.5s;
    color: #4a4a4a;
    background-color: #fdfdfd;
}
.fas.fa-chevron-left:hover,
.fas.fa-chevron-right:hover {
    opacity: 0.8;
}
.secondary-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 80%;
    padding: 30px;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.today,
.celsius {
    margin-right: 20px;
}
.today {
    color: #4a4a4a;
    text-underline-offset: 5px;
}
.weekly {
    color: #999999;
}
.celsius,
.fahrenheit {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
}
.celsius {
    background-color: #23120b;
    color: #fdfdfd;
}
.fahrenheit {
    background-color: #fdfdfd;
    color: #23120b;
}
.small-cards {
    display: flex;
    justify-content: space-between;
    column-gap: 15px;
    margin-top: 30px;
}
.small-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
    min-height: 100px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 10px;
    padding: 15px;
    background-color: #fdfdfd;
    backdrop-filter: blur(25px);
}
.small-card-header-1,
.small-card-footer {
    font-size: 18px;
    color: #4a4a4a;
}
.small-card-header-2 {
    font-size: 14px;
    color: #21209c;
}
.small-card-body img {
    object-fit: cover;
    width: 61px;
    height: 61px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.secondary-card-header h1 {
    font-weight: 500;
    font-size: 32px;
    color: #4a4a4a;
}
.big-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    gap: 15px;
}
.big-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 100%;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    border-radius: 10px;
    overflow: auto;
    padding: 15px;
    background-color: #fdfdfd;
}
.big-card-header,
.big-card-footer {
    font-size: 18px;
    color: #616161;
}
</style>
