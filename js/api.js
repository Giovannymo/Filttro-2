export async function getDataApi(URL, API_KEY){
    try{
        const response = await fetch(`${URL}${API_KEY}`)      
        const data = await response.json();
        return data

    }catch(e){
        console.log(e)
    }
}