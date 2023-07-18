export async function getData(URL){

    try{
        const response = await fetch(URL);
        const data = await response.json();
        
        return data
    }catch(error){
        console.log(error)
    }

}