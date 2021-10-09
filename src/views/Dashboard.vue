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
    position: relative;
    flex-basis: 30%;
    padding: 30px;
    background-color: #fdfdfd;
}
.search-bar {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    font-size: 14px;
    border-radius: 15px;
    background-color: #f5f5f5;
}
.search-icon {
    padding: 15px;
    flex-basis: 100%;
    width: auto;
}
.search-input {
    outline: none;
    border: none;
    font-size: 14px;
    background-color: #f5f5f5;
    flex-basis: 100%;
    width: auto;
}
.submit-button {
    border-radius: 0px 15px 15px 0px;
    padding: 15px;
    background-color: #21209c;
    color: #fdfdfd;
    flex-basis: 100%;
    width: auto;
}
.main-weather-condition {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}
.main-weather-condition img {
    width: 301px;
    height: 301px;
}
.main-card-header h1 {
    font-size: 72px;
    margin-top: 10px;
    color: #4a4a4a;
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
    width: 30px;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
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
    height: 150px;
    border-radius: 10px;
    padding: 15px;
    background-color: #fdfdfd;
}
</style>
