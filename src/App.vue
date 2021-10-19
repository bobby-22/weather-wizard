<template>
    <router-view />
</template>

<script>
export default {
    name: "Home",
    beforeCreate() {
        this.$store.commit("initLatitude");
        this.$store.commit("initLongitude");
        this.$store.commit("initLocationName");
        this.$store.commit("initLocationImageURL");
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap");

* {
    font-family: "Comfortaa", sans-serif;
}
.container {
    min-height: 100vh;
}
::selection {
    background-color: #fdb827;
}
</style>
