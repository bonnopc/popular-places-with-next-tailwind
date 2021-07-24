import storageKeys from "config/storageKeys"

export default function actionSetLocationsToStorage(locations){
    try {
        localStorage.setItem(storageKeys.LOCATIONS,JSON.stringify(locations))
    } catch (error) {
        console.error("Error on setting locations to storage", error)
    }
}