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
            <div class="additional-info">
                <p>Wednesday, 12:45</p>
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
                    <div class="small-card-header">
                        Time
                    </div>
                    <div class="small-card-body">
                        Conditions
                    </div>
                    <div class="small-card-footer">
                        Degree
                    </div>
                </div>
            </div>
            <div class="secondary-card-header">
                <h1>Conditions for today</h1>
            </div>
            <div class="big-cards">
                <div class="big-card" v-for="card in 9">
                    <div class="big-card-header">
                        Title
                    </div>
                    <div class="big-card-body">
                        Conditions
                    </div>
                    <div class="big-card-footer">
                        Additional info
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
    max-width: 500px;
    padding: 30px;
    flex-basis: 30%;
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
    margin-top: 35px;
}
.main-weather-condition img {
    width: 250px;
    height: 250px;
}
.main-card-header h1 {
    font-weight: 600;
    font-size: 72px;
    margin-top: 10px;
    margin-bottom: 30px;
    color: #4a4a4a;
}
p {
    margin: 0px;
}
.additional-info {
    font-size: 20px;
    padding-bottom: 30px;
    color: #4a4a4a;
    border-bottom: 1px solid #e1e1e1;
}
.highest {
    margin-right: 20px;
}
.media img {
    object-fit: cover;
    min-width: 100%;
    max-height: 240px;
    border-radius: 10px;
}
.radar {
    margin-top: 30px;
    margin-bottom: 5px;
}
.city {
    position: relative;
    opacity: 0.8;
    display: flex;
    justify-content: space-between;
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
    flex-basis: 70%;
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
    height: 100px;
    border-radius: 10px;
    padding: 15px;
    background-color: #fdfdfd;
}
.secondary-card-header h1 {
    font-weight: 500;
    font-size: 36px;
    color: #4a4a4a;
}
.big-cards {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 15px;
}
.big-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 100%;
    border-radius: 10px;
    height: 220px;
    overflow: auto;
    padding: 15px;
    background-color: #fdfdfd;
}
</style>
