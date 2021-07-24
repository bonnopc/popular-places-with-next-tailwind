import endpoints from "config/endpoints";

export default async function actionGetPopularPlaces(districtId){
    try {
        const response = await fetch(`${endpoints.REST_API}/address?district_id=${districtId}`)
        const result = await response.json()

        if(result?.code === 200) return result.body;
    } catch (error) {
        console.error("Error while getting Popular Places", error);
    }
}