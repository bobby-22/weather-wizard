import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App)
    .use(store)
    .use(router)
    .mount("#app");

export const loadedGoogleMapsAPI = new Promise((resolve, reject) => {
    window["GoogleMapsInit"] = resolve;

    let GMap = document.createElement("script");

    GMap.setAttribute(
        "src",
        `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&libraries=places`
    );

    document.body.appendChild(GMap);
});
