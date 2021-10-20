import { Platform } from "react-native";
import Constants from "expo-constants"

const localhost = Platform.OS === "ios" ? "http://localhost:8080/api" : "http://192.168.93.2:8080/api";

const ENV = {
    local: {
        apiUrl: localhost,
    },
    prod: {
        apiUrl: "https://image-captioning.andreasriepl.de/api",
    }
};

// @ts-ignore
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.prod;
        //return ENV.local;
    } else {
        if(env !== undefined){
            if (env.indexOf('default') !== -1) return ENV.prod //iPhone
            if (env.indexOf('prod') !== -1) return ENV.prod
        }
        else {
            throw new Error("Wrong release-channel specified. Please enter 'test' or 'prod'")
        }
    }
    return {apiUrl: ""}
};

export default getEnvVars;