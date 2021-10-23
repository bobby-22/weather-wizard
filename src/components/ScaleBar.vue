<template>
    <div
        class="bar"
        v-bind:style="[
            !isColored
                ? { background: '#f1f1f1' }
                : {
                      background:
                          'linear-gradient(180deg, rgba(255, 0, 0, 1) 0%, rgba(255, 149, 0, 1) 25%, rgba(255, 224, 0, 1) 50%, rgba(234, 255, 0, 1) 75%, rgba(170, 255, 0, 1) 100%)',
                  },
        ]"
    >
        <div
            class="circle"
            v-bind:style="[
                { bottom: getPercentScale() },
                !isColored
                    ? { 'background-color': '#fdb827' }
                    : { 'background-color': '#fdfdfd' },
            ]"
        ></div>
    </div>
</template>

<script>
export default {
    name: "ScaleBar",
    props: {
        data: null,
        isColored: false,
    },
    methods: {
        getPercentScale() {
            if (this.data >= 100) {
                return "92%";
            }
            if (this.data <= 8) {
                return "8%";
            } else {
                return this.data + "%";
            }
        },
    },
    created() {
        this.getPercentScale();
    },
    watch: {
        data: {
            handler: function() {
                this.getPercentScale();
            },
        },
    },
};
</script>

<style>
.bar {
    display: grid;
    justify-items: center;
    position: absolute;
    border-radius: 20px;
    right: 5px;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: inherit;
    background-color: #f1f1f1;
}
.circle {
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
</style>
