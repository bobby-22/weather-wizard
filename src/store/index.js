import { createStore } from "vuex";

export default createStore({
    state: {
        latitude: null,
        longitude: null,
        locationName: null,
        locationImageURL: null,
    },
    mutations: {
        initLatitude(state) {
            if (localStorage.getItem("latitude")) {
                state.latitude = JSON.parse(localStorage.getItem("latitude"));
            } else {
                localStorage.setItem(
                    "latitude",
                    JSON.stringify(state.latitude)
                );
            }
        },
        initLongitude(state) {
            if (localStorage.getItem("longitude")) {
                state.longitude = JSON.parse(localStorage.getItem("longitude"));
            } else {
                localStorage.setItem(
                    "longitude",
                    JSON.stringify(state.longitude)
                );
            }
        },
        initLocationName(state) {
            if (localStorage.getItem("locationName")) {
                state.locationName = JSON.parse(
                    localStorage.getItem("locationName")
                );
            } else {
                localStorage.setItem(
                    "locationName",
                    JSON.stringify(state.locationName)
                );
            }
        },
        initLocationImageURL(state) {
            if (localStorage.getItem("locationImageURL")) {
                state.locationImageURL = JSON.parse(
                    localStorage.getItem("locationImageURL")
                );
            } else {
                localStorage.setItem(
                    "locationImageURL",
                    JSON.stringify(state.locationImageURL)
                );
            }
        },
        setLatitude(state, latitude) {
            state.latitude = latitude;
            localStorage.setItem("latitude", JSON.stringify(state.latitude));
        },
        setLongitude(state, longitude) {
            state.longitude = longitude;
            localStorage.setItem("longitude", JSON.stringify(state.longitude));
        },
        setLocationName(state, locationName) {
            state.locationName = locationName;
            localStorage.setItem(
                "locationName",
                JSON.stringify(state.locationName)
            );
        },
        setLocationImageURL(state, locationImageURL) {
            state.locationImageURL = locationImageURL;
            localStorage.setItem(
                "locationImageURL",
                JSON.stringify(state.locationImageURL)
            );
        },
    },
    actions: {},
    modules: {},
});
