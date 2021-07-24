import endpoints from "config/endpoints";

export default async function actionGetDivisions(){
    try {
        const response = await fetch(`${endpoints.REST_API}/address`)
        const result = await response.json()

        if(result?.code === 200) return result.body;
    } catch (error) {
        console.error("Error while getting divisions", error);
    }
}