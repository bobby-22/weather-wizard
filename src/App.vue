<template>
    <div class="container">
        <Dashboard />
    </div>
    <router-view />
</template>

<script>
import Dashboard from "./views/Dashboard.vue";

export default {
    name: "Home",
    components: {
        Dashboard,
    },
};
</script>

<style>
* {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.container {
    min-height: 100vh;
}
</style>
