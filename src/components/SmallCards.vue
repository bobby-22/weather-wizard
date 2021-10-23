<template>
    <div
        class="small-card"
        v-bind:class="{
            'small-card-weekly': header === 'Today',
        }"
    >
        <div class="small-card-header-1" v-if="index === 0">
            {{ header }}
        </div>
        <div class="small-card-header-1" v-else-if="header === 'Now'">
            {{ getTime(data.dt) }}
        </div>
        <div class="small-card-header-1" v-else-if="header === 'Today'">
            {{ getDay(data.dt) }}
        </div>
        <div
            class="small-card-header-2"
            v-if="roundNumber(data.pop * 10) * 10 != 0"
        >
            {{ roundNumber(data.pop * 10) * 10 }}%
        </div>
        <div class="small-card-header-2" v-else></div>
        <div class="small-card-body">
            <img v-bind:src="require(`@/assets/${icon}`)" />
        </div>
        <div class="small-card-footer" v-if="header === 'Now'">
            {{ roundNumber(data.temp - 273.15) }}°
        </div>
        <div class="small-card-footer" v-else>
            {{ roundNumber(data.temp.day - 273.15) }}° /
            {{ roundNumber(data.temp.night - 273.15) }}°
        </div>
    </div>
</template>

<script>
export default {
    name: "SmallCardDaily",
    props: {
        data: Object,
        index: null,
        header: "",
        icon: null,
        roundNumber: { type: Function },
        getTime: { type: Function },
    },
    methods: {
        getDay(dtValue) {
            let dayName = new Date(dtValue * 1000).toLocaleDateString("en-US", {
                weekday: "long",
            });
            return dayName.slice(0, 3);
        },
    },
};
</script>

<style scoped>
.small-card-weekly:hover {
    cursor: pointer;
    transition: 0.2s;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 20px;
}
</style>
