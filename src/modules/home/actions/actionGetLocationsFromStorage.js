import storageKeys from "config/storageKeys"

export default function actionGetLocationsFromStorage(){
    try {
        return JSON.parse(localStorage.getItem(storageKeys.LOCATIONS))
    } catch (error) {
        console.error("Error on getting locations from storage", error)
    }
}