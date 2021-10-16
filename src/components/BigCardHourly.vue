<template>
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
