import { createStore } from "vuex";

export default createStore({
    state: {
        latitude: 40.7128,
        longitude: -74.0059728,
        locationName: "New York",
        locationImageURL:
            "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAap_uEBfp6BWVd06gQuQskn8eeW3v5OK009bY6j4HI3x-cxJ2an9T2qMarBCoq6C94x9l_qR095LWhJUyL9SMj2IZ-rUXAjdrqiFTr87Ja9O_FcW7iEO3DbX1ubFhh3xwiQptH7Int_8wwYBwHlnaFFWDvEytLxKXg1NDaZU7pIlseppuscM&3u3648&5m1&2e1&callback=none&key=AIzaSyDZtsUUOMZsh34qXB5NOXRPS0EXI7bNCZI&token=112369",
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
